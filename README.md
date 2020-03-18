### Build and run the app

To build `docker-compose build`

To run the server `docker-compose up`

The api is running on http://localhost:3000/

Open your browser and navigate to http://localhost:4200/ to show the app.

## to use the internal comands for api follow the example below:

`CURRENT_UID=$(id -u):$(id -g) docker-compose run api nest g controller users`

## to use the internal comands for the web app follow the example below:

`CURRENT_UID=$(id -u):$(id -g) docker-compose run app ng add @angular/material`
