from chordapp.utils.audio_utils import convert_to_spectrogram, create_waveform
import unittest
import os


class TestConvertToSpectrogram(unittest.TestCase):

    def setUp(self):
        # Paths to audio file. Will need a waveform to convert in to a spectrogram
        self.input_wav_path = r'C:\Users\shane\Documents\GitHub\Chord_App\unit-testing\test-audio\Am\test_audio.wav'
        self.temp_path_webm = r'C:/Users/shane/Documents/GitHub/Chord_App/unit-testing/test-audio/Am/test_audio.webm'


    def tearDown(self):
        None

    def test_convert_to_spectrogram(self):

        #First need a waveform, so we can test the create spectrogram function
        self.test_waveform = create_waveform(self.input_wav_path, target_sr=22025, target_len=64000)

        self.assertIsNotNone(self.test_waveform, 'create_waveform returned None')

        audio, label, sr, file_name, path = self.test_waveform

        test_spectrogran = convert_to_spectrogram(audio)

        self.assertEqual(test_spectrogran.shape[0], 129, 'Spectrogram dimension incorrect')
        self.assertEqual(test_spectrogran.shape[1], 499, 'Spectrogram dimension incorrect')


        print("Spectrogram conversion test passed.")

        #    python -m unittest unit-testing/TestConvertToSpectrogram.py