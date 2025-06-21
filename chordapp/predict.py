import sys
import librosa
import tensorflow as tf
import numpy as np
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from utils.audio_utils import convert_to_spectrogram, convert_to_wav


# Convert .webm file to .wav for the Model
import ffmpeg



model = tf.keras.models.load_model('C:/Users/shane/Documents/GitHub/Chord_App/notebooks/models/chord_model_64.h5')

index_to_label = { 0: 'Am', 1: 'Bb', 2: 'Bdim', 3: 'C', 4: 'Dm', 5: 'Em', 6: 'F', 7: 'G' }

    # Load audio file with librosa, fix the length, convert to Spectrogram for the model.
    # y = raw data, sr = sample rate

#ONLY run script when executed directly
def predict_chord(temp_input_path):
    # From audioController, the file_path takes the first argument
    
    print("Temp audio path from predict_server.py: ", temp_input_path)
    # Path: \\uploads\\ad946a66b1cdc462fe356c8e68927d10

    temp_path_wav = convert_to_wav(temp_input_path)

    print("Converted to wav:", temp_path_wav)
    # loads raw data, sample rate as a 1D waveform of
    y, sr = librosa.load(temp_path_wav, sr=22050, mono=True)

    print("The first 10 values of inputted audio:")
    print(y[:10])
    y = np.array(y, dtype=np.float32)

    print("The shape in inputted audio:")
    print(y.shape)
    # Fix the length of all input for normalization
    y = librosa.util.fix_length(y, size=64000)
    spectrogram = convert_to_spectrogram(y)
    # Expand dims to fit model trained in Jupyter
    spectrogram = spectrogram[...,tf.newaxis]
    # Add dimension for batch number
    spectrogram = tf.expand_dims(spectrogram, axis=0)
    # Model being utilized to make prediction.
    prediction = model.predict(spectrogram)
    predicted_index = np.argmax(prediction)
    print("Raw Label", predicted_index)
    return(index_to_label.get(predicted_index, "Unknown")) 