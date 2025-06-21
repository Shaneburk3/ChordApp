import tensorflow as tf
import os
import ffmpeg
from pydub import AudioSegment
import subprocess
import librosa
import numpy as np



def convert_to_spectrogram(waveform, target_len=64000):
    print("*********** Convert_to_spectrogram ********************")

    print("Audio before reshaping: ", waveform.shape)

    # Cast waveform to a sensor, so it can be reshaped, then converted to a spectrogram
    waveform = tf.cast(waveform, dtype=tf.float32)
    # shape of [-1] flattens tensor into 1-D (Audio wave diagram)
    waveform = tf.reshape(waveform, [-1])

    print("Audio after reshaping: ", waveform.shape)

    # pad_sequences fixes the audio tensor, so each array is the same length. 32000kHz
    # Truncating removes sequences larger than max length
    waveform = waveform[:target_len]
    padding = target_len - tf.shape(waveform)[0]
    waveform = tf.pad(waveform, [[0, padding]])
    spectrogram = tf.signal.stft(
        waveform, 
        frame_length=256, 
        frame_step=128, 
        fft_length=256
        )
    # Get the absolute value of the tf, increase its size for better images
    spectrogram = tf.abs(spectrogram) ** 2
    spectrogram_db = 10 * tf.math.log(spectrogram + 1e-10) / tf.math.log(10.0)
    spectrogram_db = tf.transpose(spectrogram_db)
    print(tf.shape(spectrogram_db))
    return spectrogram_db[..., tf.newaxis]

def convert_file_to_wav(input_path):
    try:
        print("Data given to convert_file_to_wav:", input_path)
        print("\n")
        print(f"Does file exists? {os.path.exists(input_path)}")
        print(f"Is it a file? {os.path.isfile(input_path)}")

        # split the filename, path .
        input_filename = os.path.splitext(os.path.basename(input_path))[0]
        print("Input File Name: ", input_filename)
        input_dir = os.path.dirname(input_path)
        print("Input DIR Name: ", input_dir)
        # Full input path to user audio
        input_path = os.path.join(input_dir, input_filename + ".webm")
        print("Asking subprocess to convert: ", input_path)


        # The output path desired
        output_path = os.path.join(input_dir, input_filename + ".wav")
        print("Output full path: ", output_path)
        # Convert new file path to .wav
        result = subprocess.call(['ffmpeg', '-i', input_path, output_path])
        print("Converted:", result)
        # return path to the altered input file
        if result == 0:
            print("Conversion to wav was successful.")
            return output_path
        else:
            print("Conversion failed.")
            return None
    except Exception as e:
        print("Error converting file to .wav", str(e))
        return None
    
def convert_to_waveform(temp_path_wav):
    y, sr = librosa.load(temp_path_wav, sr=22050, mono=True)

    y = np.array(y, dtype=np.float32)

    print("The shape in inputted audio:")
    print(y.shape)
    # Fix the length of all input for normalization
    y = librosa.util.fix_length(y, size=64000)

    return y

def create_waveforms(folder_path, target_sr=22050, target_len=64000):

    index_to_label = { 0: 'Am', 1: 'Bb', 2: 'Bdim', 3: 'C', 4: 'Dm', 5: 'Em', 6: 'F', 7: 'G' }
    label_to_index = { 'Am': 0, 'Bb': 1, 'Bdim': 2, 'C': 3, 'Dm': 4, 'Em': 5, 'F': 6, 'G': 7 }

    
    audios = []
    labels = []
    file_names = []
    paths = []
    original_len = []
    
    # base path for each folder is the label for each classification
    label = str(os.path.basename(folder_path))
    # Gets index numbers based on folder label
    label_index = label_to_index.get(label)
    
    # Librosa - Convert audio file to waveform
    for file in os.listdir(folder_path):
        if file.endswith(".wav"):
            file_path = os.path.join(folder_path, file)
            y, sr = librosa.load(file_path, sr=target_sr, mono=True)
            original_len.append(y.shape)
            # trim audio frames with no noise, less than 20 decibels
            y_trimmed, _ = librosa.effects.trim(y, top_db=20)
            # Set length to 64000
            y_fixed = librosa.util.fix_length(y_trimmed, size=target_len)
            audios.append(y_fixed)
            labels.append(label_index)
            paths.append(file_path)
            file_names.append(file)
        else:
            return None

    if audios:
        print(f"Label: {labels[0]}, Original Shape: {original_len[0]} Fixed Shape: {audios[0].shape}, Total fixed: {len(audios)}")
            
    #Each .wav now labelled by number below
    return audios, labels, sr, file_names, paths


