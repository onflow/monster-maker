import { expect } from "@jest/globals";
import { executeScript } from "@onflow/flow-js-testing";

// Executes get_collection_ids script with passed params,
// returning array of NFT IDs contained in the address's collection
export async function getCollectionIDs(address) {
    const [result, err] = await executeScript(
        "game_piece_nft/get_collection_ids",
        [address]
    );
    expect(err).toBeNull();
    return result;
};