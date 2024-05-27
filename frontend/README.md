# Frontend

The frontend is built using Vite, React.js and TypeScript. It serves the user interface for interacting with the backend service.

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#developing">Developing</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#linting-and-formatting">Linting and formatting</a></li>
    <li><a href="#deploying">Deploying</a></li>
   </ol>
</details>

## Getting started

Follow these steps to get a local copy running.

### Prerequisites

#### Using docker

If you prefer to use docker, you will need the following tools:

- [docker](https://docs.docker.com/get-docker/) - This is used for running the frontend application in a containerized environment.
- [docker-compose](https://docs.docker.com/compose/install/) - This is used for defining the container application.

#### Without docker

You can also run the application without docker, ensure the following tools are installed:

- [nvm](https://github.com/nvm-sh/nvm) - This ensures you are installing the correct Node.js version.
- [pnpm](https://pnpm.io/installation) - This is used for managing package dependencies.

- Run `nvm install`.
- Verify installation version with `node -v` (should match **v20.13.1**).
- Run `pnpm install` to install all package dependencies.

## Developing

### Start the application

#### Using docker

- Run `docker-compose up`, this will build the container and start it.

#### Without docker

- Run `pnpm dev`.

## Testing

This application uses [vitest](https://github.com/vitest-dev/vitest) for running tests.

- Run tests using `pnpm test`.
- Run tests with hot-reloading using `pnpm test:dev`.
- Run tests with coverage report using `pnpm test:cov`.

## Linting and formatting

This project uses [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged) to ensure linting and formatting rules are applied.

`husky` utilizes a _pre-commit_ hook that triggers `lint-staged` running the validations before making a commit to the repository.

You may want to run the linting and formatting validations manually.
Available linting and formatting commands:

- `pnpm lint` - This runs linting checks.
- `pnpm lint:fix` - This attempts to autofix the linting issues.
- `pnpm format:check` - This runs formatting checks.
- `pnpm format:fix` - This attempts to autofix the formatting issues.

## Deploying

This application is deployed to Firebase hosting using Google Cloudbuild.

## Acknowledgements

- [shadcn-ui](https://github.com/shadcn-ui/ui) - For the UI components used in this application.
