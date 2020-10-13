var assert = require('assert');

const {IMAuthDataItem, IMAuthData, IMClient, IMInfrastructure, IMVirtualMachine} = require('./im.js');


function launchTest() {
    var imAuth = new IMAuthDataItem("im", "InfrastructureManager", {"username": "user",
                                                                    "password": "pass"})
    var oneAuth = new IMAuthDataItem("dummy", "Dummy", {})

    var authData = new IMAuthData([imAuth, oneAuth])
    var im = new IMClient("https://appsgrycap.i3m.upv.es:31443/im-dev", authData);

    console.log("Running");

    im.getVersion().then(
        version => {
            console.log("IM Version: " + version + "\n");
        }
    );

    im.getInfrastructureList().then(
        response => {
            assert.strict(response.ok);
            if (response.ok) {
                console.log("Inf. list");
                console.log("\n------------------------------------\n");
                response.data.forEach(inf => {
                    console.log(inf.id + "\n");
                });
                console.log("\n------------------------------------\n");
            } else {
                console.log("Error Getting Inf. list");
                console.log("\n------------------------------------\n");
                console.log(response.message);
                console.log("\n------------------------------------\n");
            }
        }
    );

    // Create an infrastructure
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
    im.createInfrastructure(radl).then(
        response => {
            if (response.ok) {
                var inf = response.data;
                console.log("Create Inf.");
                console.log("\n------------------------------------\n");
                console.log("Inf: " + inf.id + " successfully created.");
                console.log("\n------------------------------------\n");

                addradl = "network publica\nsystem node\ndeploy node 1";
                inf.addResource(addradl).then(
                    response => {
                        if (response.ok) {
                            console.log("Added VMs");
                            console.log("\n------------------------------------\n");
                            response.data.forEach(vm => {
                                console.log(vm.id + "\n");
                            })
                            console.log("\n------------------------------------\n\n");


                            // Get infrastructure Info
                            inf.getInfo().then(
                                response => {
                                    if (response.ok) {
                                        console.log("Inf. Info");
                                        console.log("\n------------------------------------\n");
                                        response.data.forEach(vm => {

                                            vm.getInfo().then(
                                                response => {
                                                    if (response.ok) {
                                                        console.log("VM Info");
                                                        console.log("\n------------------------------------\n");
                                                        console.log(JSON.stringify(response.data));
                                                        console.log("\n------------------------------------\n\n");
                                                    } else {
                                                        console.log("Error Getting VM Info");
                                                        console.log("\n------------------------------------\n");
                                                        console.log(response.message);
                                                        console.log("\n------------------------------------\n\n");
                                                    }
                                                }
                                            );


                                            vm.reboot().then(
                                                response => {
                                                    if (response.ok) {
                                                        console.log("VM reboot");
                                                        console.log("\n------------------------------------\n");
                                                        console.log("Sucess\n");
                                                        console.log("\n------------------------------------\n\n");
                                                    } else {
                                                        console.log("Error rebooting VM");
                                                        console.log("\n------------------------------------\n");
                                                        console.log(response.message);
                                                        console.log("\n------------------------------------\n\n");
                                                    }
                                                }
                                            );
                                        
                                        });
                                        console.log("\n------------------------------------\n");
                                    } else {
                                        console.log("Error Getting Inf. Info");
                                        console.log("\n------------------------------------\n");
                                        console.log(response.message);
                                        console.log("\n------------------------------------\n\n");
                                    }

                                    inf.getState().then(
                                        response => {
                                            if (response.ok) {
                                                console.log("Get Inf. State");
                                                console.log("\n------------------------------------\n");
                                                console.log(inf.state + "\n");
                                                inf.vms.forEach(vm => {
                                                    console.log(vm.id + ": " + vm.state + "\n");
                                                })
                                                console.log("\n------------------------------------\n\n");
                                            } else {
                                                console.log("Error Getting Inf. State");
                                                console.log("\n------------------------------------\n");
                                                console.log(response.message);
                                                console.log("\n------------------------------------\n\n");
                                            }
                                        }
                                    );

                                    inf.start().then(
                                        response => {
                                            if (response.ok) {
                                                console.log("Start Inf");
                                                console.log("\n------------------------------------\n");
                                                console.log("Started!\n");
                                                console.log("\n------------------------------------\n\n");
                                            } else {
                                                console.log("Error starting Inf.");
                                                console.log("\n------------------------------------\n");
                                                console.log(response.message);
                                                console.log("\n------------------------------------\n\n");
                                            }
                                        }
                                    );

                                    inf.getContMsg().then(
                                        response => {
                                            if (response.ok) {
                                                console.log("Get Inf. Cont Msg");
                                                console.log("\n------------------------------------\n");
                                                console.log(response.data);
                                                console.log("\n------------------------------------\n\n");
                                            } else {
                                                console.log("Error geting Infcont msg.");
                                                console.log("\n------------------------------------\n");
                                                console.log(response.message);
                                                console.log("\n------------------------------------\n\n");
                                            }

                                        }
                                    );




                                    inf.vms[1].destroy().then(
                                        response => {
                                            if (response.ok) {
                                                console.log("Delete VM.");
                                                console.log("\n------------------------------------\n");
                                                console.log("Successfully deleted");
                                                console.log("\n------------------------------------\n\n");
                                            } else {
                                                console.log("Error Deleting VM.");
                                                console.log("\n------------------------------------\n");
                                                console.log(response.message);
                                                console.log("\n------------------------------------\n\n");
                                            }


                                            inf.reconfigure("").then(
                                                response => {
                                                    if (response.ok) {
                                                        console.log("Reconfigured Inf.");
                                                        console.log("\n------------------------------------\n");
                                                        console.log("Successfully reconfigured");
                                                        console.log("\n------------------------------------\n\n");
                                                    } else {
                                                        console.log("Error Reconfiguring Inf.");
                                                        console.log("\n------------------------------------\n");
                                                        console.log(response.message);
                                                        console.log("\n------------------------------------\n\n");
                                                    }


                                                    inf.destroy().then(
                                                        response => {
                                                            if (response.ok) {
                                                                console.log("Delete Inf.");
                                                                console.log("\n------------------------------------\n");
                                                                console.log("Successfully deleted");
                                                                console.log("\n------------------------------------\n\n");
                                                            } else {
                                                                console.log("Error Deleting Inf.");
                                                                console.log("\n------------------------------------\n");
                                                                console.log(response.message);
                                                                console.log("\n------------------------------------\n\n");
                                                            }

                                                            console.log("Finished");
                                                        }
                                                    );



                                                }
                                            );


                                            
                                        }
                                    );
                                    



                                }
                            );



                            
                        } else {
                            console.log("Error Adding VMs");
                            console.log("\n------------------------------------\n");
                            console.log(response.message);
                            console.log("\n------------------------------------\n\n");
                        }
                    }
                );





            } else {
                console.log("Error Creating Inf.");
                console.log("\n------------------------------------\n");
                console.log(response.message);
                console.log("\n------------------------------------\n\n");
            }
        }
    )

}

var imAuth = new IMAuthDataItem("im", "InfrastructureManager", {"username": "user", "password": "pass"})
var oneAuth = new IMAuthDataItem("dummy", "Dummy", {})

var authData = new IMAuthData([imAuth, oneAuth])
var im = new IMClient("https://appsgrycap.i3m.upv.es:31443/im-dev", authData);

describe('getVersion()', function () {
    it('get IM version', async function () {
      const version = await im.getVersion();
      assert.strictEqual(version, "1.9.5");
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

describe('infDestroy()', function () {
    it('Destroy Inf.', async function () {
      const response = await inf.destroy();
      assert.ok(response.ok);
    });
});