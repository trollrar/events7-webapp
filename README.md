# Events7Webapp
This code challenge project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

It is a dashboard for managing definitions of user event.

### Features
- Enables pagination, search, filtering and sorting of events
- Dynamic url query for pagination, search, filtering and sorting
- Create, Update, Delete events
- Can manage events check and status view

## Development setup

Run `npm install` and `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Docker setup

Build image:
`docker build -t events7-webapp .`
Run docker container:
`docker run -p 4200:80 events7-webapp`
