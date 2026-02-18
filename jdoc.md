## Classes

<dl>
<dt><a href="#IMResponse">IMResponse</a></dt>
<dd><p>Helper class to return the IM REST API responses.</p>
</dd>
<dt><a href="#IMAuthDataItem">IMAuthDataItem</a></dt>
<dd><p>This class represents the IM auth data item.</p>
</dd>
<dt><a href="#IMAuthData">IMAuthData</a></dt>
<dd><p>This class represents the IM auth data (a list of IMAuthDataItem).</p>
</dd>
<dt><a href="#IMCloudResource">IMCloudResource</a></dt>
<dd><p>This class represents a base class for the Cloud Resources Object.</p>
</dd>
<dt><a href="#IMVirtualMachine">IMVirtualMachine</a></dt>
<dd><p>This class represents a Virtual Machine Object.</p>
</dd>
<dt><a href="#IMInfrastructure">IMInfrastructure</a></dt>
<dd><p>This class represents an Infrastructure Object.</p>
</dd>
<dt><a href="#IMClient">IMClient</a></dt>
<dd><p>This is the main class to access the REST API of the Infrastructure Manager.
See this links for more info about IM REST API:</p>
<ul>
<li><a href="https://imdocs.readthedocs.io/en/latest/REST.html">https://imdocs.readthedocs.io/en/latest/REST.html</a></li>
<li><a href="https://app.swaggerhub.com/apis-docs/grycap/InfrastructureManager/">https://app.swaggerhub.com/apis-docs/grycap/InfrastructureManager/</a></li>
</ul>
</dd>
</dl>

<a name="IMResponse"></a>

## IMResponse
Helper class to return the IM REST API responses.

**Kind**: global class  
<a name="new_IMResponse_new"></a>

### new IMResponse(ok:, data:, message:)
Constructor.


| Param | Type | Description |
| --- | --- | --- |
| ok: | <code>boolean</code> | Flag to identify if the response has been successful. |
| data: | <code>object</code> | Result of the call in case of success. |
| message: | <code>string</code> | Error message in case of error. |

<a name="IMAuthDataItem"></a>

## IMAuthDataItem
This class represents the IM auth data item.

**Kind**: global class  

