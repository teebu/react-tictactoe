# React Tic Tac Toe 

A basic tic tac toe following the [React tutorial](https://reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment), with challenges completed.

### To run locally:
```
clone  
npm install  
npm start
```


### To deploy to github pages manually:  
install gh-pages  
`npm install gh-pages -d`

make sure this is package.json
```
"homepage": "http://teebu.github.io/react-tictactoe",
"scripts": {
    ...
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
```
deploy  
`npm run deploy`

[Demo](http://teebu.github.io/react-tictactoe)


### Deploy with Github Actions:
Enable actions for repo, using https://github.com/peaceiris/actions-gh-pages

Sample action: `.github/workflows/main.yml`:
```
# This is a basic workflow to help you get started with Actions

name: gh-pages

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch
on:
  push:
    branches: [ master ]
env:
  CI: false
# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
    # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: '13'

    - name: Install Dependencies
      run: npm install

    - name: Build
      run: npm run build

    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build

```