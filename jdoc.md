# Documentation

## `class IMResponse`

Helper class to return the IM REST API responses.

## `constructor(ok, data, message)`

Constructor.

 * **Parameters:**
   * `ok:` — `boolean` — Flag to identify if the response has been successful.
   * `data:` — `object` — Result of the call in case of success.
   * `message:` — `string` — Error message in case of error.

## `class IMAuthDataItem`

This class represents the IM auth data item.

## `constructor(id, type, fields)`

Constructor. For valid values see: https://imdocs.readthedocs.io/en/latest/client.html#auth-file

 * **Parameters:**
   * `id:` — `string` — ID of the auth item.
   * `type:` — `string` — Type of the auth item.
   * `fields:` — `object` — Dictionary with the auth data.

## `toAuthLine()`

Format this Auth item into an IM auth line.

 * **Returns:** `string` — the formatted auth line.

## `class IMAuthData`

This class represents the IM auth data (a list of IMAuthDataItem).

## `constructor(authList)`

Constructor. For valid values see: https://imdocs.readthedocs.io/en/latest/client.html#auth-file

 * **Parameters:** `authList:` — `array` — Array of IMAuthDataItem elements.

## `formatAuthData()`

Format this Auth data into an IM auth valid format..

 * **Returns:** `string` — the formatted auth data.

## `class IMCloudResource`

This class represents a base class for the Cloud Resources Object.

## `constructor(client)`

Constructor.

 * **Parameters:** `client:` — `IMClient` — Reference to the IMClient object.

## `async destroy(extraParams="")`

Destroy the Cloud resource.

 * **Parameters:** `extraParams:` — `string` — Extra parameters to be appended to the end of the URL of the object.

     <p>
 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = "" in case of success.

## `async getInfo()`

Get Info about the Cloud resource.

 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = Object Info in case of success.

## `async getProperty(property, extraParams="")`

Get a Cloud Resource property.

 * **Parameters:**
   * `property:` — `string` — Property to retrieve.
   * `extraParams:` — `string` — Extra parameters to be appended to the end of the URL of the object.

     <p>
 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = Object property in case of success.

## `async getContMsg()`

Get the Cloud Resource Contextualization Log.

 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = Context. Log in case of success.

## `async performOperation(operation)`

Perform an operation on the Cloud Resource.

 * **Parameters:** `operation:` — `string` — Operation to perform.

     <p>
 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = "" in case of success.

## `async start()`

Perform an start operation on the Cloud Resource.

 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = "" in case of success.

## `async stop()`

Perform an stop operation on the Cloud Resource.

 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = "" in case of success.

## `class IMVirtualMachine extends IMCloudResource`

This class represents a Virtual Machine Object.

## `constructor(client, infid, id)`

Constructor.

 * **Parameters:**
   * `client:` — `IMClient` — Reference to the IMClient object.
   * `infid:` — `string` — ID of the Infrastructure or the full URL of the VM ID.
   * `id:` — `string` — (Optional) ID of the VM. In this case infid must be the Infrastructure ID.

## `async destroy(context=true)`

Destroy the VM.

 * **Parameters:** `context:` — `boolean` — Flag to enable/disable the contextulization process after VM deletion.

     Default value "true".

     <p>
 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = "" in case of success.

## `extractInfo(data)`

Internal function to extrac the data in the IMCloudResource getInfo

 * **Parameters:** `data:` — `object` — data returned by the getInfo function.

     <p>
 * **Returns:** `IMResponse}` — Returns the radl field of the data.

## `async reboot()`

Perform an reboot operation on the VM.

 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = "" in case of success.

## `async createDiskSnapshot(diskNum, imageName, autoDelete=false)`

Creates a disk snapshot.

 * **Parameters:**
   * `diskNum:` — `string` — Number of the disk to create the snapshot.
   * `imageName:` — `string` — Name to set to the disk snapshot.
   * `autoDelete:` — `boolean` — Optional flag to delete/not delete the snapshot on VM deletion.

     Default value: "false".

     <p>
 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = "" in case of success.

## `async alter(template, type="radl")`

