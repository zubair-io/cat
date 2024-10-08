const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const apiKey = core.getInput('postman_api_key');
    const sourceCollectionId = core.getInput('source_collection_id');
    const destinationCollectionId = core.getInput('destination_collection_id');

    // Fetch source collection
    const fetchResponse = await axios.get(`https://api.getpostman.com/collections/${sourceCollectionId}`, {
      headers: { 'X-Api-Key': apiKey }
    });
    let sourceCollectionData = fetchResponse.data.collection;
    removeIds(sourceCollectionData);

    // Update destination collection
    const updateResponse = await axios.put(`https://api.getpostman.com/collections/${destinationCollectionId}`, { 'collection': sourceCollectionData }, {
      headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' }
    });

    console.log("Collection fetched and updated successfully:", updateResponse.data);
  } catch (error) {
    core.setFailed(`Error in fetch and update: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
}

const removeIds = (obj) => {
  // Iterate over all keys in the object
  for (const key in obj) {
    // If the key is _postman_id, uid, or id, delete it
    if (key === '_postman_id' || key === 'uid' || key === 'id') {
      delete obj[key];
    }
    
    // If the value is an object or array, recursively call removeIds
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      removeIds(obj[key]);
    }
  }
};

run();
