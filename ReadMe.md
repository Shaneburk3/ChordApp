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

Open terminal: cd Chord_App

npm install aws-sdk

Install  application dependencies

cd /chordapp:

npm install sqlite3 body-parser express ejs express-session nodemailer dotenv nodemon multer fs form-data node-fetch node-fetch@2

## SECURITY FEATURES
npm install express-validator crypto jsonwebtoken cookie-parser

npm run devStart

## venv setup, to create a python Flask Application to run python code, run the model and predict chords

cd: /Chord_App:

Dependenies: keras-3.10.0 numpy-2.0.2 protobuf-5.29.5 tensorboard-2.19.0 tensorboard-data-server-0.7.2 tensorflow-2.19.0 

- .gitingore add: venv/
- Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
- Powershell: .\venv\Scripts\Activate.ps1
    - pip install flask librosa tensorflow numpy
    - python predict_server.py
    - Invoke-WebRequest -Uri http://127.0.0.1:5000/predict -Method POST -InFIle C:\Users\shane\Documents\GitHub\Chord_App\audio_data\data\Test\C\C_003.wav -ContentType "multipart/form-data"



- Bash: source venv/Scripts/activate
    - pip install flask librosa tensorflow==2.19.0 numpy==1.23.5 ffmpeg ffmpeg-python pydub
    - python predict_server.py
    - Test prediction model in new window: bash $ curl -X POST -F "audio=@C:\Users\shane\Documents\GitHub\Chord_App\audio_data\data\Training\C\C_005.wav" http://127.0.0.1:5000/api/audios/212/predict

- Note: Must down ffmpeg executable, add it to enviorment variables.

http://127.0.0.1:5000/predict


## Machine Learning Model Dependencies

Bash: pip install tensorflowjs
npm install @tensorflow/tfjs-node

## Machine Learning Model set up

Chord_App/notebooks: tensorflowjs_converter --input_format=keras chord_model.keras ../chordapp/model


# TESTING

npm install --save-dev supertest
npm install --save-dev jest
npm install selenium-webdriver
npm install chromedriver
For firefox: geckodriver

# Run Tests

- cd Chord_App/chordapp

npm run test:jest
npm run test:selenium

## Run individual tests

- SELENIUM

node tests/selenium/testLogin.test.js 
node tests/selenium/testRegister.test.js
node tests/selenium/testUpdateUser.test.js
node tests/selenium/testTermsCheck.test.js

## Jest

npx jest tests/jest/unit/testAge.test.js
npx jest tests/jest/unit/testPassword.test.js
npx jest tests/jest/unit/testSQLInject.test.js
npx jest tests/jest/unit/testXXS.test.js

Run all jest tests: 
- cd Chord_App/chordapp
- npm run test:jest

## Jupyter Setup

In C:\Users\[username]\Documents, create the venv: 
- py -3.11 -m venv chordApp_venv

Bypass script blocker and activate venv in powershell: 
 - Set-ExecutionPolicy -Scope Process -executionPolicy Bypass 
 - .\chordApp_venv\Scripts\Activate.ps1

- install packages using Bash: 
    - pip install matplotlib tensorflow==2.19.0 librosa numpy scikit-learn ipykernel

- Register the venv as a Jupyter Kernel in git bash chordApp_venv:
    - python -m ipykernel install --user --name=chordexplorer_venv --display-name "Python (chordexplorer_venv)"

## Jupyter Dependencies to install in venv

pip install os re pathlib random numpy librosa matplotlib matplotlib tensorflow sklearn

## Run

- Launch notebook in project:
    - \Chord_App\notebooks> jupyter notebook

- To open a notebook: 
    - Select kernel: Python (chordexplorer_venv)
    - Select the notebook .ipynb file.

## Start ChordExplorer

Command line: cd/Chord_App/chordexplorer
Command line: npm run devStart

Open web browser, enter: http://localhost:3000/


## How to use website


1 - Register a new user:

- first_name: Name
- last_name: Last name
- email: email
- password: password$ (min 8 characters and a special character)
- Retype password: password$
- Date of birth: enter DOB
- Accept Terms and Conditions - checkbox tick

2 - Edit profile, create, update or delete information.

- Sign in to users account
- Click update Information
- Enter new bio/country/city/age/DOB
- Submit changes.

3 - Use chord classifier

- Navigate to translator page
- Record an audio, while playing a chord.
- Audio will be classified to its chord type.


## Database 

- When actions run, the database is connected to. 
- The Postgresql models will run transactional functions with connect / BEGIN / COMMIT / ROLLBACK / RELEASE. 
- This is to ensure there are no locks on tables when querying the data. 

## THANK YOU!
