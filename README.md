# LazyLab Main Template

**Testing ground for building end-to-end APIs and applications on AWS and Next.js**  
_A full-stack TypeScript monorepo scaffold for rapid, modular project development._

---

## ✨ Overview

This repository serves as a **production-ready monorepo template** that integrates:

- **Turborepo** for build orchestration and task caching
- **Fastify + Prisma** backend for performant API development
- **Next.js 15 (App Router)** frontend with MUI v7 for modern UI
- **AWS CDK** infrastructure as code for cloud deployments
- **PNPM Workspaces** for shared package management
- **Type-safe shared packages** (`env-loader`, `eslint-config`, `typescript-config`, etc.)

Everything is written in **TypeScript**, designed to scale from local development to AWS-hosted deployments.

---

## 🏗️ Monorepo Structure

```bash
.
├── apps/
│   ├── reg-form/        # Fastify backend (API + Prisma)
│   └── reg-form-ui/     # Next.js frontend app
│
├── packages/
│   ├── @repo/env-loader         # Shared environment loader (envalid)
│   ├── @repo/eslint-config      # Shared ESLint configuration
│   ├── @repo/typescript-config  # Shared TypeScript configurations
│   ├── @repo/ui                 # Shared UI component library
│   ├── @repo/types              # Shared type definitions
│   └── @repo/utils              # Helper utilities
│
├── infrastructure/      # AWS CDK setup
│
├── docker-compose.yml
├── turbo.json           # Turborepo task configuration
├── pnpm-workspace.yaml  # Workspace definitions
└── package.json         # Root dependencies and scripts
```

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/LazyLab-io/lazylab-main-template.git
cd lazylab-main-template
pnpm install
```

### 2. Environment Setup

Copy `.env.example` (if provided) or create your own:

```bash
cp apps/reg-form/.env.example apps/reg-form/.env
```

Fill in required variables such as:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NODE_ENV=development
PORT=3000
```

Each app validates its environment using `@repo/env-loader`.

---

## 🧩 Development

Run all apps concurrently:

```bash
pnpm dev
```

To run a single app:

```bash
pnpm turbo run dev --filter=apps/reg-form
pnpm turbo run dev --filter=apps/reg-form-ui
```

---

## 🐳 Docker Setup

The repository includes Docker configurations for local and remote builds.

### Build images

```bash
pnpm run docker:build
```

### Run with Compose

```bash
docker-compose up --build
```

### Push to AWS (ECR)

```bash
pnpm run docker:push
```

---

## 🧠 Environment Packages

### `@repo/env-loader`

Validates and loads environment variables using [envalid](https://github.com/af/envalid).
Ensures type-safe configuration across services.

### `@repo/eslint-config`

Centralized ESLint rules shared across apps and packages.

### `@repo/typescript-config`

Base and variant `tsconfig.json` files (app, lib, node, react).

---

## ☁️ Infrastructure (AWS CDK)

The `infrastructure` directory defines IaC using the AWS CDK.

Main libraries:

- `aws-cdk-lib`
- `cdk-nag` (security checks)
- `constructs`

To deploy infrastructure (example):

```bash
cd infrastructure
pnpm install
pnpm cdk synth
pnpm cdk deploy
```

---

## 🧰 Useful Commands

| Command             | Description                 |
| ------------------- | --------------------------- |
| `pnpm dev`          | Run all apps locally        |
| `pnpm build`        | Build all apps and packages |
| `pnpm lint`         | Run ESLint checks           |
| `pnpm check-types`  | Run TypeScript checks       |
| `pnpm test`         | Run tests (if present)      |
| `pnpm format`       | Run Prettier formatting     |
| `pnpm clean`        | Clear build artifacts       |
| `pnpm docker:build` | Build Docker images         |
| `pnpm docker:push`  | Push images to registry     |

---

## 🔒 Code Quality & Standards

- **Linting:** Centralized ESLint config (`@repo/eslint-config`)
- **Formatting:** Prettier integrated
- **Git Hooks:** Managed via [Husky](https://typicode.github.io/husky)
  - Pre-commit: lint + format check
  - Pre-push: branch name validation (`feature/`, `fix/`, etc.)

- **Conventional Commits:** Enforced by `commitlint.config.js`

---

## 🧱 Technologies

| Layer            | Stack                                     |
| ---------------- | ----------------------------------------- |
| **Frontend**     | Next.js 15, React, MUI v7, Emotion        |
| **Backend**      | Fastify, Prisma ORM                       |
| **Database**     | PostgreSQL                                |
| **Infra**        | AWS CDK (TypeScript)                      |
| **Build System** | Turborepo, PNPM                           |
| **Languages**    | TypeScript, JavaScript, Dockerfile, Shell |

---

## 🧪 Local Testing

You can extend this template with your preferred test frameworks:

- Unit testing via **Vitest** or **Jest**
- E2E testing via **Playwright** or **Cypress**

Example setup commands (to be added later):

```bash
pnpm add -D vitest @vitest/ui @testing-library/react
```

---

## 📦 Deployment Notes

- The backend (`apps/reg-form`) and frontend (`apps/reg-form-ui`) are both containerized.
- Deployments are intended for AWS ECS/Fargate via CDK.
- The `docker:push` script can push images to AWS ECR.
- Infrastructure stack handles networking, ECS tasks, and storage.

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit changes: `pnpm commit`
4. Push branch: `git push origin feature/my-feature`
5. Submit a PR 🚀

---

## 🧭 Future Improvements

- CI/CD with GitHub Actions
- Automated CDK deployment to AWS environments
- Integration testing workflows
- Expanded UI component library (`@repo/ui`)

---

## 🪪 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute it under the same license.

---

> _Maintained by the LazyLab-io team. Built for clarity, speed, and scalability._
