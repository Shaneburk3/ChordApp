import sys
import librosa
import tensorflow as tf
from tensorflow import keras
import numpy as np
import os

model = tf.keras.models.load_model('C:/Users/shane/Documents/GitHub/Chord_App/notebooks/models/chord_model.keras')

def convert_to_spectrogram(waveform, target_len=32000):
    waveform = tf.cast(waveform, dtype=tf.float32)
    waveform = tf.reshape(waveform, [-1])
    waveform = keras.utils.pad_sequences([waveform], maxlen=target_len, padding='post', truncating='post')[0]
    spectrogram = tf.signal.stft(
        waveform, 
        frame_length=256, 
        frame_step=128, 
        fft_length=256
        )
    spectrogram = tf.abs(spectrogram) ** 2
    spectrogram_db = 10 * tf.math.log(spectrogram + 1e-10) / tf.math.log(10.0)
    return spectrogram_db[..., tf.newaxis]

if __name__ == "__main__":
    file_path = sys.argv[1]
    y, sr = librosa.load(file_path, sr=32000, mono=True)
    y = librosa.util.fix_length(y, size=32000)
    spectrogram = convert_to_spectrogram(y)
    spectrogram = tf.expand_dims(spectrogram, axis=0)
    prediction = model.predict(spectrogram)
    predicted_index = np.argmax(prediction)
    print(predicted_index)