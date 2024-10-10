const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const apiKey = core.getInput('postman_api_key');
    const collectionId = core.getInput('collection_id');
    const collectionData = core.getInput('collection_data');
    removeIds(collectionData);


    const response = await axios.put(`https://api.getpostman.com/collections/${collection_id}`, { collection: collectionData }, {
      headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' }
    });

    console.log("Collection updated successfully:", JSON.stringify(response.data));
  } catch (error) {
    core.setFailed(`Error updating collection: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
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
