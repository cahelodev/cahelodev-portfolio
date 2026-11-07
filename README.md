# Carlos Heredia — Personal Portfolio

## Project Overview

This project is the personal portfolio of Carlos Heredia, a software developer. It presents his professional profile, work experience, education, skills, and links to his social media profiles.

## Features

- Personal profile and professional introduction.
- Work experience and education links with company logos.
- GitHub, LinkedIn, and X social profile links.
- Dark Mode and Light Mode, with Light Mode as the default and the selected theme saved in `localStorage`.
- Responsive layout for desktop and mobile screens.
- Email contact link that opens the visitor's email application.

## Tech Stack

- **HTML5** for page content and structure.
- **CSS3** for styles, theme colors, and responsive layout.
- **Vanilla JavaScript** for theme selection and persistence.
- **Node.js built-in modules** (`http`, `fs`, and `path`) for the local static file server.
- **Geist Regular (400)**, loaded from Google Fonts.

The project does not use a frontend framework or third-party JavaScript dependencies.

## Project Structure

```text
.
├── img/                 # Profile photo, company logos, and visual assets
├── app.js               # Theme selector and localStorage persistence
├── index.html           # Portfolio content, links, and favicon metadata
├── server.mjs           # Lightweight local static file server
├── styles.css           # Theme, layout, and responsive styles
├── package.json         # Project metadata and npm scripts
├── .gitignore           # Local dependencies, environment files, and secrets
└── README.md
```

## Getting Started

### Requirements

- Node.js 20.12 or newer
- npm

There are no npm dependencies to install. From the project root, start the local server:

```sh
npm start
```

Open [http://localhost:4173](http://localhost:4173) in your browser. To use a different port, set the `PORT` environment variable before starting the server.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the local static file server. |

## Contact

[cahelo1406@gmail.com](mailto:cahelo1406@gmail.com)
