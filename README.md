# Harry Wu — Terminal Resume

A terminal-style personal portfolio built with React, TypeScript, and Vite. Content is based on Harry Wu’s supplied resume.

The home screen highlights experience, checkout performance, and technical leadership, with direct resume download and email contact links. The sidebar and slash-command picker provide access to the detailed portfolio.

Production URL: <https://harrywutech.github.io/ai-chat-bot-resume/>

## Local development

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173/).

```sh
npm run build
npm run preview
```

`build` performs TypeScript checks and creates the static site in `dist/`. `preview` serves the production build locally.

## Commands

Commands are case-insensitive and accept an optional leading slash.

| Command                        | Behavior                                                                   |
| ------------------------------ | -------------------------------------------------------------------------- |
| `/About`                       | Personal introduction                                                      |
| `/Skills`                      | Six skill groups, with links to relevant projects                          |
| `/Skills AI`                   | A single skill group; also Frontend, Backend, Architecture, Data, or Cloud |
| `/Projects`                    | Three featured projects                                                    |
| `/Projects --all`              | All five projects                                                          |
| `/Projects interview-platform` | A project’s details                                                        |
| `/Experience`                  | Professional timeline                                                      |
| `/Impact`                      | Resume-backed engineering outcomes                                         |
| `/Resume`                      | PDF preview and download links                                             |
| `/Education`                   | Education and certifications                                               |
| `/Contact`                     | Email, GitHub, LinkedIn, and email copy button                             |
| `/Help`                        | Commands, syntax examples, and shortcuts                                   |
| `/Theme`                       | Theme chooser                                                              |
| `/Theme light`                 | Set dark, light, or green; saved in browser storage                        |
| `/History`                     | Command history for this browser session                                   |
| `/Clear`                       | Clear output while keeping command history                                 |
| `/Home`                        | Restore the welcome screen                                                 |

Project IDs: `interview-platform`, `commerce`, `shopping-assistant`, `indexing`, `automation`.

Type `/` to open the command picker. Use up/down to select, Enter to run, Tab to complete, and Escape to dismiss. Outside the picker, up/down browse command history and restore an unfinished draft. Ctrl/Cmd+L clears the terminal when the input is focused. Navigation and quick links also work by click or touch.

## Update content

- `src/data.ts`: profile, skill groups, projects, professional timeline, and command descriptions.
- `src/App.tsx`: command output, introduction, education, outcomes, and terminal behavior.
- `src/styles.css`: responsive layout and three color themes.
- `public/harry-wu-resume.pdf`: the supplied two-page resume. Replace this file to update the download.
- `index.html`: page title, search/social metadata.

The personal interview platform is labeled **in development**. Professional projects are labeled separately. Project source/demo links are not invented. The AWS credential is described as earned in January 2024 without claiming current validity.

## GitHub Pages

This is a static site with no server, API keys, or backend. Vite’s relative `base: './'` supports both a user site and a repository subdirectory. Build output, including the resume PDF, is in `dist/`.

The repository is `harrywutech/ai-chat-bot-resume`. Pushes to `main` run `.github/workflows/deploy-pages.yml`, which installs locked dependencies with `npm ci`, checks TypeScript, builds the static site, and deploys `dist/` to GitHub Pages. The workflow can also be run manually from the Actions tab. GitHub Pages uses GitHub Actions as its deployment source.

This replaces the original Next.js placeholder while preserving the repository’s commit history and existing Pages address.

Google Fonts loads DM Mono and Space Grotesk; system monospace and sans-serif fallbacks work if unavailable. Theme preferences use optional local storage; command history is held in memory and resets on reload.

## Design reference

Terminal interaction inspired by [satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio). This implementation uses its own React components, styles, and slash-command UI. Icons are from Lucide.

## Local verification

- Production build and TypeScript checks passed.
- Browser-checked content commands, skill filters, project details, error states, and themes.
- Browser-checked slash menu, Tab completion, history/draft restoration, Ctrl+L, and mobile navigation.
- Desktop and mobile layouts checked; resume PDF served successfully.
