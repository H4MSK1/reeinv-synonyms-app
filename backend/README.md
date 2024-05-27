# Backend

The backend is built using Fastify and TypeScript. It exposes the API layer for creating and retrieving synonyms.

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#api-reference">API reference</a></li>
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

## API reference

#### Get all synonyms

```http
  GET /api/synonyms
```

#### Get all synonyms by search filter

```http
  GET /api/synonyms?search=${search}
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `search`  | `string` | **Optional**. Search term for filtering |

#### Get synonyms by word

```http
  GET /api/synonyms/${word}
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `word`    | `string` | **Required**. Word of synonyms to fetch |

#### Create synonyms

```http
  POST /api/synonyms
```

| Parameter  | Type       | Description                     |
| :--------- | :--------- | :------------------------------ |
| `word`     | `string`   | **Required**. Word of synonyms  |
| `synonyms` | `string`[] | **Required**. Array of synonyms |

Example payload:

```json
{
  "word": "happy",
  "synonyms": ["joyful", "glad"]
}
```

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

- Run `docker-compose up`, this will build the container and starts the application.

#### Without docker

- Run `pnpm dev`, this starts the backend with hot-reloading.

## Testing

This application uses [jest](https://github.com/jestjs/jest) for running tests.

- Run tests using `pnpm test`, this includes a coverage report by default.
- Run tests with hot-reloading using `pnpm test:dev`.

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

This application is deployed to Cloud Run using Google Cloudbuild.

## Acknowledgements

- [Fastify](https://github.com/fastify/fastify)