Modify the features of this VM.

 * **Parameters:**
   * `template:` — `string` — template body to alter the VM.
   * `type:` — `string` — Optional type of the template format (radl, tosca, yaml or json).

     Default value: "radl".

     <p>
 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = "" in case of success.

## `class IMInfrastructure extends IMCloudResource`

This class represents an Infrastructure Object.

## `constructor(client, id)`

Constructor.

 * **Parameters:**
   * `client:` — `IMClient` — Reference to the IMClient object.
   * `id:` — `string` — ID of the Infrastructure (could the full URL or the only ID)

## `extractInfo(data)`

Internal function to extrac the data in the IMCloudResource getInfo

 * **Parameters:** `data:` — `object` — data returned by the getInfo function.

     <p>
 * **Returns:** `array}` — Returns the list of VMs.

## `async getState()`

Get the Infrastructure State. Also updates the state attribute in this object and in the VMs.

 * **Returns:** `IMResponse}` — Returns an IMResponse object with data =

     '{"state": {"state": "running", "vm_states": {"0": "running", "1": running}}}'

     in case of success.

## `async destroy(async=false, force=false)`

Destroy the Infrastructure.

 * **Parameters:**
   * `async:` — `boolean` — Flag to make the deletion process async/sync.

     Default value "false".
   * `force:` — `boolean` — Flag to force the deletion of the infrastructure.

     Default value "false".

     <p>
 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = "" in case of success.

## `async addResource(template, type="radl", context=true)`

Add resources to this infrastructure. In case of success new VMs will be added to the list of VMs of this infrastructure.

 * **Parameters:**
   * `template:` — `string` — template body to create the new resources.
   * `type:` — `string` — Optional type of the template format (radl, tosca, yaml or json).

     Default value: "radl".
   * `context:` — `boolean` — Flag to enable/disable the contextulization process after VM addition.

     Default value "true".

     <p>
 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = array of new VM IDs in case of success.

## `async reconfigure(template, type="radl", vmList="")`

Reconfigure this infrastructure.

 * **Parameters:**
   * `template:` — `string` — template body to reconfigure.
   * `type:` — `string` — Optional type of the template format (radl or json).

     Default value: "radl".
   * `vmList:` — `string` — Optional comma separated list of VMs to reconfigure.

     Default value "" (it means all VMs).

     <p>
 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = array of new VM IDs in case of success.

## `async export(del=false)`

Export the data of this infrastructure to migrate it to another IM service.

 * **Parameters:** `del:` — `boolean` — Flag to delete the infrastructure from the IM service.

     It will not delete the resources, only removes the data from the IM instance.

     Default value "false".

     <p>
 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = Object with JSON data in case of success.

## `async getOutputs()`

Get the outputs of an Infrastructure. It must have been created using a TOSCA template.

 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = Object with JSON outputs in case of success.

## `class IMClient`

This is the main class to access the REST API of the Infrastructure Manager. See this links for more info about IM REST API: - https://imdocs.readthedocs.io/en/latest/REST.html - https://app.swaggerhub.com/apis-docs/grycap/InfrastructureManager/

## `constructor(imUrl, authData)`

Constructor.

 * **Parameters:**
   * `imUrl:` — `string` — URL of the IM service.
   * `authData:` — `IMAuthData` — Auth data to interact with the IM service.

## `async getVersion()`

Gets IM service version.

 * **Returns:** `string}` — Version of the IM service.

## `async getInfrastructureList()`

Get the list of Infrastructures.

 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = array of IMInfrastructure in case of success.

## `async createInfrastructure(template, type="radl")`

Create a new Infrastructure.

 * **Parameters:**
   * `template:` — `string` — template body to create the new infrastructure.
   * `type:` — `string` — Optional type of the template format (radl, tosca, yaml or json).

     Default value: "radl".

     <p>
 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = IMInfrastructure in case of success.

## `async importInfrastructure(data)`

Imports an Infrastructure (Using JSON data from Export operation).

 * **Parameters:** `data:` — `string` — String with the JSON data of the Infrastructure.

     <p>
 * **Returns:** `IMResponse}` — Returns an IMResponse object with data = IMInfrastructure in case of success.