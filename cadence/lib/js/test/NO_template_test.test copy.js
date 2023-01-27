import path from "path";
import { 
  emulator, 
  init, 
  getAccountAddress, 
  deployContractByName, 
  sendTransaction, 
  shallPass,
  shallRevert,
  executeScript,
  mintFlow 
} from "@onflow/flow-js-testing";
  import fs from "fs";


// Auxiliary function for deploying the cadence contracts
async function deployContract(param) {
  const [result, error] = await deployContractByName(param);
  if (error != null) {
    console.log(`Error in deployment - ${error}`);
    emulator.stop();
    process.exit(1);
  }
}

const script_file_name = fs.readFileSync(path.resolve(__dirname, "script/path/filename.cdc"), {encoding:'utf8', flag:'r'});


describe("Test suite name", ()=>{

  // define some variables for any account you need
  let serviceAccount;
  let gameAccount;
  let parentAccount;

  // Before each test...
  beforeEach(async () => {
    // We do some scaffolding...

    // Getting the base path of the project
    const basePath = path.resolve(__dirname, "./../../../"); 
		// You can specify different port to parallelize execution of describe blocks
    const port = 8080; 
		// Setting logging flag to true will pipe emulator output to console
    const logging = false;

    await init(basePath);
    await emulator.start({ logging });

    // ...then we deploy the ft and example token contracts using the getAccountAddress function
    // from the flow-js-testing library...

    // Create a service account and deploy contracts to it
    serviceAccount = await getAccountAddress("ServiceAccount")
    //if you were to use more accounts get their addresses here

    //no need to over fund the account except if you are gonna deploy a lot of contracts to it
    await mintFlow(serviceAccount, 10000000.0)
    await deployContract({ to: serviceAccount,    name: "utility/FungibleToken"});



  });

  // After each test we stop the emulator, so it could be restarted
  afterEach(async () => {
    return emulator.stop();
  });

  // First test checks if service account can create a orphan child account 
  test("First test", async () => {
    // First step: create a child creator
    const tx_result = await shallPass(
      sendTransaction({
        name: "transaction/path/from/base/path/previously/defined/without dot cdc",
        args: [],
        signers: []
      })
    );

    const scriptResult = await executeScript({
        code: get_child_address_from_creator,
        args: [gameAccount, pubKey]
    });
    
    //Getting a tx result into a constant is only needed if you are gonna check something (with scripts usually that's the only reason to call them)

    expect(tx_result).not.toBe(null)

    expect(scriptResult).toEqual(3)

    //this functions belong to jest library

  });

});