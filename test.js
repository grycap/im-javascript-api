var assert = require('assert');

const {IMAuthDataItem, IMAuthData, IMClient, IMInfrastructure, IMVirtualMachine} = require('./im.js');

var imAuth = new IMAuthDataItem("im", "InfrastructureManager", {"username": "userjs", "password": "passjs"})
var oneAuth = new IMAuthDataItem("dummy", "Dummy", {})

var authData = new IMAuthData([imAuth, oneAuth])
var im = new IMClient("https://appsgrycap.i3m.upv.es/im-dev", authData);

describe('getVersion()', function () {
    it('get IM version', async function () {
      const version = await im.getVersion();
      assert.ok(version.length > 4);
    });
});


var inf = null;

// Create an infrastructure
describe('createInfrastructure()', function () {
    it('Create an Infrastructure', async function () {
        radl = `network publica (outbound = 'yes')
        system node (
        cpu.count>=1 and
        memory.size>=512m and
        net_interface.0.connection = 'publica' and
        net_interface.0.dns_name = 'testnode' and
        disk.0.os.name='linux' and
        disk.0.os.flavour='ubuntu' and
        disk.0.image.url = 'dummy://dummy.com' and
        disk.0.os.credentials.username = 'dummy'
        )
        deploy node 1`
      const response = await im.createInfrastructure(radl);
      assert.ok(response.ok);
      inf = response.data;
      assert.strictEqual(inf.id.length, 36);
    });
});


describe('getInfrastructureList()', function () {
    it('Get the list of Infrastructures.', async function () {
      const response = await im.getInfrastructureList();
      assert.ok(response.ok);
      assert.strictEqual(response.data.length, 1);
    });
});

describe('infGetState()', function () {
    it('Getting Inf. State', async function () {
      const response = await inf.getState();
      assert.ok(response.ok);
      assert.deepStrictEqual(response.data, { state: { state: 'running', vm_states: { '0': 'running' } } });
    });
});


describe('addResource()', function () {
    it('Adding resources to an Inf.', async function () {
      const addradl = "network publica\nsystem node\ndeploy node 1";
      const response = await inf.addResource(addradl);
      assert.ok(response.ok);
      assert.strictEqual(response.data.length, 1);
      assert.strictEqual(response.data[0].id, "1");
    });
});

var vm = null;

describe('infGetInfo()', function () {
    it('Getting Inf. Info', async function () {
      const response = await inf.getInfo();
      assert.ok(response.ok);
      assert.deepStrictEqual(response.data.length, 2);
      assert.deepStrictEqual(response.data[0].id, "0");
      assert.deepStrictEqual(response.data[1].id, "1");
      vm = response.data[1];
    });
});

describe('infgetContMsg()', function () {
    it('GetContMsg of an Inf.', async function () {
      const response = await inf.getContMsg();
      assert.ok(response.ok);
    });
});

describe('vmGetInfo()', function () {
    it('Get info of a VM.', async function () {
      const response = await vm.getInfo();
      assert.ok(response.ok);
      assert.strictEqual(response.data[1]["class"], "system");
      assert.strictEqual(response.data[1]["id"], "node");
    });
});

describe('vmStop()', function () {
    it('Stop VM.', async function () {
      const response = await vm.stop();
      assert.ok(response.ok);
    });
});

describe('vmStart()', function () {
    it('Start VM.', async function () {
      const response = await vm.start();
      assert.ok(response.ok);
    });
});

describe('vmReboot()', function () {
    it('Reboot VM.', async function () {
      const response = await vm.reboot();
      assert.ok(response.ok);
    });
});

describe('vmAlter()', function () {
    it('Alter VM size.', async function () {
        radl = `system node (
        cpu.count>=2 and
        memory.size>=512m
        )`
      const response = await vm.alter(radl);
      assert.ok(response.ok);
    });
});

describe('vmDestroy()', function () {
    it('Destroy VM.', async function () {
      const response = await vm.destroy();
      assert.ok(response.ok);
    });
});


describe('infReconfigure()', function () {
    it('Reconfigure Inf.', async function () {
      const response = await inf.reconfigure("");
      assert.ok(response.ok);
    });
});

describe('infGetOutputs()', function () {
    it('Get Outputs of an Inf.', async function () {
      const response = await inf.getOutputs();
      assert.ok(!response.ok);
      assert.strictEqual(response.message, "Error Getting Inf. prop: (403, \"'outputs' infrastructure property is not valid in this infrastructure\")");
    });
});

describe('InfExport()', function () {
    it('Export Inf.', async function () {
      const response = await inf.export();
      assert.ok(response.ok);
      assert.ok(response.data.length>200);
    });
});

describe('InfStop()', function () {
    it('Stop Inf.', async function () {
      const response = await inf.stop();
      assert.ok(response.ok);
    });
});

describe('InfStart()', function () {
    it('Start Inf.', async function () {
      const response = await inf.start();
      assert.ok(response.ok);
    });
});

describe('infDestroy()', function () {
    it('Destroy Inf.', async function () {
      const response = await inf.destroy();
      assert.ok(response.ok);
    });
});