🎵 ChordExplorer

ChordExplorer is a web based application that allows its users to register, log in, upload audio of chords, and get predictions of the chord played using a machine learning model.


# Features ↙️

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

1. git clone https://github.com/Shaneburk3/ChordApp.git

2. download the requirements folder, add .env file to application.

# Node/Express app Setup

1. cd chordapp
2. npm install sqlite3 pg body-parser express ejs express-session nodemailer dotenv nodemon multer fs form-data node-fetch@2 @aws-sdk/client-secrets-manager jest@30.0.4 express-validator crypto jsonwebtoken cookie-parser aws-sdk
3. run: npm run devStart

# PostgreSQL Setup
1. Download env_variables.txt file.
2. Create .env in Chord_App/chordapp, add text from this file.
3. Install pgAdmin 4, log in to server (credentials in .env)
4. Create database: chordExplorer
5. Right click chordExplorer > Restore... > upload chordExplorer_backup.backup > save

Note: File also found in: /Chord_App/DB_backup/chordExplorer_backup.sql

PostgreSQL functions use transaction blocks to avoid table locking!

# Python (Flask) Setup

Virtual environment is required to install and run the Flask API.

# ffmpeg Enviornment Variable
The application uses package ffmpeg to convert .webm files to .wav files. This needs to be added to the system in enviornment variables.

1. Visit: https://ffmpeg.org/
2. Download the executable ffmpeg zip. 
3. Add Path the the .bin location for ffmpeg to System Variables.

# PowerShell
1. cd /Chord_App
2. python -m venv venv
3. Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
4. .\venv\Scripts\Activate.ps1
5. run pip install --default-timeout=1000 -r requirements.txt
6. Run Server: python predict_server.py

# Bash
1. source venv/Scripts/activate
2. pip install --default-timeout=1000 -r requirements.txt
3. python predict_server.py

# Test Prediction using audio data:

Invoke-WebRequest -Uri http://127.0.0.1:5000/predict -Method POST -InFile "C:\Path\to\audio.wav" -ContentType "multipart/form-data"

Test Prediction using curl in bash

curl -X POST -F "audio=@audio.wav" http://127.0.0.1:5000/api/audios/212/predict


# Dependencies (Python)

tensorflow==2.19.0 keras librosa numpy ffmpeg pydub

See requirements.txt

# Machine Learning Setup (Not required to run application)

Convert Keras model for TensorFlow.js use
- cd notebooks
- tensorflowjs_converter --input_format=keras chord_model.keras ../chordapp/model

# Testing

Install Test Dependencies

1. npm install --save-dev supertest jest selenium-webdriver chromedriver geckodriver

Run All Tests

1. cd chordapp
2. npm run test:jest
3. npm run test:selenium

Run Individual Tests

# Selenium

node tests/selenium/integration/TESTNAME.test.js

# Jest

npx jest tests/jest/unit/TESTNAME.test.js


# Jupyter Notebook Setup (Not required to run application)

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

# Run Node.JS server

cd /Chord_App/chordapp
npm run devStart

Visit: http://localhost:3000/

## How to Use

1. Register

Fill out: first name, last name, email, password, confirm password, date of birth, Accept terms
Submit

2. Admin Login

email: admin@admin.com	
Password: 11111111


2. Use the App

- Update profile info (bio, country, etc.)
- Upload chord audio via translator page
- App will classify the audio
- Save if desired
- View/Search admin logs
- Update user accounts in bulk
- update singular user account

📁 Project Structure

- chordapp/: Node.js app
- predict_server.py: Flask ML endpoint
- notebooks/: Jupyter notebooks
- DB_backup/: PostgreSQL .sql file
- Amazon Secure Storage (S3): Audio files
- .env: Environment variables (not in repo)
- venv/: Python virtual environment (not in repo)

## THANK YOU❗ 👋
