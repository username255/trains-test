## Setup guide

Install using `npm i`
Run using `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You can also build it if you really want by executing  `npm run build`
and find few new files in `build` folder

![x](https://media0.giphy.com/media/134qZfT6JZrJsI/giphy.gif)

### Logic behind the whole thing

|_ App.js
  |_ RenderLogic.js (wrapper)
    |_ Map
    |_ PassengersInput(s)

Most of game logic lies within RenderLogic file,
so there is a game loop, sort of, made with setInterval (2sec)
which is mostly based of MOVE state variable and some math dividing the step by the route length and assigining some css classes to the wrapper which triggers some css to be rendered in your browser.

Map component renders the map itself first time, tried to add some configs, though doesn't still look too cool as for me, but it works pretty stable I'd say.

Animations on lines work in such way, those are triggered when it's looking into that direction, but it doesn't mean the train will move there during this turn

### Usage:

created with `create-react-app` and then nothing else was added, just some css and js written by myself.

###### P.S.
Hope you like it 🤞

![x](https://media.giphy.com/media/3osxYamKD88c6pXdfO/giphy.gif)

__________________________

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
