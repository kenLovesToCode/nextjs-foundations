# Next.js Foundations Starter

A Turborepo monorepo starter for the Next.js Foundations certification course.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnextjs-foundations-starter)

## Project Initialization

This monorepo is set up in stages, starting from the root workspace and then layering apps and shared packages on top.

1. Initialize the root repository
2. Add workspace-level tooling like Turborepo, TypeScript, and Biome
3. Register `apps/*` and `packages/*` in `pnpm-workspace.yaml`
4. Scaffold the Next.js apps in `apps/web` and `apps/blog`
5. Add the shared packages in `packages/ui` and `packages/api`
6. Connect the apps to the shared packages with `workspace:*` dependencies
7. Run everything from the root with `turbo run ...`

Example scaffold flow:

```bash
# create the repo
mkdir nextjs-foundations-starter
cd nextjs-foundations-starter
pnpm init

# add root tooling
pnpm add -D turbo typescript @biomejs/biome ultracite

# create workspace folders
mkdir -p apps packages

# scaffold the apps
pnpm create next-app@latest apps/web
pnpm create next-app@latest apps/blog

# create shared packages
mkdir -p packages/ui/src packages/api/src
```

From there, the repo is wired so:

- the root `package.json` owns shared scripts like `dev`, `build`, and `check-types`
- `pnpm-workspace.yaml` turns the apps and packages into one workspace
- `turbo.json` orchestrates tasks across the monorepo
- `apps/web` and `apps/blog` can import local shared code from `@repo/ui` and `@repo/api`

## Monorepo Setup

This repository is a `pnpm` workspace managed with Turborepo. It contains two Next.js apps and shared packages that are consumed across the workspace through `workspace:*` dependencies.

At a high level:

- `apps/web` is the main marketing app on port `3000`
- `apps/blog` is the blog/content app on port `3001`
- `packages/ui` contains shared UI primitives and styles used by both apps
- `packages/api` contains shared mock data utilities, including Faker-backed helpers

`pnpm-workspace.yaml` registers both `apps/*` and `packages/*` as workspace members, and the root scripts use `turbo run ...` so you can run tasks for the full repo from the root.

## Getting Started

```bash
# Install dependencies
pnpm install

# Run both apps in dev mode
pnpm dev

# Type check all packages
pnpm check-types

# Build all packages
pnpm build

# Format and lint
pnpm format
pnpm lint
```

## Project Structure

```text
nextjs-foundations-starter/
├── apps/
│   ├── web/                    # Next.js app for the marketing site
│   └── blog/                   # Next.js app for the blog/content hub
├── packages/
│   ├── ui/                     # Shared React UI components and styles
│   └── api/                    # Shared mock data utilities
├── pnpm-workspace.yaml         # Declares workspace packages
├── turbo.json                  # Turborepo task pipeline
├── biome.jsonc                 # Biome linting and formatting config
└── package.json                # Root scripts and workspace tooling
```

## How the Workspace Is Wired

- The root `package.json` defines repo-wide scripts like `pnpm dev`, `pnpm build`, and `pnpm check-types`
- `turbo.json` coordinates those scripts across apps and packages
- Each app has its own `package.json` with its own `dev`, `build`, and `start` commands
- Both apps depend on `@repo/ui` and `@repo/api` using `workspace:*`, so local package changes are available immediately inside the monorepo

That means you can:

- run everything from the repo root
- target one app with `--filter`
- share code without publishing packages externally

## Apps

- `@repo/web` in `apps/web` is the marketing site and runs on `http://localhost:3000`
- `@repo/blog` in `apps/blog` is the content hub and runs on `http://localhost:3001`

## Shared Packages

- `@repo/ui` in `packages/ui` exports shared components, utilities, and global styles
- `@repo/api` in `packages/api` exports mock data helpers for posts, galleries, brand data, and other course examples

Example imports:

```ts
import { Button } from "@repo/ui/components/button";
import { getPosts } from "@repo/api/blog";
```

## Working In One App vs The Whole Monorepo

Run the whole workspace:

```bash
pnpm dev
pnpm build
pnpm check-types
```

Target a single app from the root:

```bash
# Run one app
pnpm dev --filter @repo/web
pnpm dev --filter @repo/blog

# Build one app
pnpm build --filter @repo/web

# Add a dependency to one app
pnpm add server-only --filter @repo/web
```

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [Turborepo](https://turbo.build/repo) - Monorepo build system
- [pnpm](https://pnpm.io/) - Package manager
- [Biome](https://biomejs.dev/) - Linting and formatting
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling

## Deployment

Each app is deployed independently.

```bash
# Deploy blog first
cd apps/blog
vercel --prod

# Deploy web and pass the blog URL if needed
cd apps/web
vercel --prod --env BLOG_URL=https://the-url-result-from-apps-blog-after-deploy




# NEW
# install shared shadcn ui component
pnpm dlx shadcn@latest add <component> --cwd apps/web
#and import it like
import { Card } from "@repo/ui/components/card";
```

## License

MIT
