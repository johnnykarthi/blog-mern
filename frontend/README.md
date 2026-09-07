# Jaykay Blog Frontend

This directory contains the React 19 and Vite 8 single-page client for Jaykay Blog. It displays a
paginated post feed and renders individual Markdown articles fetched from the backend API.

## Features

- Infinite-scroll loading in batches of seven posts
- Client-side title search across posts already loaded
- Individual article routes based on `blogId`
- GitHub-flavored Markdown and raw HTML rendering
- Prism syntax highlighting for fenced code blocks
- Optional hosted video and YouTube link
- Facebook, WhatsApp, LinkedIn, X, and native Web Share actions
- Loading skeleton and not-found/server-error states
- Responsive CSS and installable web-app metadata

## Routes

| URL | Component | Behavior |
| --- | --- | --- |
| `/` | `Home` | Fetches and displays the paginated post feed |
| `/blog/:blogId` | `BlogContentLayout` | Fetches a post and renders `BlogContent` |
| `/admin` | `AdminComponent` | Placeholder only; post management is not implemented |

Netlify's `netlify.toml` redirects every request to `index.html`, allowing React Router routes to
work after a refresh or direct navigation.

## Component map

| File | Responsibility |
| --- | --- |
| `src/App.jsx` | Declares the client routes |
| `src/components/Home.jsx` | Pagination, infinite scroll, title filtering, and post cards |
| `src/components/BlogContentLayout.jsx` | Article fetching, loading state, and error selection |
| `src/components/BlogContent.jsx` | Article metadata, media, sharing, and Markdown rendering |
| `src/components/BlogSkeletonLoading.jsx` | Article loading placeholder |
| `src/components/AdminComponent.jsx` | Future administration page placeholder |
| `src/components/Tag.jsx` | Reusable tag component; currently not used by `Home` |
| `src/App.css` | Global, article, responsive, error, and skeleton styles |

## Data flow

The home page requests:

```http
GET <API_BASE_URL>/api?page=1&limit=7
```

It expects a successful paginated response with a `result` array:

```json
{
  "result": [
    {
      "blogId": "react-hooks",
      "title": "Understanding React Hooks",
      "description": "A short summary",
      "author": "jaykay",
      "tags": ["React", "JavaScript"],
      "createdAt": "2026-01-01T10:00:00.000Z",
      "updatedAt": "2026-01-01T10:00:00.000Z"
    }
  ],
  "next": { "page": 2, "limit": 7 }
}
```

The article page requests `GET <API_BASE_URL>/api/:blogId` and expects a single blog object that
also includes `markdownContent`, `videoLink`, and `youtubeLink`.

## API configuration

The deployed API base URL is currently hard-coded in both:

- `src/components/Home.jsx`
- `src/components/BlogContentLayout.jsx`

For local full-stack development, change both fetch URLs to use:

```text
http://localhost:4000/api
```

There is no `VITE_*` environment variable in the current implementation. If configuration is
refactored later, Vite exposes custom browser variables through `import.meta.env` when their names
start with `VITE_`.

## Development

### Prerequisites

- Node.js 20.19+ or 22.12+ and npm
- Access to either the deployed API or a running local backend

Install and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Serve the production build locally for verification |

## Deployment

For Netlify, use `frontend` as the base directory. The included `netlify.toml` runs `npm run build`,
publishes `dist`, and provides the SPA route fallback required by React Router.

## Known limitations and security notes

- Search is local and only covers fetched pages; it is not a server-side search.
- The visible tag chips do not currently filter posts.
- `rehype-raw` permits HTML contained in a post's Markdown. Render only trusted content or add an
  HTML sanitization step.
- List items and tags do not currently provide React `key` props, which produces warnings and can
  make reconciliation unreliable.
- The infinite-scroll observer is disconnected before observing a new last item, but it has no
  component-unmount cleanup.
- The codebase currently has no application tests or test script.

## Build status

`npm run build` succeeds with Vite 8. The current bundle is approximately 1.2 MB before gzip and
triggers Vite's large-chunk warning; code splitting can be considered separately.
