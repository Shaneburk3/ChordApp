from chordapp.utils.audio_utils import convert_file_to_wav
import unittest
import os


class TestConvertFileToWav(unittest.TestCase):

    def setUp(self):
        self.output_path = r'C:\Users\shane\Documents\GitHub\Chord_App\unit-testing\test-audio\test_audio.wav'
        self.input_path = r'C:\Users\shane\Documents\GitHub\Chord_App\unit-testing\test-audio\test_audio.webm'

    def tearDown(self):
        if os.path.exists(self.output_path):
            os.remove(self.output_path)

    def test_convert_file_to_wav(self):
        result_path = convert_file_to_wav(self.input_path)

        self.assertEqual(result_path, self.output_path)

        self.assertTrue(os.path.exists(self.output_path), 'WAV file conversion test failed.')

        print("WAV file conversion test passed.")

        #    python -m unittest unit-testing/TestConvertFileToWav.py