from flask import Flask, request, url_for
import numpy as np
import pandas as pd
import pickle
# import re
# from io import BytesIO
# import base64
# from PIL import Image
# import urllib
# from sklearn.neighbors import NearestNeighbors
# from numpy.linalg import norm
# import tensorflow
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.layers import GlobalMaxPooling2D
# from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input


app = Flask(__name__)

myntra = pd.read_csv('myntra.csv')

sig = pickle.load(open('sig.pkl', 'rb'))
indices = pickle.load(open('indices.pkl', 'rb'))
# embeddings = np.array(pickle.load(open('embeddings.pkl', 'rb')))

men_popular = pickle.load(open('men_popular.pkl', 'rb'))

women_popular = pickle.load(open('women_popular.pkl', 'rb'))


popular_products = pickle.load(open('popular_products.pkl', 'rb'))

filtered_indices = np.array(pickle.load(open('filtered_indices.pkl', 'rb')))


# model = ResNet50(weights='imagenet', include_top=False,
#                  input_shape=(224, 224, 3))
# model.trainable = False

# model = tensorflow.keras.Sequential([
#     model,
#     GlobalMaxPooling2D()
# ])

# print(model.summary())


# def feature_extraction(img_array, model):

#     expanded_img_array = np.expand_dims(img_array, axis=0)
#     # print(expanded_img_array.shape)
#     preprocessed_img = preprocess_input(expanded_img_array)
#     # print(preprocessed_img.shape)
#     result = model.predict(expanded_img_array).flatten()
#     # print(result.shape)
#     # print(result / norm(result))
#     return result / norm(result)


# def recommend(features, feature_list):
#     neighbors = NearestNeighbors(
#         n_neighbors=6, algorithm='brute', metric='euclidean')
#     neighbors.fit(feature_list)

#     distances, indices = neighbors.kneighbors([features])

#     return indices


@app.route('/bestsellers', methods=['GET'])
def get_data():

    return popular_products.to_json(orient='records')


@app.route('/menProducts', methods=['GET'])
def get_men_data():

    return men_popular.to_json(orient='records')


@app.route('/womenProducts', methods=['GET'])
def get_women_data():
    return women_popular.to_json(orient='records')


@app.route('/allProducts', methods=['GET'])
def get_all_data():
    return myntra.to_json(orient='records')


@app.route('/prod/<title>', methods=['GET'])
def get_prod(title):

    index = indices[title]

    sig_cs = list(enumerate(sig[index]))

    sig2 = sorted(sig_cs, key=lambda x: x[1], reverse=True)

    sig_cs2 = sig2[1: 13]

    product_indices = [i[0] for i in sig_cs2]

    return myntra.iloc[product_indices].to_json(orient='records')


@app.route('/recommand/<title>', methods=['GET'])
def get_recommand(title):

    index = np.where(myntra['title'] == title)[0][0]

    output = filtered_indices[index][1:]

    return myntra.iloc[output].to_json(orient='records')


# @app.route('/imageData', methods=['GET', 'POST'])
# def get_image_data():
#     img_data = request.get_json()
#     # print(img_data)
#     img = img_data['data'][23:]
#     im = Image.open(BytesIO(base64.b64decode(img))).resize((224, 224))
#     img_array = np.array(im)
#     # print(img_array)
#     features = feature_extraction(img_array, model)
#     print(features)

#     indices = recommend(features, embeddings)
#     # # print(type(indices[0]))
#     # # print(type(indices))
#     # # print((indices[0]))

#     return myntra.iloc[indices[0]].to_json(orient='records')


if __name__ == '__main__':
    app.run()
