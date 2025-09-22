# PKS lecture slides

In this folder, you'll find the source of the slides used in the course lectures. These slides are rendered using [Slidev](https://sli.dev/). Slidev can render the slides as PDF, as well as set up a web app to do the presentation in.

## Installing
Install [Node.js](https://nodejs.org/en/download) and PNPM.

1. Select version nodejs **>= 18.0**.
2. Select operation system.
2. Select `using` **nvm**.
3. Select package manager `with`  **pnpm**.


Navigate to `/path/to/PKS_B/lectures/` and run

```bash
pnpm install
```

This will download all tools to render the slides.

## Running
Refer to the `scripts` array in [package.json](./package.json) for available commands. For example, run the following command in you terminal to set up a dev server for the lecture 1 slides:

```bash
pnpm dev-l1
```

This command will output the instructions on how to open the slides in your browser.

Refer to the [Slidev guides](https://sli.dev/guide/) for more commands and syntax.