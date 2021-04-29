# TODO Application

This is a web service that allows users to authenticate and manage their tasks data via graphql requests.

## Prerequisites

- [Docker](https://docker.com/)

## Setup & Run

- Clone the repo: `git clone https://github.com/fakhergh/todo.git`
- Run the docker instances
- Visit [http://localhost/graphql](http://localhost/graphql) 

## Environment variables

| Variables name      | Description                    |
| ------------------- | ------------------------------ |
| PORT                | Server port                    |
| JWT_KEY             | Json web token secret key      |
| MONGO_DB_URI        | the URI for MongoDB connection |

## Graphql playground
 
- Apollo playground contains the necessary docs for its types, queries and, mutations.

## Notice

- After visiting the graphql playground, make sure you run the `signUp` mutation to get your token, and pass it through `headers.authorization` to be able to execute other queries and mutation that needs authenticated users.
