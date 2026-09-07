# Jaykay Blog Backend

This directory contains the REST API for Jaykay Blog. Express handles HTTP requests, Mongoose maps
blog documents to MongoDB, and the controller implements CRUD and in-memory pagination.

## Architecture

```text
server.js
  └── /api -> routes/BlogRouter.js
                 └── controller/BlogController.js
                            └── model/Blog.js -> MongoDB
```

`server.js` loads environment variables, enables URL-encoded and JSON request bodies, permits CORS,
logs each request, mounts the routes, initiates the MongoDB connection, and starts the HTTP listener.

## Setup

### Prerequisites

- Node.js and npm (a current LTS release is recommended)
- MongoDB locally or a MongoDB Atlas connection string

Install dependencies:

```bash
npm install
```

Create a `.env` file in this directory:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/jaykay-blog
PORT=4000
```

`MONGODB_URI` is required. `PORT` is optional and defaults to `4000`.

Start the server with automatic restart on file changes:

```bash
npm run dev
```

There is currently no production `start` script. A production host can invoke `node server.js`
directly or add an appropriate package script.

## Blog document

| Field | Type | Required | Default/notes |
| --- | --- | --- | --- |
| `blogId` | String | No | Unique public identifier used in URLs |
| `title` | String | Yes | Article title |
| `description` | String | Yes | Feed summary and sharing text |
| `author` | String | No | `jaykay` |
| `tags` | Array | No | Empty array |
| `youtubeLink` | String | No | Empty string |
| `videoLink` | String | No | Empty string |
| `markdownContent` | String | Yes | Article body |
| `createdAt` | Date | Generated | Added by Mongoose timestamps |
| `updatedAt` | Date | Generated | Added by Mongoose timestamps |

Although the schema does not mark `blogId` as required, clients need a unique, non-empty value for
reliable read, update, delete, and frontend article routes.

## Endpoints

### List blogs

```http
GET /api
GET /api?page=1&limit=7
```

Without pagination parameters, the endpoint returns an array of every blog, newest first. When both
query parameters are supplied, it returns the selected slice and optional navigation metadata:

```json
{
  "result": [],
  "prev": { "page": 1, "limit": 7 },
  "next": { "page": 3, "limit": 7 }
}
```

Use positive integer values and provide `page` and `limit` together. Pagination currently loads all
documents from MongoDB and slices them in Node.js, so it is suitable only for a modest data set.

### Get one blog

```http
GET /api/:blogId
```

Returns the matching blog. An unknown ID currently returns HTTP `400` with:

```json
{ "error": "Blog Id is invalid" }
```

### Create a blog

```http
POST /api/create
Content-Type: application/json
```

Example body:

```json
{
  "blogId": "getting-started-with-node",
  "title": "Getting Started with Node.js",
  "description": "A short introduction to Node.js",
  "tags": ["Node", "JavaScript"],
  "markdownContent": "## Introduction\n\nArticle content.",
  "videoLink": "",
  "youtubeLink": ""
}
```

On success, the endpoint returns HTTP `201` and wraps the created document:

```json
{ "response": { "blogId": "getting-started-with-node" } }
```

The response object also contains the remaining persisted fields. The create controller does not
accept an `author` from the request; Mongoose therefore uses the schema default.

### Update a blog

```http
PUT /api/update/:blogId
Content-Type: application/json
```

The request body may contain fields to update. The endpoint currently returns the document as it was
before the update because `findOneAndUpdate` is called without `{ "new": true }`. A missing ID may
produce a successful response with `null`.

### Delete a blog

```http
DELETE /api/delete/:blogId
```

Returns the deleted document, or `null` when no blog matches.

## Quick API check

With the server running:

```bash
curl "http://localhost:4000/api?page=1&limit=7"
```

Create a post:

```bash
curl -X POST http://localhost:4000/api/create \
  -H "Content-Type: application/json" \
  -d '{"blogId":"hello-world","title":"Hello World","description":"First post","tags":["Node"],"markdownContent":"# Hello"}'
```

## Current limitations and security notes

- No authentication or authorization protects create, update, or delete operations.
- CORS currently accepts requests from every origin.
- Request validation is delegated to the Mongoose schema and API error responses are not
  standardized; most caught errors are returned with HTTP `200`.
- Update bodies are passed directly to Mongoose. Production use should allow-list fields and validate
  input explicitly.
- The current `mongoose.connect(...).then(app.listen(...))` expression starts listening immediately;
  it does not wait for MongoDB to connect successfully. Pass a callback to `then` before production
  use if the API must become available only after the database is ready.
- Pagination is performed after fetching the full collection rather than with MongoDB `skip` and
  `limit`.
- There are no automated tests; `npm test` intentionally exits with an error placeholder.

## Verification

All backend JavaScript files pass `node --check`. A database-backed integration test requires a valid
`MONGODB_URI` and was not part of the syntax verification.
