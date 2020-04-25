# React Tic Tac Toe 

A basic tic tac toe following the [React tutorial](https://reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment), with challenges completed.

### To run locally:
```
clone  
npm install  
npm start
```


### To deploy to github pages:  
- install gh-pages  
`npm install gh-pages -d`
- make sure this is package.json
```
"homepage": "http://teebu.github.io/react-tictactoe",
"scripts": {
    ...
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
```
- deploy  
`npm run deploy`

[Demo](http://teebu.github.io/react-tictactoe)