const core = require('@actions/core');
const axios = require('axios');
const fs = require('fs');
const path = process.env.GITHUB_ENV;

async function run() {
  try {
    const apiKey = core.getInput('postman_api_key');
    const collectionId = core.getInput('collection_id');

    const response = await axios.get(`https://api.getpostman.com/collections/${collectionId}`, {
      headers: { 'X-Api-Key': apiKey }
    });

    console.log("Collection fetched successfully:", JSON.stringify(response.data.collection));
    fs.appendFileSync(path, `postman_collection=${JSON.stringify(response.data.collection)}`)

  } catch (error) {
    core.setFailed(`Error fetching collection: ${error.response ? error.response.data : error.message}`);
  }
}

run();
