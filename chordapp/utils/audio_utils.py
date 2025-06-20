import tensorflow as tf

def convert_to_spectrogram(waveform, target_len=64000):
    # Cast waveform to a sensor, so it can be reshaped, then converted to a spectrogram
    waveform = tf.cast(waveform, dtype=tf.float32)

    print("Audio before reshaping: ", waveform.shape)

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