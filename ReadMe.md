🎵 ChordExplorer

ChordExplorer is a web based application that allows its users to register, log in, upload audio of chords, and get predictions of the chord played using a machine learning model.


# Features

- User registration and login with session management
- CRUD operations
- View all user submitted audios
- Admin functionality
- Flask API for model predictions
- Machine learning model in Jupyter
- PostgreSQL database with transactional safety (BEGIN / COMMIT / ROLLBACK)
- End-to-end testing using Selenium and Jest

# Installation

Clone the Repo

git clone https://github.com/Shaneburk3/ChordApp.git
cd ChordApp


# Python (Flask) Setup

Environment

Virtual environment is required and gitignored.

# PowerShell
cd /Chord_App
python -m venv venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python predict_server.py

# Bash
source venv/Scripts/activate
pip install -r requirements.txt
python predict_server.py

Test Prediction using audio data:

Invoke-WebRequest -Uri http://127.0.0.1:5000/predict -Method POST -InFile "C:\Path\to\audio.wav" -ContentType "multipart/form-data"

Test Prediction using curl in bash

curl -X POST -F "audio=@audio.wav" http://127.0.0.1:5000/api/audios/212/predict


# Dependencies (Python)

tensorflow==2.19.0
keras
librosa
numpy
ffmpeg
pydub
See requirements.txt

# Machine Learning Setup

# Convert Keras model for TensorFlow.js use
cd notebooks
tensorflowjs_converter --input_format=keras chord_model.keras ../chordapp/model


# Node/Express app Setup

cd chordapp
npm install sqlite3 body-parser express ejs express-session nodemailer dotenv nodemon multer fs form-data node-fetch@2 @aws-sdk/client-secrets-manager jest@30.0.4 express-validator crypto jsonwebtoken cookie-parser

# PostgreSQL Setup

1. Install pgAdmin 4 and PostgreSQL
2. Restore the database using:

File: /Chord_App/DB_backup/chordExplorer_backup.sql

PostgreSQL functions use transaction blocks to avoid table locking.

# Testing

Install Test Dependencies

npm install --save-dev supertest jest selenium-webdriver chromedriver geckodriver

Run All Tests

cd chordapp
npm run test:jest
npm run test:selenium

Run Individual Tests

# Selenium

node tests/selenium/integration/TESTNAME.test.js

# Jest

npx jest tests/jest/unit/TESTNAME.test.js


# Jupyter Notebook Setup

# Create venv
python -3.11 -m venv chordApp_venv
# Activate venv
source chordApp_venv/Scripts/activate
# Install
pip install matplotlib tensorflow==2.19.0 librosa numpy scikit-learn ipykernel flask
python -m ipykernel install --user --name=chordexplorer_venv --display-name "Python (chordexplorer_venv)"

Run Notebook

cd notebooks
jupyter notebook
Choose kernel: Python (chordexplorer_venv)

- Run the Web App

cd /Chord_App/chordapp
npm run devStart

Visit: http://localhost:3000/

## How to Use

1. Register

Fill out: first name, last name, email, password, confirm password, date of birth, Accept terms
Submit

2. Use the App

- Update profile info (bio, country, etc.)
- Upload chord audio via translator page
- App will classify the audio
- Save if desired

📁 Project Structure

- chordapp/: Node.js app
- predict_server.py: Flask ML endpoint
- notebooks/: Jupyter notebooks
- DB_backup/: PostgreSQL .sql file
- .env: Environment variables (not in repo)
- venv/: Python virtual environment (not in repo)

---------------------------------------------------------------------

## ChordExplorer

This application allows users to register, log in, create, read, update, and delete audio translations....

## Features

- Register user and login.
- CRUD operations: Create, read, update, and delete for audio posts.
- Display all audio logs a user created.
- Session management.
- Admin features
- Testing using Seleniun/Jest

## Installation

Clone Repo: git clone https://github.com/Shaneburk3/ChordApp.git

