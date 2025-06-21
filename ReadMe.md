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

npm install sqlite3 body-parser express ejs express-session nodemailer dotenv nodemon multer fs form-data node-fetch node-fetch@2

npm run devStart

## venv setup, to create a python Flask Application to run python code, run the model and predict chords

installed: keras-3.10.0 numpy-2.0.2 protobuf-5.29.5 tensorboard-2.19.0 tensorboard-data-server-0.7.2 tensorflow-2.19.0 

- .gitingore add: venv/
- Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
- Powershell: .\venv\Scripts\Activate.ps1
    - pip install flask librosa tensorflow numpy
    - python predict_server.py
    - Invoke-WebRequest -Uri http://127.0.0.1:5000/predict -Method POST -InFIle C:\Users\shane\Documents\GitHub\Chord_App\audio_data\data\Test\C\C_003.wav -ContentType "multipart/form-data"



- Bash: source venv/Scripts/activate
    - pip install flask librosa tensorflow==2.19.0 numpy==1.23.5 ffmpeg ffmpeg-python pydub
    - python predict_server.py
    - Test prediction model in new window: bash $ curl -X POST -F "audio=@C:\Users\shane\Documents\GitHub\Chord_App\audio_data\data\Test\C\C_003.wav" http://127.0.0.1:5000/api/audios/212/predict

- Note: Must down ffmpeg executable, add it to enviorment variables.

http://127.0.0.1:5000/predict


## SECURITY FEATURES
npm install express-validator
npm install crypto
npm install jsonwebtoken
npm install cookie-parser

## Machine Learning Model Dependencies

Bash: pip install tensorflowjs
npm install @tensorflow/tfjs-node

## Machine Learning Model set up

Chord_App/notebooks: tensorflowjs_converter --input_format=keras chord_model.keras ../chordapp/model


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
    - py -3.11 -m venv chordApp_venv

- Bypass script blocker and activate venv in powershell: 
    - Set-ExecutionPolicy -Scope Process -executionPolicy Bypass 
    - .\chordApp_venv\Scripts\Activate.ps1

- install packages using Bash: 
    - pip install matplotlib tensorflow==2.19.0 librosa numpy scikit-learn ipykernel

- Register the venv as a Jupyter Kernel in git bash chordApp_venv:
    - python -m ipykernel install --user --name=chordexplorer_venv --display-name "Python (chordexplorer_venv)"

- Launch notebook in project:
    - C:\Users\shane\Documents\GitHub\Chord_App\notebooks> jupyter notebook

- To open a notebook: 
    - select kernel: Python (chordexplorer_venv)
    - choose notebook .ipynb file.


## Jupyter Dependencies
pip install jupyterlab tensorflow==2.19.00 scikit-learn librosa seaborn matplotlib

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
