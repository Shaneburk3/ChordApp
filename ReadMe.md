## ChordExplorer

This application allows users to register, log in, create, read, update, and delete audio translations....

## Features

Register user and login.

CRUD operations: Create, read, update, and delete for audio posts.

Display all audio logs a user created.

Session management.

Automated testing using *********.

## Installation

Clone Repo: git clone https://github.com/Shaneburk3/ChordApp.git

Open terminal: cd chordapp

Install  application dependencies

npm install sqlite3
npm install body-parser
npm install express
npm install ejs
npm install express-session
#npm install knex
npm install nodemailer
npm install dotenv
npm install nodemon / npm run devStart

## SECURITY FEATURES
npm install express-validator
npm install crypto
npm install jsonwebtoken
npm install cookie-parser


# TESTING

npm install --save-dev supertest

## unit testing

npm install --save-dev jest

## Integration testing

npm install selenium-webdriver
npm install chromedriver
For firefox: geckodriver

# Run Tests

npm run test:jest
npm run test:selenium

## Run individual tests:

node tests/selenium/testLogin.test.js 
node tests/selenium/testRegister.test.js
node tests/selenium/testUpdateUser.test.js
node tests/selenium/testTermsCheck.test.js



## Jupyter Setup
-  In C:\Users\shane\Documents, create the venv: 
    - py -3.9 -m venv chordApp_venv

- Bypass script blocker and activate venv in powershell: 
    - Set-ExecutionPolicy -Scope Process -executionPolicy Bypass .\chordApp_venv\Scripts\Activate.ps1

- install packages using Bash: 
    - pip install matplotlib tensorflow librosa numpy scikit-learn ipykernel

- Register the venv as a Jupyter Kernel in git bash chordApp_venv:
    - python -m ipykernel install --user --name=chorApp_venv --display-name "Python (chordApp_venv)"

- Launch notebook in project:
    - C:\Users\shane\Documents\GitHub\Chord_App\notebooks> jupyter notebook

- To open a notebook: 
    - select kernel: Python (chordApp_venv)
    - choose notebook ipynb file.


## Jupyter Dependencies
pip install jupyterlab tensorflow scikit-learn librosa seaborn matplotlib soundfile joblib

## Run
jupyter notebook

## Start ChordExplorer

Command line: cd/chordexplorer
Command line: node app.js

Open web browser, enter: http://localhost:3000/

## RUN TESTS

## SELENIUM

node tests/selenium/testRegister.test.js
node tests/selenium/testLogin.test.js
node tests/selenium/testUpdate.test.js

## How to use website

1 - Navigate to register page from the dropdown menu in the nab bar.
2 - Register a new user. Example:

first_name: Name
last_name: Last name
email: email
password: password (min 8 characters)
Retype password: type password again
Date of birth: enter DOB
Accept Terms and Conditions - checkbox

3 - redirected to blogs page, views blogs or either create, update or delete blogs.

## Database 

When actions run, the database is connected to. the Postgresql file will run transactional functionswith connect / BEGIN / COMMIT / ROLLBACK / RELEASE. This is to ensure there are no locks on tables when querying the data. 

## THANK YOU!
