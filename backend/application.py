from flask import Flask, request, url_for
import numpy as np
import pandas as pd
import pickle
import re
from io import BytesIO
import base64
from PIL import Image
import urllib
from sklearn.neighbors import NearestNeighbors
from numpy.linalg import norm
import tensorflow
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
import gzip

application = Flask(__name__)


# Load Myntra Dataset
myntra = pd.read_csv('myntra.csv')

# Sig file which contains similarity between each product
# sig = pickle.load(open('sig.pkl', 'rb'))
# Load the .npz file
# Load the compressed numpy array

# Load the compressed numpy array
with gzip.open('sig1.npy.gz', 'rb') as f:
    sig1 = np.load(f)

with gzip.open('sig2.npy.gz', 'rb') as f:
    sig2 = np.load(f)

with gzip.open('sig3.npy.gz', 'rb') as f:
    sig3 = np.load(f)

with gzip.open('sig4.npy.gz', 'rb') as f:
    sig4 = np.load(f)

# print(sig1.shape, sig2.shape, sig3.shape, sig4.shape)

# Merge arrays vertically
sig = np.vstack((sig1, sig2, sig3, sig4))

# print(sig)

# Indices to get product title
indices = pickle.load(open('indices.pkl', 'rb'))

# features of each product image in our dataset
embeddings = np.array(pickle.load(open('embeddings.pkl', 'rb')))



# all popular products in men's category
# men_popular = pickle.load(open('men_popular.pkl', 'rb'))
men_popular = pd.read_pickle(r'men_popular.pkl')

# all popular products in women's category
women_popular = pd.read_pickle(r'women_popular.pkl')

# all popular products in
popular_products = pd.read_pickle(r'popular_products.pkl')


filtered_indices = pd.read_pickle(r'filtered_indices.pkl')
filtered_indices = np.array(filtered_indices)

# resnet model to train uploaded images
model = ResNet50(weights='imagenet', include_top=False,
                 input_shape=(224, 224, 3))
model.trainable = False

model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

# print(model.summary())


# function to extract features from image
def feature_extraction(img_array, model):

    # expand the dimention of image array
    expanded_img_array = np.expand_dims(img_array, axis=0)

    preprocessed_img = preprocess_input(expanded_img_array)

    # Get the features of image
    result = model.predict(expanded_img_array).flatten()

    return result / norm(result)

# Recommand sililar feature products


def recommend(features, feature_list):
    neighbors = NearestNeighbors(
        n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)

    distances, indices = neighbors.kneighbors([features])

    return indices

# Return all best selling products
@application.route('/bestsellers', methods=['GET'])
def get_data():

    return popular_products.to_json(orient='records')

# return all best selling products in men's category


@application.route('/menProducts', methods=['GET'])
def get_men_data():

    return men_popular.to_json(orient='records')

# return all best selling products in women's category


@application.route('/womenProducts', methods=['GET'])
def get_women_data():
    return women_popular.to_json(orient='records')

# return all products data


@application.route('/allProducts', methods=['GET'])
def get_all_data():
    return myntra.to_json(orient='records')

# Give similar products data based on title


@application.route('/prod/<title>', methods=['GET'])
def get_prod(title):

    # get the index of product through title
    index = indices[title]

    sig_cs = list(enumerate(sig[index]))

    # Sorting done based on similarity
    sig2 = sorted(sig_cs, key=lambda x: x[1], reverse=True)

    # get 12 products
    sig_cs2 = sig2[1: 13]

    product_indices = [i[0] for i in sig_cs2]

    return myntra.iloc[product_indices].to_json(orient='records')


# Give buying recommandation of products based on title
@application.route('/recommand/<title>', methods=['GET'])
def get_recommand(title):

    index = np.where(myntra['title'] == title)[0][0]

    output = filtered_indices[index][1:]

    return myntra.iloc[output].to_json(orient='records')

# Return similar products based on image features


@application.route('/imageData', methods=['GET', 'POST'])
def get_image_data():
    img_data = request.get_json()

    # image is in base64 format: so need to remove first 22 characters
    img = img_data['data'][23:]

    # Load the image from base64 format and resize it to (224 x 224) so that it can be fed to the model
    im = Image.open(BytesIO(base64.b64decode(img))).resize((224, 224))

    # Convert image into array
    img_array = np.array(im)
    # print(img_array)

    # Extract features from the image
    features = feature_extraction(img_array, model)
    # print(features)

    # Get the similar products indices
    indices = recommend(features, embeddings)

    return myntra.iloc[indices[0]].to_json(orient='records')


if __name__ == '__main__':
    application.run()
