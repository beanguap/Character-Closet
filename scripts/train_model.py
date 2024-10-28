import os
import idx2numpy
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
import matplotlib.pyplot as plt

# Define the path to the data folder
data_dir = 'scripts/data/fashion_mnist'

# Load the training and testing data
train_images_path = os.path.join(data_dir, 'train-images-idx3-ubyte')
train_labels_path = os.path.join(data_dir, 'train-labels-idx1-ubyte')
test_images_path = os.path.join(data_dir, 't10k-images-idx3-ubyte')
test_labels_path = os.path.join(data_dir, 't10k-labels-idx1-ubyte')

# Read the IDX files using idx2numpy
x_train = idx2numpy.convert_from_file(train_images_path)
y_train = idx2numpy.convert_from_file(train_labels_path)
x_test = idx2numpy.convert_from_file(test_images_path)
y_test = idx2numpy.convert_from_file(test_labels_path)

# Normalize the pixel values to range 0 to 1
x_train = x_train / 255.0
x_test = x_test / 255.0

# Reshape the data to add the channel dimension (grayscale)
x_train = x_train.reshape((-1, 28, 28, 1))
x_test = x_test.reshape((-1, 28, 28, 1))

# Define the model architecture
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(10, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam', 
              loss='sparse_categorical_crossentropy', 
              metrics=['accuracy'])

# Train the model
history = model.fit(x_train, y_train, epochs=10, validation_data=(x_test, y_test))

# Plot training history
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.show()

# Ensure the models directory exists
model_dir = 'scripts/models'
os.makedirs(model_dir, exist_ok=True)

# Save the model
model_path = os.path.join(model_dir, 'fashion_model.h5')
model.save(model_path)

# Confirm the model was saved
if os.path.exists(model_path):
    print("Model saved successfully!")
else:
    print("Model not saved.")
