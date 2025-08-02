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

1 - git clone https://github.com/Shaneburk3/ChordApp.git
2 - Navigate to ChordApp in code editor
4 - run pip install --default-timeput=1000 -r requirements.txt


# PostgreSQL Setup
1. Download env_variables.txt.
2. Create .env in Chord_App, add text this file.
3. Install pgAdmin 4, log in to server (credentials in .env)
4. Create database: chordExplorer
5. Right click chordExplorer > Restore... > upload chordExplorer_backup.backup > save

File found in: /Chord_App/DB_backup/chordExplorer_backup.sql

PostgreSQL functions use transaction blocks to avoid table locking!

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

Convert Keras model for TensorFlow.js use
- cd notebooks
- tensorflowjs_converter --input_format=keras chord_model.keras ../chordapp/model


# Node/Express app Setup

cd chordapp
npm install sqlite3 pg body-parser express ejs express-session nodemailer dotenv nodemon multer fs form-data node-fetch@2 @aws-sdk/client-secrets-manager jest@30.0.4 express-validator crypto jsonwebtoken cookie-parser

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

## THANK YOU!
