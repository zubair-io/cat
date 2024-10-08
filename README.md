# Postman Publish Action

This repository contains GitHub Actions that help automate publishing Postman Collections to the Public API Network. 
You can use these actions to fetch a schema or Postman collection, transform an OpenAPI schema into a Postman collection, and update a Postman collection programmatically as part of your CI/CD workflows.

![Uploading CleanShot 2024-10-08 at 14.31.03.gif…](Github Action in use)

## Actions

### 1. **Fetch Postman Collection**
   This action retrieves a Postman collection from the Postman API using the collection's UID. You can use this action when you need to pull the latest version of a collection as part of your build or deployment process.

   #### Inputs:
   - `postman_api_key`: Your Postman API key for authentication.
   - `collection_uid`: The unique identifier of the Postman collection you want to retrieve.

   #### Example Usage:
   ```yaml
   - name: Fetch Postman Collection
     uses: stcalica/postman-publish-action@master
     with:
       postman_api_key: ${{ secrets.POSTMAN_API_KEY }}
       collection_uid: 'your-collection-uid'
   ```

### 2. **Transform OpenAPI to Postman Collection**
   This action converts an OpenAPI schema into a Postman collection. This is useful when you want to ensure your OpenAPI spec is synchronized with your Postman collection for testing or sharing purposes.

   #### Inputs:
   - `postman_api_key`: Your Postman API key for authentication.
   - `openapi_schema_url`: The URL of the OpenAPI schema you want to transform into a Postman collection.
   - `destination_collection_uid`: (Optional) If provided, this will be the UID of the Postman collection where the transformed schema will be stored.

   #### Example Usage:
   ```yaml
   - name: Transform OpenAPI to Postman Collection
     uses: stcalica/postman-publish-action@master
     with:
       postman_api_key: ${{ secrets.POSTMAN_API_KEY }}
       openapi_schema_url: 'https://api.example.com/openapi.yaml'
       destination_collection_uid: 'your-collection-uid'
   ```

### 3. **Update Postman Collection**
   This action updates a destination Postman collection with the contents of another source collection. You can use this action to keep your collections in sync across environments or projects.

   #### Inputs:
   - `postman_api_key`: Your Postman API key for authentication.
   - `source_collection_uid`: The UID of the source Postman collection.
   - `destination_collection_uid`: The UID of the destination Postman collection that will be updated with the source's data.

   #### Example Usage:
   ```yaml
   - name: Update Postman Collection
     uses: stcalica/postman-publish-action@master
     with:
       postman_api_key: ${{ secrets.POSTMAN_API_KEY }}
       source_collection_uid: 'source-collection-uid'
       destination_collection_uid: 'destination-collection-uid'
   ```

## Usage in CI/CD

These actions are designed to fit seamlessly into your existing CI/CD workflows. Here’s an example workflow that fetches a Postman collection, updates it with a transformed OpenAPI schema, and then syncs it with another collection.

```yaml
name: Postman CI Workflow

on:
  push:
    branches:
      - main

jobs:
  postman-sync:
    runs-on: ubuntu-latest

    steps:
      - name: Fetch Postman Collection
        uses: stcalica/postman-publish-action@master
        with:
          postman_api_key: ${{ secrets.POSTMAN_API_KEY }}
          collection_uid: 'your-collection-uid'

      - name: Transform OpenAPI to Postman Collection
        uses: stcalica/postman-publish-action@master
        with:
          postman_api_key: ${{ secrets.POSTMAN_API_KEY }}
          openapi_schema_url: 'https://api.example.com/openapi.yaml'
          destination_collection_uid: 'your-collection-uid'

      - name: Update Postman Collection
        uses: stcalica/postman-publish-action@master
        with:
          postman_api_key: ${{ secrets.POSTMAN_API_KEY }}
          source_collection_uid: 'source-collection-uid'
          destination_collection_uid: 'destination-collection-uid'
```

## Setup

1. **Generate a Postman API Key**: You can generate an API key in your [Postman account settings](https://go.postman.co/settings/me/api-keys).
2. **Store Secrets in GitHub**: Store your Postman API key securely in your repository by navigating to **Settings > Secrets** in your GitHub repo and adding it as a secret (e.g., `POSTMAN_API_KEY`).
3. **Use the Actions**: Add the steps to your `.github/workflows` YAML file as shown above.

## License

This repository is licensed under the [MIT License](LICENSE).

---

Feel free to adjust any section or add more details depending on your project’s requirements!
