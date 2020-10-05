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

    constructor(ok, data) {
      this.ok = ok;
      this.data = data;
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
        return new IMResponse(response.ok, await response.json());
    }

    async getInfrastructureInfo(infID) {
      const headers = {'Accept': 'application/json',
                      'Authorization': this.authData.formatAuthData()};
      const url = this.imUrl + '/infrastructures/' + infID;
      const response = await fetch(url, {headers: headers});
      return new IMResponse(response.ok, await response.json());
    }

    async getVMInfo(infID, vmID) {
        const headers = {'Accept': 'application/json',
                        'Authorization': this.authData.formatAuthData()};
        const url = this.imUrl + '/infrastructures/' + infID + "/vms/" + vmID;
        const response = await fetch(url, {headers: headers});
        return new IMResponse(response.ok, await response.json());
    }
  
    async destroyInfrastructure(infID) {
        const headers = {'Accept': 'application/json',
                         'Authorization': this.authData.formatAuthData()};
        const url = this.imUrl + '/infrastructures/' + infID;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: headers
        })
        if (response.ok) {
          return new IMResponse(response.ok, await response.text());
        } else {
          return new IMResponse(response.ok, await response.json());
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
        return new IMResponse(response.ok, await response.json());
      }

}