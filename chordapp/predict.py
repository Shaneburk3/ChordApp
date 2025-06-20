import sys
import librosa
import tensorflow as tf
import numpy as np
import os
from chordapp.utils.audio_utils import convert_to_spectrogram



model = tf.keras.models.load_model('C:/Users/shane/Documents/GitHub/Chord_App/notebooks/models/chord_model_64.h5')

index_to_label = {
    0: 'Am',
    1: 'Bb',
    2: 'Bdim',
    3: 'C',
    4: 'Dm',
    5: 'Em',
    6: 'F',
    7: 'G'
    }

    # Load audio file with librosa, fix the length, convert to Spectrogram for the model.
    # y = raw data, sr = sample rate

#ONLY run script when executed directly
if __name__ == "__main__":
    # From audioController, the file_path takes the first argument
    file_path = sys.argv[1]
    # loads raw data, sample rate as a 1D waveform of
    y, sr = librosa.load(file_path, sr=22050, mono=True)

    print("The first 10 values of inputted audio:")
    print(y[:10])
    y = np.array(y, dtype=np.float32)

    print("The shape in inputted audio:")
    print(y.shape)
    # Fix the length of all input for normalization
    y = librosa.util.fix_length(y, size=64000)
    spectrogram = convert_to_spectrogram(y)
    #Expand dims to fit model trained
    spectrogram = spectrogram[...,tf.newaxis]
    # add dimension for batch number
    spectrogram = tf.expand_dims(spectrogram, axis=0)
    # Model being utilized to make prediction.
    prediction = model.predict(spectrogram)
    predicted_index = np.argmax(prediction)
    print("Predicted Chord: ", index_to_label.get(predicted_index, "Unknown"))