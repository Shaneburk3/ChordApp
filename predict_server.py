from flask import Flask, request, jsonify
import sys
import os
# Remove warnings on server start up:
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
from chordapp.predict import predict_chord

# Create app, set to function Flask.
app = Flask(__name__)

# Save user audio submitted into this folder for temporary use.
upload_folder = os.path.join(os.getcwd(), 'temp_audios')
if not os.path.exists(upload_folder):
    os.makedirs(upload_folder)

# Define the route to be used from the routes pages

@app.route('/api/audios/<int:user_id>/predict', methods=['GET','POST'])
def predict(user_id):
    if 'audio' not in request.files:
        return jsonify(({'error': 'No audio file received in server'}), 4000)
    # Get audio file, save it as .webm with a folder path.
    file = request.files['audio']
    temp_file = 'temp_user_audio.webm'
    temp_path = os.path.join(upload_folder, temp_file)
    # Temporarily save the audio file as temp_audio.wav, in the temp audio folder.
    file.save(temp_path)

    try:
        result = predict_chord(temp_path)
        return (result)
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file) 

if __name__ == "__main__": 
    app.run(port=5000, debug=True)