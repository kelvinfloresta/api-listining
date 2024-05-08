# Listing API

## Description

This API is used to describe how to create an express server with an array in memory to store data. The API has the following endpoints:

- GET `/listings`
- POST `/listings`
- DELETE `/listings/:id`

## Usage
start the server by running `yarn start`

## Testing
run `yarn test` to run the tests


## Architecture & Code Design
The app has 2 layers: controllers and database. The controllers are responsible for handling the requests and responses, while the database is responsible for storing the data.

I used the dependency injection pattern to inject the database into the controllers. This makes it easier to test the controllers by mocking the database (we can force an error for instance).

It has more value when we want to create unit tests in a business logic layer, where we can inject the database to create specific scenarios without problems.

## Dependencies
- **express** - for creating the server
- **uuid** - for generating unique ids
- **@swc/jest** - for faster typescript transpilation in tests (it doesn't replace jest)
- **supertest** - for testing the express server
- **ts-node** - for running typescript files directly