* [IMAuthDataItem](#IMAuthDataItem)
    * [new IMAuthDataItem(id:, type:, fields:)](#new_IMAuthDataItem_new)
    * [.toAuthLine()](#IMAuthDataItem+toAuthLine) ⇒ <code>string</code>

<a name="new_IMAuthDataItem_new"></a>

### new IMAuthDataItem(id:, type:, fields:)
Constructor.
For valid values see: https://imdocs.readthedocs.io/en/latest/client.html#auth-file


| Param | Type | Description |
| --- | --- | --- |
| id: | <code>string</code> | ID of the auth item. |
| type: | <code>string</code> | Type of the auth item. |
| fields: | <code>object</code> | Dictionary with the auth data. |

<a name="IMAuthDataItem+toAuthLine"></a>

### imAuthDataItem.toAuthLine() ⇒ <code>string</code>
Format this Auth item into an IM auth line.

**Kind**: instance method of [<code>IMAuthDataItem</code>](#IMAuthDataItem)  
**Returns**: <code>string</code> - the formatted auth line.  
<a name="IMAuthData"></a>

## IMAuthData
This class represents the IM auth data (a list of IMAuthDataItem).

**Kind**: global class  

* [IMAuthData](#IMAuthData)
    * [new IMAuthData(authList:)](#new_IMAuthData_new)
    * [.formatAuthData()](#IMAuthData+formatAuthData) ⇒ <code>string</code>

<a name="new_IMAuthData_new"></a>

### new IMAuthData(authList:)
Constructor.
For valid values see: https://imdocs.readthedocs.io/en/latest/client.html#auth-file


| Param | Type | Description |
| --- | --- | --- |
| authList: | <code>array</code> | Array of IMAuthDataItem elements. |

<a name="IMAuthData+formatAuthData"></a>

### imAuthData.formatAuthData() ⇒ <code>string</code>
Format this Auth data into an IM auth valid format..

**Kind**: instance method of [<code>IMAuthData</code>](#IMAuthData)  
**Returns**: <code>string</code> - the formatted auth data.  
<a name="IMCloudResource"></a>

## IMCloudResource
This class represents a base class for the Cloud Resources Object.

**Kind**: global class  

* [IMCloudResource](#IMCloudResource)
    * [new IMCloudResource(client:)](#new_IMCloudResource_new)
    * [.destroy(extraParams:)](#IMCloudResource+destroy) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.getInfo()](#IMCloudResource+getInfo) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.getProperty(property:, extraParams:)](#IMCloudResource+getProperty) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.getContMsg()](#IMCloudResource+getContMsg) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.performOperation(operation:)](#IMCloudResource+performOperation) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.start()](#IMCloudResource+start) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.stop()](#IMCloudResource+stop) ⇒ [<code>IMResponse</code>](#IMResponse)

<a name="new_IMCloudResource_new"></a>

### new IMCloudResource(client:)
Constructor.


| Param | Type | Description |
| --- | --- | --- |
| client: | [<code>IMClient</code>](#IMClient) | Reference to the IMClient object. |

<a name="IMCloudResource+destroy"></a>

### imCloudResource.destroy(extraParams:) ⇒ [<code>IMResponse</code>](#IMResponse)
Destroy the Cloud resource.

**Kind**: instance method of [<code>IMCloudResource</code>](#IMCloudResource)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = "" in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| extraParams: | <code>string</code> | Extra parameters to be appended to the end of the URL of the object. |

<a name="IMCloudResource+getInfo"></a>

### imCloudResource.getInfo() ⇒ [<code>IMResponse</code>](#IMResponse)
Get Info about the Cloud resource.

**Kind**: instance method of [<code>IMCloudResource</code>](#IMCloudResource)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = Object Info in case of success.  
<a name="IMCloudResource+getProperty"></a>

### imCloudResource.getProperty(property:, extraParams:) ⇒ [<code>IMResponse</code>](#IMResponse)
Get a Cloud Resource property.

**Kind**: instance method of [<code>IMCloudResource</code>](#IMCloudResource)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = Object property in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| property: | <code>string</code> | Property to retrieve. |
| extraParams: | <code>string</code> | Extra parameters to be appended to the end of the URL of the object. |

<a name="IMCloudResource+getContMsg"></a>

### imCloudResource.getContMsg() ⇒ [<code>IMResponse</code>](#IMResponse)
Get the Cloud Resource Contextualization Log.

**Kind**: instance method of [<code>IMCloudResource</code>](#IMCloudResource)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = Context. Log in case of success.  
<a name="IMCloudResource+performOperation"></a>

### imCloudResource.performOperation(operation:) ⇒ [<code>IMResponse</code>](#IMResponse)
Perform an operation on the Cloud Resource.

**Kind**: instance method of [<code>IMCloudResource</code>](#IMCloudResource)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = "" in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| operation: | <code>string</code> | Operation to perform. |

<a name="IMCloudResource+start"></a>

### imCloudResource.start() ⇒ [<code>IMResponse</code>](#IMResponse)
Perform an start operation on the Cloud Resource.

**Kind**: instance method of [<code>IMCloudResource</code>](#IMCloudResource)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = "" in case of success.  
<a name="IMCloudResource+stop"></a>

### imCloudResource.stop() ⇒ [<code>IMResponse</code>](#IMResponse)
Perform an stop operation on the Cloud Resource.

**Kind**: instance method of [<code>IMCloudResource</code>](#IMCloudResource)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = "" in case of success.  
<a name="IMVirtualMachine"></a>

## IMVirtualMachine
This class represents a Virtual Machine Object.

**Kind**: global class  

* [IMVirtualMachine](#IMVirtualMachine)
    * [new IMVirtualMachine(client:, infid:, id:)](#new_IMVirtualMachine_new)
    * [.destroy(context:)](#IMVirtualMachine+destroy) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.extractInfo(data:)](#IMVirtualMachine+extractInfo) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.reboot()](#IMVirtualMachine+reboot) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.createDiskSnapshot(diskNum:, imageName:, autoDelete:)](#IMVirtualMachine+createDiskSnapshot) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.alter(template:, type:)](#IMVirtualMachine+alter) ⇒ [<code>IMResponse</code>](#IMResponse)

<a name="new_IMVirtualMachine_new"></a>

### new IMVirtualMachine(client:, infid:, id:)
Constructor.


| Param | Type | Description |
| --- | --- | --- |
| client: | [<code>IMClient</code>](#IMClient) | Reference to the IMClient object. |
| infid: | <code>string</code> | ID of the Infrastructure or the full URL of the VM ID. |
| id: | <code>string</code> | (Optional) ID of the VM. In this case infid must be the Infrastructure ID. |

<a name="IMVirtualMachine+destroy"></a>

### imVirtualMachine.destroy(context:) ⇒ [<code>IMResponse</code>](#IMResponse)
Destroy the VM.

**Kind**: instance method of [<code>IMVirtualMachine</code>](#IMVirtualMachine)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = "" in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| context: | <code>boolean</code> | Flag to enable/disable the contextulization process after VM deletion.                           Default value "true". |

<a name="IMVirtualMachine+extractInfo"></a>

### imVirtualMachine.extractInfo(data:) ⇒ [<code>IMResponse</code>](#IMResponse)
Internal function to extrac the data in the IMCloudResource getInfo

**Kind**: instance method of [<code>IMVirtualMachine</code>](#IMVirtualMachine)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns the radl field of the data.  

| Param | Type | Description |
| --- | --- | --- |
| data: | <code>object</code> | data returned by the getInfo function. |

<a name="IMVirtualMachine+reboot"></a>

### imVirtualMachine.reboot() ⇒ [<code>IMResponse</code>](#IMResponse)
Perform an reboot operation on the VM.

**Kind**: instance method of [<code>IMVirtualMachine</code>](#IMVirtualMachine)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = "" in case of success.  
<a name="IMVirtualMachine+createDiskSnapshot"></a>

### imVirtualMachine.createDiskSnapshot(diskNum:, imageName:, autoDelete:) ⇒ [<code>IMResponse</code>](#IMResponse)
Creates a disk snapshot.

**Kind**: instance method of [<code>IMVirtualMachine</code>](#IMVirtualMachine)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = "" in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| diskNum: | <code>string</code> | Number of the disk to create the snapshot. |
| imageName: | <code>string</code> | Name to set to the disk snapshot. |
| autoDelete: | <code>boolean</code> | Optional flag to delete/not delete the snapshot on VM deletion.                              Default value: "false". |

<a name="IMVirtualMachine+alter"></a>

### imVirtualMachine.alter(template:, type:) ⇒ [<code>IMResponse</code>](#IMResponse)
Modify the features of this VM.

**Kind**: instance method of [<code>IMVirtualMachine</code>](#IMVirtualMachine)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = "" in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| template: | <code>string</code> | template body to alter the VM. |
| type: | <code>string</code> | Optional type of the template format (radl, tosca, yaml or json).                       Default value: "radl". |

<a name="IMInfrastructure"></a>

## IMInfrastructure
This class represents an Infrastructure Object.

**Kind**: global class  

* [IMInfrastructure](#IMInfrastructure)
    * [new IMInfrastructure(client:, id:)](#new_IMInfrastructure_new)
    * [.extractInfo(data:)](#IMInfrastructure+extractInfo) ⇒ <code>array</code>
    * [.getState()](#IMInfrastructure+getState) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.destroy(async:, force:)](#IMInfrastructure+destroy) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.addResource(template:, type:, context:)](#IMInfrastructure+addResource) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.reconfigure(template:, type:, vmList:)](#IMInfrastructure+reconfigure) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.export(del:)](#IMInfrastructure+export) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.getOutputs()](#IMInfrastructure+getOutputs) ⇒ [<code>IMResponse</code>](#IMResponse)

<a name="new_IMInfrastructure_new"></a>

### new IMInfrastructure(client:, id:)
Constructor.


| Param | Type | Description |
| --- | --- | --- |
| client: | [<code>IMClient</code>](#IMClient) | Reference to the IMClient object. |
| id: | <code>string</code> | ID of the Infrastructure (could the full URL or the only ID) |

<a name="IMInfrastructure+extractInfo"></a>

### imInfrastructure.extractInfo(data:) ⇒ <code>array</code>
Internal function to extrac the data in the IMCloudResource getInfo

**Kind**: instance method of [<code>IMInfrastructure</code>](#IMInfrastructure)  
**Returns**: <code>array</code> - : Returns the list of VMs.  

| Param | Type | Description |
| --- | --- | --- |
| data: | <code>object</code> | data returned by the getInfo function. |

<a name="IMInfrastructure+getState"></a>

### imInfrastructure.getState() ⇒ [<code>IMResponse</code>](#IMResponse)
Get the Infrastructure State.
Also updates the state attribute in this object and in the VMs.

**Kind**: instance method of [<code>IMInfrastructure</code>](#IMInfrastructure)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data =
                      '{"state": {"state": "running", "vm_states": {"0": "running", "1": running}}}'
                      in case of success.  
<a name="IMInfrastructure+destroy"></a>

### imInfrastructure.destroy(async:, force:) ⇒ [<code>IMResponse</code>](#IMResponse)
Destroy the Infrastructure.

**Kind**: instance method of [<code>IMInfrastructure</code>](#IMInfrastructure)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = "" in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| async: | <code>boolean</code> | Flag to make the deletion process async/sync.                         Default value "false". |
| force: | <code>boolean</code> | Flag to force the deletion of the infrastructure.                         Default value "false". |

<a name="IMInfrastructure+addResource"></a>

### imInfrastructure.addResource(template:, type:, context:) ⇒ [<code>IMResponse</code>](#IMResponse)
Add resources to this infrastructure.
In case of success new VMs will be added to the list of VMs of this infrastructure.

**Kind**: instance method of [<code>IMInfrastructure</code>](#IMInfrastructure)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = array of new VM IDs in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| template: | <code>string</code> | template body to create the new resources. |
| type: | <code>string</code> | Optional type of the template format (radl, tosca, yaml or json).                       Default value: "radl". |
| context: | <code>boolean</code> | Flag to enable/disable the contextulization process after VM addition.                           Default value "true". |

<a name="IMInfrastructure+reconfigure"></a>

### imInfrastructure.reconfigure(template:, type:, vmList:) ⇒ [<code>IMResponse</code>](#IMResponse)
Reconfigure this infrastructure.

**Kind**: instance method of [<code>IMInfrastructure</code>](#IMInfrastructure)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = array of new VM IDs in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| template: | <code>string</code> | template body to reconfigure. |
| type: | <code>string</code> | Optional type of the template format (radl or json).                       Default value: "radl". |
| vmList: | <code>string</code> | Optional comma separated list of VMs to reconfigure.                         Default value "" (it means all VMs). |

<a name="IMInfrastructure+export"></a>

### imInfrastructure.export(del:) ⇒ [<code>IMResponse</code>](#IMResponse)
Export the data of this infrastructure to migrate it to another IM service.

**Kind**: instance method of [<code>IMInfrastructure</code>](#IMInfrastructure)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = Object with JSON data in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| del: | <code>boolean</code> | Flag to delete the infrastructure from the IM service.                       It will not delete the resources, only removes the data from the IM instance.                       Default value "false". |

<a name="IMInfrastructure+getOutputs"></a>

### imInfrastructure.getOutputs() ⇒ [<code>IMResponse</code>](#IMResponse)
Get the outputs of an Infrastructure.
It must have been created using a TOSCA template.

**Kind**: instance method of [<code>IMInfrastructure</code>](#IMInfrastructure)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = Object with JSON outputs in case of success.  
<a name="IMClient"></a>

## IMClient
This is the main class to access the REST API of the Infrastructure Manager.
See this links for more info about IM REST API:
 - https://imdocs.readthedocs.io/en/latest/REST.html
 - https://app.swaggerhub.com/apis-docs/grycap/InfrastructureManager/

**Kind**: global class  

* [IMClient](#IMClient)
    * [new IMClient(imUrl:, authData:)](#new_IMClient_new)
    * [.getVersion()](#IMClient+getVersion) ⇒ <code>string</code>
    * [.getInfrastructureList()](#IMClient+getInfrastructureList) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.createInfrastructure(template:, type:)](#IMClient+createInfrastructure) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.importInfrastructure(data:)](#IMClient+importInfrastructure) ⇒ [<code>IMResponse</code>](#IMResponse)
    * [.getCloudInfo(cloud_id:, type:)](#IMClient+getCloudInfo) ⇒ [<code>IMResponse</code>](#IMResponse)

<a name="new_IMClient_new"></a>

### new IMClient(imUrl:, authData:)
Constructor.


| Param | Type | Description |
| --- | --- | --- |
| imUrl: | <code>string</code> | URL of the IM service. |
| authData: | [<code>IMAuthData</code>](#IMAuthData) | Auth data to interact with the IM service. |

<a name="IMClient+getVersion"></a>

### imClient.getVersion() ⇒ <code>string</code>
Gets IM service version.

**Kind**: instance method of [<code>IMClient</code>](#IMClient)  
**Returns**: <code>string</code> - : Version of the IM service.  
<a name="IMClient+getInfrastructureList"></a>

### imClient.getInfrastructureList() ⇒ [<code>IMResponse</code>](#IMResponse)
Get the list of Infrastructures.

**Kind**: instance method of [<code>IMClient</code>](#IMClient)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = array of IMInfrastructure in case of success.  
<a name="IMClient+createInfrastructure"></a>

### imClient.createInfrastructure(template:, type:) ⇒ [<code>IMResponse</code>](#IMResponse)
Create a new Infrastructure.

**Kind**: instance method of [<code>IMClient</code>](#IMClient)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = IMInfrastructure in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| template: | <code>string</code> | template body to create the new infrastructure. |
| type: | <code>string</code> | Optional type of the template format (radl, tosca, yaml or json).                       Default value: "radl". |

<a name="IMClient+importInfrastructure"></a>

### imClient.importInfrastructure(data:) ⇒ [<code>IMResponse</code>](#IMResponse)
Imports an Infrastructure (Using JSON data from Export operation).

**Kind**: instance method of [<code>IMClient</code>](#IMClient)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = IMInfrastructure in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| data: | <code>string</code> | String with the JSON data of the Infrastructure. |

<a name="IMClient+getCloudInfo"></a>

### imClient.getCloudInfo(cloud_id:, type:) ⇒ [<code>IMResponse</code>](#IMResponse)
Get the quotas or images of a cloud provider

**Kind**: instance method of [<code>IMClient</code>](#IMClient)  
**Returns**: [<code>IMResponse</code>](#IMResponse) - : Returns an IMResponse object with data = Object with the quotas or images in case of success.  

| Param | Type | Description |
| --- | --- | --- |
| cloud_id: | <code>string</code> | String with the ID of the cloud provider. |
| type: | <code>string</code> | String with the type of info to retrieve (quotas or images). |

