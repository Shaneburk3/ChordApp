from chordapp.utils.audio_utils import convert_to_spectrogram
import unittest
import os


class TestConvertToSpectrogram(unittest.TestCase):

    def setUp(self):
        None

    def tearDown(self):
        None

    def convert_to_spectrogram(self):
        result_path = convert_to_spectrogram(self.input_path)

        self.assertEqual(result_path, '')

        self.assertTrue(os.path.exists(self.output_path), 'spectrogram file conversion test failed.')

        print("Spectrogram conversion test passed.")

        #    python -m unittest unit-testing/TestCreateSpectrogram.py