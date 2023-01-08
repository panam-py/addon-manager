# Addon Manager
This is a test application/assignment for a technical role that mocks the functionality of the back-end of a basic addon/food manager

## How to install and run the project
* Download/Clone the application source code
* Add a .env file with the following variables: ``DATABASE_URL: string``, ``JWT_SECRET: string``, ``JWT_EXPIRES_IN: string``
* Install the dependencies with ``yarn install``
* Do the initial DB migration with ``yarn run migrate``
* Run the code with ``yarn run start``

## Usage
In case you don't want to run the application locally the code is hosted on vercel with [this url](https://https://addon-manager.vercel.app), you can follow through with the [API collection on Postman](https://documenter.getpostman.com/view/17243864/2s8Z75SpYp) to see the usage of the various enpoints.