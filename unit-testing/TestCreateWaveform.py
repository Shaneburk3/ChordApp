from chordapp.utils.audio_utils import create_waveform, convert_file_to_wav
import unittest
import os


class TestCreateWaveform(unittest.TestCase):

    def setUp(self):
        self.temp_path_wav = r'C:/Users/shane/Documents/GitHub/Chord_App/unit-testing/test-audio/Am/test_audio.wav'
        self.temp_path_webm = r'C:/Users/shane/Documents/GitHub/Chord_App/unit-testing/test-audio/Am/test_audio.webm'

        if not os.path.exists(self.temp_path_wav):
            self.test_path_wav = convert_file_to_wav(self.temp_path_webm)

    def tearDown(self):
        pass

    def test_create_waveform(self):

        result = create_waveform(self.temp_path_wav, target_sr=22025, target_len=64000)

        self.assertIsNotNone(result, 'create_waveform returned None')

        audio, label, sr, file_name, path = result


        print(audio)
        print(label)
        print(sr)
        print(file_name)
        print(path)

        print("WAV file conversion test passed.")

# python -m unittest unit-testing/TestCreateWaveform.py

        