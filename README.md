## Description

A simple calculator made with Love, [Nest](https://github.com/nestjs/nest) framework and React.

Back-end code is stored [here](https://github.com/TheSmartHyena/calc-backend)
Front-end code is stored [here](https://github.com/TheSmartHyena/calc-frontend)

## Try it on Heroku

For fast testing, the app is deployed to Heroku [here](https://red-loon-48470.herokuapp.com/).
Since the host is free, the first launch may take 30 seconds to stop the app from hibernating.

## Step 1 - Get repository
```bash
$ git clone https://github.com/TheSmartHyena/calc-backend
$ cd calc-backend
```

## Step 2 - Running the app with Docker
```bash
$ docker-compose up
```

## Alternative Step 2 - Installation & Running the app with NPM

```bash
# install node modules
$ npm install 

# production mode
$ npm run start:prod
```
## Step 3 - Do some math

You can now open your browser at http://localhost:8080 and use the calculator.
Or request the API at http://localhost:8080/calc.

## API
You don't have to use the browser to use the app. You can manually request the API.
With [Insomnia](https://insomnia.rest) or [Postman](https://www.postman.com), you can send POST request on http://localhost:8080/calc.
The body need to match this signature: {calculus: string}.
Example: {"calculus": "2+2"} -> As answer you receive: {"calculus": "2+2", "result": "4"}

## Libraries / Frameworks used

I used [compodoc](https://compodoc.app/) to create the documentation.

# Back-end
- [Nest](https://github.com/nestjs/nest)
- [Decimal.js](https://github.com/MikeMcl/decimal.js) 

# Front-end
- [React](https://fr.reactjs.org/)
- [React-bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap 4](https://getbootstrap.com/)

## Author

Made by Skopal Philippe a.k.a TheSmartHyena