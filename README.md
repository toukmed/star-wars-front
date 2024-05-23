# StarWarsFront
The idea behind the project is to manage the library of star wars data exposed on (https://swapi.dev/) in order to bookmark a selected set of element and save them in database.
The UI is composed of a search page that has two tabs:
  - The first one: Swapi based data, exposes the data fetched from swapi api where we display character informations like the name, the birth year and films and vehicles where they have participated.
  - The second one: bookmarked data, exposes the list of bookmarked data.
  - A search feature that search the characters by their names
  - A bookmark/unbookmark features that saves selected data into database.
  - A see details features that displays the full informations about the character, film and vehicle.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Graphql client

The graphql client used to process request is Apollo client (https://www.apollographql.com/docs/)
