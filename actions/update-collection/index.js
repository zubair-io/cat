const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const apiKey = core.getInput('postman_api_key');
    const destinationCollectionId = core.getInput('destination_collection_id');
    const collectionData = JSON.parse(core.getInput('collection_data'));

    const response = await axios.put(`https://api.getpostman.com/collections/${destinationCollectionId}`, { collection: collectionData }, {
      headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' }
    });

    console.log("Collection updated successfully:", response.data);
  } catch (error) {
    core.setFailed(`Error updating collection: ${error.response ? error.response.data : error.message}`);
  }
}

run();