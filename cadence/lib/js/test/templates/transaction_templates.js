import {
    sendTransaction,
    shallPass,
    shallRevert
} from "@onflow/flow-js-testing";


export async function mintMonster(/*accounts and tx arguments used should go here*/) {
    const [txn, e] = await shallPass(
        sendTransaction("mint_monster", [signer], [])
    );
};

