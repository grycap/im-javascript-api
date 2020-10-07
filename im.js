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

 /**
 * Helper class to return the IM REST API responses.
 */
class IMResponse {

    /**
      * Constructor.
      *
      * @param {boolean} ok: Flag to identify if the response has been successful.
      * @param {object} data: Result of the call in case of success.
      * @param {string} message: Error message in case of error.
      */
    constructor(ok, data, message) {
      this.ok = ok;
      this.data = data;
      this.message = message;
    }

}

/**
 * This class represents the IM auth data item.
 */
class IMAuthDataItem {

    /**
      * Constructor.
      * For valid values see: https://imdocs.readthedocs.io/en/latest/client.html#auth-file
      *
      * @param {string} id: ID of the auth item.
      * @param {string} type: Type of the auth item.
      * @param {object} fields: Dictionary with the auth data.
      */
    constructor(id, type, fields) {
      this.id = id;
      this.type = type;
      this.fields = fields;
    }

    /**
      * Format this Auth item into an IM auth line.
      *
      * @return {string} the formatted auth line.
      */
    toAuthLine() {
      var authStr = "id = " + this.id + "; type = " + this.type + "; ";
      for (var field in this.fields){
        authStr = authStr + field + " = " + this.fields[field] + "; "
      }
      return authStr;
    }

}

/**
 * This class represents the IM auth data (a list of IMAuthDataItem).
 */
class IMAuthData {

    /**
      * Constructor.
      * For valid values see: https://imdocs.readthedocs.io/en/latest/client.html#auth-file
      *
      * @param {array} authList: Array of IMAuthDataItem elements.
      */
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

    /**
      * Format this Auth data into an IM auth valid format..
      *
      * @return {string} the formatted auth data.
      */
    formatAuthData() {
      var authStr = "";
      for (var i = 0; i < this.authList.length; i+=1) {
        if (i > 0) authStr = authStr + "\\n";
        authStr = authStr + this.authList[i].toAuthLine();
      }
      return authStr;
    }

}

/**
 * This class represents a base class for the Cloud Resources Object.
 */
class IMCloudResource {

  /**
    * Constructor.
    *
    * @param {IMClient} client: Reference to the IMClient object.
    */
  constructor(client) {
    this.client = client;
    this.fullid = null;
    this.id = null;
  }

