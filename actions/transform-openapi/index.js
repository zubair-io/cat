const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const apiKey = core.getInput('postman_api_key');
    const openapiSchema = core.getInput('openapi_schema');

    const response = await axios.post(`https://api.getpostman.com/apis/schemas`, {
      type: "openapi:3",
      files: [{ path: "openapi.json", content: openapiSchema }]
    }, {
      headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' }
    });

    console.log("OpenAPI transformed successfully:", response.data);
  } catch (error) {
    core.setFailed(`Error transforming OpenAPI: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
}

run();
