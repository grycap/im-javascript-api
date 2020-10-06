/**
 * Copyright (C) GRyCAP - I3M - UPV 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class IMResponse {

    constructor(ok, data, message) {
      this.ok = ok;
      this.data = data;
      this.message = message;
    }

}


class IMAuthDataItem {

    constructor(id, type, fields) {
      this.id = id;
      this.type = type;
      this.fields = fields;
    }

    toAuthLine() {
      var authStr = "id = " + this.id + "; type = " + this.type + "; ";
      for (var field in this.fields){
        authStr = authStr + field + " = " + this.fields[field] + "; "
      }
      return authStr;
    }

}


class IMAuthData {

    constructor(authList) {
      this.authList = authList;
      // Check that IDs are uniques
      for (var i = 0; i < this.authList.length; i+=1) {
        for (var j = i+1; j < this.authList.length; j+=1) {
          if (this.authList[i].id == this.authList[j].id) {
            throw "IDs must be uniques."
          }
        }
      }
    }

    formatAuthData() {
      var authStr = "";
      for (var i = 0; i < this.authList.length; i+=1) {
        if (i > 0) authStr = authStr + "\\n";
        authStr = authStr + this.authList[i].toAuthLine();
      }
      return authStr;
    }

}


class IMCloudResource {

  constructor(client) {
    this.client = client;
    this.fullid = null;
    this.id = null;
  }

  async destroy() {
    const headers = {'Accept': 'application/json',
                     'Authorization': this.client.authData.formatAuthData()};
    const response = await fetch(this.fullid, {
      method: 'DELETE',
      headers: headers
    })
    if (response.ok) {
      const output = await response.text();
      return new IMResponse(response.ok, output, null);
    } else {
      const output = await response.json();
      return new IMResponse(response.ok, null, output['message']);
    }
  }

  async getProperty(property) {
    const headers = {'Accept': 'application/json',
                    'Authorization': this.client.authData.formatAuthData()};
    const url = this.fullid + "/" + property;
    const response = await fetch(url, {headers: headers});
    const output = await response.json();
    if (response.ok) {
      return new IMResponse(response.ok, output, null);
    } else {
      return new IMResponse(response.ok, null, output['message']);
    }
  }

  async getContMsg() {
    return this.getProperty("contmsg")
  }

  async performOperation(operation) {
    const headers = {'Authorization': this.client.authData.formatAuthData()};
    const url = this.fullid + "/" + operation;
    const response = await fetch(url, {
      method: 'PUT',
      headers: headers
    })
    if (response.ok) {
      const output = await response.text();
      return new IMResponse(true, output, null);
    } else {
      const output = await response.json();
      return new IMResponse(false, null, output['message']);
    }
  }

  async start() {
    return this.performOperation("start");
  }

  async stop() {
    return this.performOperation("stop");
  }
}


class IMVirtualMachine extends IMCloudResource {

  constructor(client, infid, id) {
    super(client);
    this.radl = null;
    this.state = null;

    if (id===undefined) {
      // infid in this case is the full id of the VM
      this.fullid = infid;
      this.id = infid.substring(infid.lastIndexOf('/') + 1);
      var infidFull = infid.substring(0, infid.lastIndexOf('/') - 4);
      this.infid = infidFull.substring(infidFull.lastIndexOf('/') + 1);
    } else {
      this.infid = infid;
      this.id = id;
      this.fullid = this.client.imUrl + '/infrastructures/' + this.infid + "/vms/" + this.id;
    }
  }

  async getInfo() {
    const headers = {'Accept': 'application/json',
                    'Authorization': this.client.authData.formatAuthData()};
    const response = await fetch(this.fullid, {headers: headers});
    const output = await response.json();
    if (response.ok) {
      this.radl = output['radl'];
      return new IMResponse(true, this.radl, null);
    } else {
      return new IMResponse(false, null, output['message']);
    }
  }

  async reboot() {
    return this.performOperation("reboot");
  }

  async createDiskSnapshot(diskNum, imageName, autoDelete='false') {
    const headers = {'Authorization': this.client.authData.formatAuthData()};
    const url = this.fullid + "/disks/" + diskNum + "/snapshot?image_name=" + imageName + "&auto_delete=" + autoDelete;
    const response = await fetch(url, {
      method: 'PUT',
      headers: headers
    })
    if (response.ok) {
      const output = await response.text();
      return new IMResponse(true, output, null);
    } else {
      const output = await response.json();
      return new IMResponse(false, null, output['message']);
    }
  }

}


class IMInfrastructure extends IMCloudResource {

  constructor(client, id) {
    super(client);
    this.vms = [];
    this.state = null;

    if (id.startsWith('https://') || id.startsWith('http://')) {
      this.fullid = id;
      this.id = id.substring(id.lastIndexOf('/') + 1); 
    } else {
      this.id = id;
      this.fullid = this.client.imUrl + '/infrastructures/' + this.id;
    }
  }

  async getInfo() {
    const headers = {'Accept': 'application/json',
                    'Authorization': this.client.authData.formatAuthData()};
    const response = await fetch(this.fullid, {headers: headers});
    const output = await response.json();
    if (response.ok) {
      this.vms = [];
      output['uri-list'].forEach(vmID => {
        this.vms.push(new IMVirtualMachine(this.client, vmID['uri']));
      });
      return new IMResponse(true, this.vms, null);
    } else {
      return new IMResponse(false, null, output['message']);
    }
  }

  async getState() {
    const headers = {'Accept': 'application/json',
                    'Authorization': this.client.authData.formatAuthData()};
    const url = this.fullid + "/state";
    const response = await fetch(url, {headers: headers});
    const output = await response.json();
    if (response.ok) {
      this.state = output['state']['state'];
      // also update VMs state
      for (let key in output['state']['vm_states']) {
        this.vms.forEach(vm => {
          if (key == vm.id) {
            vm.state = output['state']['vm_states'][key];
          }
        });
      }
      return new IMResponse(response.ok, output, null);
    } else {
      return new IMResponse(response.ok, null, output['message']);
    }
  }

  async addResource(template, type="radl") {
    var contentType = "text/plain"
    if (type == "tosca" || type == "yaml") {
      contentType = "text/yaml";
    } else if (type == "json") {
      contentType = "application/json";
    } else if (type != "radl") {
      throw "Invalid type. Only radl, json, tosca or yaml are accepted.";
    }
    const headers = {'Accept': 'application/json',
                      'Authorization': this.client.authData.formatAuthData(),
                      'Content-Type': contentType};
    const url = this.fullid;
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: template
    })
    const output = await response.json();
    if (response.ok) {
      newVMs = []
      output['uri-list'].forEach(vmID => {
        var vm = new IMVirtualMachine(this.client, vmID['uri']);
        newVMs.push(vm);
        this.vms.push(vm);
      });
      return new IMResponse(true, newVMs, null);
    } else {
      return new IMResponse(false, null, output['message']);
    }
  }

  async reconfigure(template, type="radl", vmList="") {
    var contentType = "text/plain"
    if (type == "json") {
      contentType = "application/json";
    } else if (type != "radl") {
      throw "Invalid type. Only radl, json are accepted.";
    }
    const headers = {'Accept': 'application/json',
                      'Authorization': this.client.authData.formatAuthData(),
                      'Content-Type': contentType};
    var url = this.fullid;
    if (vmList != "") {
      url = url + "?vm_list=" + vmList;
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: template
    })
    if (response.ok) {
      const output = await response.text();
      return new IMResponse(true, output, null);
    } else {
      const output = await response.json();
      return new IMResponse(false, null, output['message']);
    }
  }

}


class IMClient {

    constructor(imUrl, authData) {
      this.imUrl = imUrl;
      this.authData = authData;
    }

    async getVersion() {
        const response = await fetch(this.imUrl + '/version');
        return await response.text();
    }

    async getInfrastructureList() {
      const headers = {'Accept': 'application/json',
                      'Authorization': this.authData.formatAuthData()};
      const url = this.imUrl + '/infrastructures';
      const response = await fetch(url, {headers: headers});
      const output = await response.json();
      if (response.ok) {
        var infList = [];
        output['uri-list'].forEach(infID => {
          infList.push(new IMInfrastructure(this, infID['uri']));
        });
        return new IMResponse(true, infList, null);
      } else {
        return new IMResponse(false, null, output['message']);
      }
    }

    async createInfrastructure(template, type="radl") {
      var contentType = "text/plain"
      if (type == "tosca" || type == "yaml") {
        contentType = "text/yaml";
      } else if (type == "json") {
        contentType = "application/json";
      } else if (type != "radl") {
        throw "Invalid type. Only radl, json, tosca or yaml are accepted.";
      }
      const headers = {'Accept': 'application/json',
                        'Authorization': this.authData.formatAuthData(),
                        'Content-Type': contentType};
      const url = this.imUrl + '/infrastructures';
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: template
      })
      const output = await response.json();
      if (response.ok) {
        inf = new IMInfrastructure(this, output['uri'])
        return new IMResponse(true, inf, null);
      } else {
        return new IMResponse(false, null, output['message']);
      }
    }

}