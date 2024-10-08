const core = require('@actions/core');
const axios = require('axios');
//TODO: add ability to go from Postman collection to OpenAPI schema
//const { transpile } = require("postman2openapi");

async function run() {
  try {
    const apiKey = core.getInput('postman_api_key');
    const openapiSchema = core.getInput('openapi_schema');
    const openapi = transpile(collection);

    //TODO: pass through options and allow for workspace to be passed in as URL parameter
    const response = await axios.post(`https://api.getpostman.com/import/openapi`, {
      type: "openapi:3",
      input: openapiSchema
    }, {
      headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' }
    });

    console.log("OpenAPI transformed successfully:", response.data);
  } catch (error) {
    core.setFailed(`Error transforming OpenAPI: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
}

run();