  /**
    * Destroy the Cloud resource.
    *
    * @param {string} extraParams: Extra parameters to be appended to the end of the URL of the object.
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = "" in case of success.
    */
  async destroy(extraParams="") {
    const headers = {'Accept': 'application/json',
                     'Authorization': this.client.authData.formatAuthData()};
    const response = await fetch(this.fullid + extraParams, {
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

  /**
    * Get Info about the Cloud resource.
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = Object Info in case of success.
    */
  async getInfo() {
    const headers = {'Accept': 'application/json',
                    'Authorization': this.client.authData.formatAuthData()};
    const response = await fetch(this.fullid, {headers: headers});
    const output = await response.json();
    if (response.ok) {
      return new IMResponse(true, this.extractInfo(output), null);
    } else {
      return new IMResponse(false, null, output['message']);
    }
  }

  /**
    * Get a Cloud Resource property.
    * 
    * @param {string} property: Property to retrieve.
    * @param {string} extraParams: Extra parameters to be appended to the end of the URL of the object.
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = Object property in case of success.
    */
  async getProperty(property, extraParams="") {
    const headers = {'Accept': 'application/json',
                    'Authorization': this.client.authData.formatAuthData()};
    const url = this.fullid + "/" + property + extraParams;
    const response = await fetch(url, {headers: headers});
    const output = await response.json();
    if (response.ok) {
      return new IMResponse(response.ok, output[prop], null);
    } else {
      return new IMResponse(response.ok, null, output['message']);
    }
  }

  /**
    * Get the Cloud Resource Contextualization Log.
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = Context. Log in case of success.
    */
  async getContMsg() {
    return this.getProperty("contmsg")
  }

  /**
    * Perform an operation on the Cloud Resource.
    * 
    * @param {string} operation: Operation to perform.
    *  
    * @return {IMResponse}: Returns an IMResponse object with data = "" in case of success.
    */
  async performOperation(operation) {
    const headers = {'Accept': 'application/json',
                     'Authorization': this.client.authData.formatAuthData()};
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

  /**
    * Perform an start operation on the Cloud Resource.
    *  
    * @return {IMResponse}: Returns an IMResponse object with data = "" in case of success.
    */
  async start() {
    return this.performOperation("start");
  }

  /**
    * Perform an stop operation on the Cloud Resource.
    *  
    * @return {IMResponse}: Returns an IMResponse object with data = "" in case of success.
    */
  async stop() {
    return this.performOperation("stop");
  }
}

/**
 * This class represents a Virtual Machine Object.
 */
class IMVirtualMachine extends IMCloudResource {

  /**
    * Constructor.
    *
    * @param {IMClient} client: Reference to the IMClient object.
    * @param {string} infid: ID of the Infrastructure or the full URL of the VM ID.
    * @param {string} id: (Optional) ID of the VM. In this case infid must be the Infrastructure ID.
    */
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

  /**
    * Destroy the VM.
    *
    * @param {boolean} context: Flag to enable/disable the contextulization process after VM deletion.
    *                           Default value "true".
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = "" in case of success.
    */
  async destroy(context=true) {
    var extraParams = "";
    if (!context) {
      extraParams = extraParams + "?context=false";
    }
    return super.destroy(extraParams)
  }

  /**
    * Internal function to extrac the data in the IMCloudResource getInfo
    *
    * @param {object} data: data returned by the getInfo function.
    * 
    * @return {IMResponse}: Returns the radl field of the data.
    */
  extractInfo(data) {
    this.radl = data['radl'];
    return this.radl;
  }

  /**
    * Perform an reboot operation on the VM.
    *  
    * @return {IMResponse}: Returns an IMResponse object with data = "" in case of success.
    */
  async reboot() {
    return this.performOperation("reboot");
  }

  /**
    * Creates a disk snapshot.
    *
    * @param {string} diskNum: Number of the disk to create the snapshot.
    * @param {string} imageName: Name to set to the disk snapshot.
    * @param {boolean} autoDelete: Optional flag to delete/not delete the snapshot on VM deletion.
    *                              Default value: "false".
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = "" in case of success.
    */
  async createDiskSnapshot(diskNum, imageName, autoDelete=false) {
    const headers = {'Accept': 'application/json',
                     'Authorization': this.client.authData.formatAuthData()};
    var url = this.fullid + "/disks/" + diskNum + "/snapshot?image_name=" + imageName;
    if (autoDelete) {
      url = url + "&auto_delete=true";
    }
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

  /**
    * Modify the features of this VM.
    *
    * @param {string} template: template body to alter the VM.
    * @param {string} type: Optional type of the template format (radl, tosca, yaml or json).
    *                       Default value: "radl".
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = "" in case of success.
    */
  async alter(template, type="radl") {
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
      method: 'PUT',
      headers: headers,
      body: template
    })
    const output = await response.json();
    if (response.ok) {
      this.radl = output['radl'];
      return new IMResponse(true, output['radl'], null);
    } else {
      return new IMResponse(false, null, output['message']);
    }
  }
}

/**
 * This class represents an Infrastructure Object.
 */
class IMInfrastructure extends IMCloudResource {

  /**
    * Constructor.
    *
    * @param {IMClient} client: Reference to the IMClient object.
    * @param {string} id: ID of the Infrastructure (could the full URL or the only ID)
    */
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

  /**
    * Internal function to extrac the data in the IMCloudResource getInfo
    *
    * @param {object} data: data returned by the getInfo function.
    * 
    * @return {array}: Returns the list of VMs.
    */
  extractInfo(data) {
    this.vms = [];
    data['uri-list'].forEach(vmID => {
      this.vms.push(new IMVirtualMachine(this.client, vmID['uri']));
    });
    return this.vms;
  }

  /**
    * Get the Infrastructure State.
    * Also updates the state attribute in this object and in the VMs.
    * 
    * @return {IMResponse}: Returns an IMResponse object with data =
    *                       '{"state": {"state": "running", "vm_states": {"0": "running", "1": running}}}'
    *                       in case of success.
    */
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

  /**
    * Destroy the Infrastructure.
    *
    * @param {boolean} async: Flag to make the deletion process async/sync.
    *                         Default value "false".
    * @param {boolean} force: Flag to force the deletion of the infrastructure.
    *                         Default value "false".
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = "" in case of success.
    */
  async destroy(async=false, force=false) {
    var extraParams = "";
    if (async) {
      extraParams = extraParams + "?async=true";
    }
    if (force) {
      if (async) {
        extraParams = extraParams + "&";
      } else {
        extraParams = extraParams + "?";
      }
      extraParams = extraParams + "force=true";
    }
    return super.destroy(extraParams)
  }

  /**
    * Add resources to this infrastructure.
    * In case of success new VMs will be added to the list of VMs of this infrastructure.
    *
    * @param {string} template: template body to create the new resources.
    * @param {string} type: Optional type of the template format (radl, tosca, yaml or json).
    *                       Default value: "radl".
    * @param {boolean} context: Flag to enable/disable the contextulization process after VM addition.
    *                           Default value "true".
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = array of new VM IDs in case of success.
    */
  async addResource(template, type="radl", context=true) {
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
    var url = this.fullid;
    if (!context) {
      url = url + "?context=false";
    }
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

  /**
    * Reconfigure this infrastructure.
    *
    * @param {string} template: template body to reconfigure.
    * @param {string} type: Optional type of the template format (radl or json).
    *                       Default value: "radl".
    * @param {string} vmList: Optional comma separated list of VMs to reconfigure.
    *                         Default value "" (it means all VMs).
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = array of new VM IDs in case of success.
    */
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

  /**
    * Export the data of this infrastructure to migrate it to another IM service.
    * 
    * @param {boolean} del: Flag to delete the infrastructure from the IM service.
    *                       It will not delete the resources, only removes the data from the IM instance.
    *                       Default value "false".
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = Object with JSON data in case of success.
    */
  async export(del=false) {
    var extraParams = "";
    if (del) {
      extraParams = "?delete=true";
    }
    return this.getProperty("data", extraParams)
  }

  /**
    * Get the outputs of an Infrastructure.
    * It must have been created using a TOSCA template.
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = Object with JSON outputs in case of success.
    */
  async getOutputs() {
    return this.getProperty("outputs")
  }
}


/**
 * This is the main class to access the REST API of the Infrastructure Manager.
 * See this links for more info about IM REST API:
 *  - https://imdocs.readthedocs.io/en/latest/REST.html
 *  - https://app.swaggerhub.com/apis-docs/grycap/InfrastructureManager/
 */
class IMClient {

    /**
      * Constructor.
      *
      * @param {string} imUrl: URL of the IM service.
      * @param {IMAuthData} authData: Auth data to interact with the IM service.
      */
    constructor(imUrl, authData) {
      this.imUrl = imUrl;
      this.authData = authData;
    }

    /**
      * Gets IM service version.
      *
      * @return {string}: Version of the IM service.
      */
    async getVersion() {
        const response = await fetch(this.imUrl + '/version');
        return await response.text();
    }

  /**
    * Get the list of Infrastructures.
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = array of IMInfrastructure in case of success.
    */
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

  /**
    * Create a new Infrastructure.
    * 
    * @param {string} template: template body to create the new infrastructure.
    * @param {string} type: Optional type of the template format (radl, tosca, yaml or json).
    *                       Default value: "radl".
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = IMInfrastructure in case of success.
    */
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

  /**
    * Imports an Infrastructure (Using JSON data from Export operation).
    * 
    * @param {string} data: String with the JSON data of the Infrastructure.
    * 
    * @return {IMResponse}: Returns an IMResponse object with data = IMInfrastructure in case of success.
    */
    async importInfrastructure(data) {
      const headers = {'Accept': 'application/json',
                       'Authorization': this.authData.formatAuthData(),
                       'Content-Type': "application/json"};
      const url = this.imUrl + '/infrastructures';
      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: data
      })

      if (response.ok) {
        const output = await response.text();
        var inf = new IMInfrastructure(this, output);
        return new IMResponse(true, inf, null);
      } else {
        const output = await response.json();
        return new IMResponse(false, null, output['message']);
      }
    }
}