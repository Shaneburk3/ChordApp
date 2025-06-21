import tensorflow as tf
import os
import ffmpeg
from pydub import AudioSegment
import subprocess



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

def convert_to_wav(input_path):
    try:
        print("*********** Convert_to_wav ********************")
        print("Data given to convert_to_wav:", input_path)
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

