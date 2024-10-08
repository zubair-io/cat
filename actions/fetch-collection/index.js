const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const apiKey = core.getInput('postman_api_key');
    const collectionId = core.getInput('collection_id');

    const response = await axios.get(`https://api.getpostman.com/collections/${collectionId}`, {
      headers: { 'X-Api-Key': apiKey }
    });

    console.log("Collection fetched successfully:", response.data.collection);
  } catch (error) {
    core.setFailed(`Error fetching collection: ${error.response ? error.response.data : error.message}`);
  }
}

run();