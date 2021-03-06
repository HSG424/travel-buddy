# Travel Buddy

Travel Buddy provides tools to users that are traveling to foreign countries.

Current weather conditions (AccuWeather API) are displayed after detecting the user's
latitude and longitude via the Geolocation API. There is also a language translation
tool users can use which consumes API endpoints provided by MyMemory (language translation).

Live deployment (Firebase): [https://travel-buddy-61fbf.web.app](https://travel-buddy-61fbf.web.app)

## Project Screen Shots

![Weather functionality screenshot](/src/img/ss1.png?raw=true "Weather functionality screenshot")
![Translate functionality screenshot](/src/img/ss2.png?raw=true "Translate functionality screenshot")

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

### In the project directory, you can run:

### `npm install`

Installs project dependencies (node_modules) as defined in package.json.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:1234](http://localhost:1234) to view it in the browser.

The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder.
Your app is ready to be deployed!

## Built With

- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) - Get user latitude and longitude
- [AccuWeather API](https://developer.accuweather.com/apis) - Get location name and current weather stats
- [MyMemory API](https://mymemory.translated.net/doc/spec.php) - Translate language
- [NPM](https://www.npmjs.com) - Javascript project dependency management
- [Parcel Bundler](https://www.npmjs.com/package/parcel-bundler) - Blazing fast, zero-config bundler
- [Axios](https://github.com/axios/axios) - HTTP requests to API endpoints
- [Bootstrap 4](https://getbootstrap.com/docs/4.3/) - Styling framework
- [Visual Studio Code](https://code.visualstudio.com/) - Text editor
- [Chrome Web Browser](https://www.google.com/chrome/) - Web browser where application is run

## Authors

- **Fred Han** - (https://github.com/HSG424)

## License

This project is licensed under the MIT License
