import matplotlib.pyplot as plt
import requests
import base64
import json
import numpy as np
from tensorflow.keras.datasets.mnist import load_data

#load MNIST dataset
(_, _), (x_test, y_test) = load_data()
# reshape data to have a single channel
x_test = x_test.reshape((x_test.shape[0], x_test.shape[1], x_test.shape[2], 1))
# normalize pixel values
x_test = x_test.astype('float32') / 255.0


import sys
original_stdout = sys.stdout

with open('demo.txt', 'w') as f:
    sys.stdout = f 
    print(x_test[0:4].tolist())
    sys.stdout = original_stdout 