# Download requirements files: 

Flask Dependecies: requirements.txt
Enviornment variables: env_variables.txt

## Database setup

1 - Install PostgreSQL application: pdAdmin 4
2 - Restore database from backup, use: 
    - /Chord_App/DB_backup/chordExplorer_backup.sql


- The Postgresql models will run transactional functions with connect / BEGIN / COMMIT / ROLLBACK / RELEASE. 
- This is to ensure there are no locks on tables when querying the data. 

Terminal: cd Chord_App/chordapp:

npm install sqlite3 body-parser express ejs express-session nodemailer dotenv nodemon multer fs form-data node-fetch node-fetch@2 @aws-sdk/client-secrets-manager jest@30.0.4

## SECURITY FEATURES
npm install express-validator crypto jsonwebtoken cookie-parser

npm run devStart

## venv setup, to create a python Flask Application to run python code, run the model and predict chords

cd: /Chord_App:

Dependenies: requirements.txt 

(keras-3.10.0 numpy-2.0.2 protobuf-5.29.5 tensorboard-2.19.0 tensorboard-data-server-0.7.2 tensorflow-2.19.0)

# powershell

- .gitingore add: venv/
- Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
- .\venv\Scripts\Activate.ps1
    - pip install requirements.txt
    - python predict_server.py
    - Invoke-WebRequest -Uri http://127.0.0.1:5000/predict -Method POST -InFIle C:\Users\shane\Documents\GitHub\Chord_App\audio_data\data\Test\C\C_012.wav -ContentType "multipart/form-data"

# OR BASH

- Bash: source venv/Scripts/activate
    - pip install flask librosa tensorflow==2.19.0 numpy==1.23.5 ffmpeg ffmpeg-python pydub
    - python predict_server.py
    - Test prediction model in new window: bash $ curl -X POST -F "audio=@C:\Users\shane\Documents\GitHub\Chord_App\audio_data\data\Training\C\C_012.wav" http://127.0.0.1:5000/api/audios/212/predict

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
npm install geckodriver

# Run all Tests

- cd chordapp

npm run test:jest
npm run test:selenium

## Run individual tests

- SELENIUM

node tests/selenium/integration/testLogin.test.js
node tests/selenium/integration/testRegister.test.js
node tests/selenium/integration/testUpdateUser.test.js
node tests/selenium/integration/testTermsCheck.test.js
node tests/selenium/integration/negativeTestRegister.test.js


## Jest

npx jest tests/jest/unit/testAge.test.js
npx jest tests/jest/unit/testPassword.test.js
npx jest tests/jest/unit/testSQLInject.test.js
npx jest tests/jest/unit/testXXS.test.js

## Jupyter Setup

1. Create the virtual environment

 - C:\Users\[username]\Documents, create the venv: 
 - powershell: python -3.11 -m venv chordApp_venv

2. Bypass script blocker and activate venv in powershell: 
 - Set-ExecutionPolicy -Scope Process -executionPolicy Bypass
 - .\venv\Scripts\Activate.ps1
 
 3. install all dependencies
  - pip install matplotlib tensorflow==2.19.0 librosa numpy scikit-learn ipykernel flask


## OR

3. install packages using Bash: 
 - pip install matplotlib tensorflow==2.19.0 librosa numpy scikit-learn ipykernel flask

4. Register the venv as a Jupyter Kernel in git bash chordApp_venv:
 - python -m ipykernel install --user --name=chordexplorer_venv --display-name "Python (chordexplorer_venv)"

## Jupyter Dependencies to install in venv

- pip install os re pathlib random numpy librosa matplotlib matplotlib tensorflow sklearn

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
- Enter new bio/country/city/DOB
- Submit changes.

3 - Use chord classifier

- Navigate to translator page
- Record an audio, while playing a chord.
- Audio will be classified to its chord type.
- Optional: save audio to profile.

## THANK YOU!
