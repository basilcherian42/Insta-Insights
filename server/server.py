from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.models import Sequential
import tensorflow as tf
from xgboost import XGBRegressor
from sklearn.linear_model import Lasso
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
import replicate
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import nltk
from datetime import datetime, timedelta, timezone
from collections import Counter
import matplotlib.pyplot as plt
import json
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import pickle
import re
import pandas as pd
import instaloader
import shutil
import os
from werkzeug.utils import secure_filename
import math
import requests
import concurrent.futures
import json
import string
import numpy as np
import base64
# os.environ["MPLCONFIGDIR"] = 'C:\\VINAY\\Allsoftwares\\Anaconda_new\\pkgs\\matplotlib_cache'
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

app = Flask(__name__)
CORS(app)

instapage = None
profile = None
model = None
loader = None
cnn_model = None
scaler = None
tfidf_description = None
tf_idf_caption = None
cnn_y_pred = None
followercount = None
cookie_name = "sessionid"
cookie_content = #enter cookie id
expiration_date_str = #enter expiry of cookie

app = Flask(__name__)
CORS(app)


@app.route('/api/home', methods=['GET'])
def return_home():
    return jsonify({'message': "Testing the code"})


def process_text(data):
    global cookie_name, cookie_content, expiration_date_str

    ig = instaloader.Instaloader()
    expiration_date = datetime.strptime(
        expiration_date_str, "%d-%m-%Y %H:%M:%S")
    expiration_timestamp = expiration_date.timestamp()

    ig.context._session.cookies.set(
        cookie_name, cookie_content, expires=expiration_timestamp)
    instapage = data
    profile = instaloader.Profile.from_username(ig.context, instapage)
    followersno = profile.followers
    if profile.is_private:
        private = 1
    else:
        private = 0

    # Get following count
    followingno = profile.followees
    desc = len(profile.biography)
    username = profile.username
    numbers = re.findall(r'\d', username)
    number_of_numbers = len(numbers)
    n_username = number_of_numbers/(len(username))
    fullname = profile.full_name
    words = re.findall(r'\w+', fullname)
    number_of_words = len(words)
    if profile.external_url:
        external_url = 1
    else:
        external_url = 0

    postcount = profile.mediacount
    pattern = r'/v/t51\.2885-19/(\d+_\d+_\d+_n\.jpg)'
    profile_url = profile.profile_pic_url
    match = re.search(pattern, profile_url)

    # If the pattern is found, check if the image file name is the same as the placeholder
    if match and match.group(1) != '44884218_345707102882519_2446069589734326272_n.jpg':
        profile_pic = 1
    else:
        profile_pic = 0
    numbers_fullname = re.findall(r'\d', fullname)
    number_of_nofullname = len(numbers_fullname)
    n_fullname = number_of_nofullname/(len(fullname))
    if (username == fullname):
        use_full = 1
    else:
        use_full = 0
    scraped_data = {
        'profile pic': [profile_pic],
        'nums/length username': [n_username],
        'fullname words': [number_of_words],
        'nums/length fullname': [n_fullname],
        'name==username': [use_full],
        'description length': [desc],
        'external URL': [external_url],
        'private': [private],
        '#posts': [postcount],
        '#followers': [followersno],
        '#follows': [followingno]
    }
    instagram_features = pd.DataFrame(scraped_data)
    return instagram_features


def predict(username):
    try:
        if not username:
            return jsonify({'message': 'Username is required'}), 400

        df_data = process_text(username)
        profile_data_dict = df_data.to_dict(orient='records')

        # Loading the machine learning model
        with open('models/pickle_fake_model.pkl', 'rb') as f:
            model = pickle.load(f)

        prediction = model.predict(df_data)
        output = f"{username} is {'Fake' if prediction[0] == 1 else 'Real'}"

        feature_names = df_data.columns
        importance = model.feature_importances_
        feature_importance_dict = dict(zip(feature_names, importance))

        return jsonify({
            'message': output,
            'data': profile_data_dict,
            'feature_importance': feature_importance_dict
        })

    except Exception as e:
        return jsonify({'message': str(e)}), 400


def get_image_for_username(username):
    new_images_folder = '\images'
    global cookie_name, cookie_content, expiration_date_str
    

    loader = instaloader.Instaloader()
    expiration_date = datetime.strptime(
        expiration_date_str, "%d-%m-%Y %H:%M:%S")
    expiration_timestamp = expiration_date.timestamp()

    loader.context._session.cookies.set(
        cookie_name, cookie_content, expires=expiration_timestamp)

    # Download the profile picture
    loader.download_profile(username, profile_pic_only=True)

    # Find the downloaded image file
    downloaded_image_path = None
    for filename in os.listdir(username):
        if filename.endswith('_UTC_profile_pic.jpg'):
            downloaded_image_path = os.path.join(username, filename)
            break

    if not downloaded_image_path:
        raise FileNotFoundError("Downloaded image not found")

    # Destination path in the new images directory
    destination_path = os.path.join(new_images_folder, f'{username}.jpg')

    # Create the new images directory if it doesn't exist
    if not os.path.exists(new_images_folder):
        os.makedirs(new_images_folder)

    shutil.move(downloaded_image_path, destination_path)

    return destination_path


@app.route('/predict/<username>', methods=['GET'])
def predict_username(username):
    return predict(username)


@app.route('/get_image/<username>', methods=['GET'])
def get_image(username):
    try:
        if not username:
            return {'message': 'Username not provided'}, 400


        image_path = get_image_for_username(username)

        if not image_path:
            return {'message': 'Image not found for the given username'}, 404

        return send_file(image_path, mimetype='image/jpeg')

    except Exception as e:
        return {'message': str(e)}, 500


@app.route('/get_likes/<username>', methods=['GET'])
def get_likes(username):
    try:
        if not username:
            return jsonify({'message': 'Username is required'}), 400
        global model
        global cnn_model
        global scaler
        global tfidf_description
        global tfidf_caption
        global cnn_y_pred
        global followercount
        from datetime import datetime
        global cookie_name, cookie_content, expiration_date_str

        loader = instaloader.Instaloader()
        expiration_date = datetime.strptime(
            expiration_date_str, "%d-%m-%Y %H:%M:%S")
        expiration_timestamp = expiration_date.timestamp()
        loader.context._session.cookies.set(
            cookie_name, cookie_content, expires=expiration_timestamp)

        profile_info = []
        # Load the profile
        print(f'Loading profile of @{username}...')
        profile = instaloader.Profile.from_username(loader.context, username)
        followercount = profile.followers

        profile_info.append({
            "username": username,
            "followers_count": profile.followers,
            "following_count": profile.followees,
            "bio": profile.biography,
            "is_verified": int(profile.is_verified)
        })

        profile_info_df = pd.DataFrame(profile_info)
        directory = '\data'
        if not os.path.exists(directory):
            os.makedirs(directory)
        print("before saving")
        csv_file_path = '\profile_data.csv'
        profile_info_df.to_csv(csv_file_path)
        print("after saving")

        profile_post_info = []
        one_year_ago = datetime.now() - timedelta(days=365)
        profile = instaloader.Profile.from_username(loader.context, username)

        posts = []
        count = 0
        num_posts = profile.mediacount
        if (num_posts > 100):
            num_posts = 100
        allposts = profile.get_posts()
        # if count >= 50 or post.date_utc < one_year_ago or post.likes < 0:
        for post in allposts:
            if count >= num_posts:
                break
            if post.likes < 0:
                continue

            if post.caption is None:
                caption = ''
            else:
                caption = post.caption

            posts.append({
                "username": username,
                "image_url": post.url,
                "like_count": post.likes,
                "comment_count": post.comments,
                "caption": caption,
                "post_date_utc": post.date_utc,
                "post_type": "Video" if post.is_video else "Image",
                "num_hashtags": len([tag.strip("#") for tag in caption.split() if tag.startswith("#")]) if caption else 0,
                "num_mentions": len([mention.strip("@") for mention in caption.split() if mention.startswith("@")]) if caption else 0
            })

            count += 1

        profile_post_info.append(posts)
        print("after post get")

        profile_post_info_flat_data = [
            item for sublist in profile_post_info for item in sublist]
        profile_post_info_df = pd.DataFrame(profile_post_info_flat_data)
        csv_file_path = '\post_data.csv'
        profile_post_info_df.to_csv(csv_file_path)
        input_file = '\profile_data.csv'
        profile_info_df = pd.read_csv(input_file)
        profile_info_df = profile_info_df.drop(columns=["Unnamed: 0"], axis=1)
        input_file = '\post_data.csv'
        profile_post_info_df = pd.read_csv(input_file)
        profile_post_info_df = profile_post_info_df.drop(
            columns=["Unnamed: 0"], axis=1)

        output_directory = '\images2'
        if os.path.exists(output_directory):
            for filename in os.listdir(output_directory):
                file_path = os.path.join(output_directory, filename)
                if os.path.isfile(file_path):
                    os.unlink(file_path)
        else:
            os.makedirs(output_directory)

        def download_image(row, output_directory):
            username = row["username"]
            image_url = row["image_url"]
            index = row.name  # Get the index of the row

            filename = os.path.join(
                output_directory, f"{username}_{index}.jpg")

            response = requests.get(image_url)
            if response.status_code == 200:
                image_file = open(filename, "wb")
                image_file.write(response.content)
                image_file.close()
                return filename
            else:
                return None
        print("downloading posts")
        # Initialize a counter for each user
        user_counters = {}

        # Initialize new column for filename
        profile_post_info_df["image_filename"] = None
        with concurrent.futures.ThreadPoolExecutor() as executor:
            results = [executor.submit(download_image, row, output_directory)
                       for _, row in profile_post_info_df.iterrows()]
        for future in concurrent.futures.as_completed(results):
            filename = future.result()
            if filename is not None:
                index = int(filename.split("_")[-1].split(".")[0])
                profile_post_info_df.at[index, "image_filename"] = filename
        print("after post download")
        stop_words = set(stopwords.words('english'))
        lemmatizer = WordNetLemmatizer()

        api_key = #replicate key

        client = replicate.Client(api_token=api_key)

        def generate_image_description(filepath):
            return client.run(
                "rmokady/clip_prefix_caption:9a34a6339872a03f45236f114321fb51fc7aa8269d38ae0ce5334969981e4cd8",
                input={"image": open(filepath, "rb")})
        profile_post_info_df["description"] = None
        print("generating descriptions........")

        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = []
            for _, row in profile_post_info_df.iterrows():
                filepath = row["image_filename"]
                if filepath is not None:
                    future = executor.submit(
                        generate_image_description, filepath)
                    futures.append((future, row.name))

            for future, row_index in futures:
                description = future.result()
                if description is not None:
                    profile_post_info_df.at[row_index,
                                            "description"] = description
        print("after description generated")

        csv_file_path = '\post_data_w_desc.csv'
        profile_post_info_df.to_csv(csv_file_path)
        input_file = '\post_data_w_desc.csv'
        profile_post_info_df = pd.read_csv(input_file)
        profile_post_info_df = profile_post_info_df.drop(
            columns=["Unnamed: 0"], axis=1)
        profile_post_info_df = profile_post_info_df[profile_post_info_df['like_count'] != -1.0]
        input_file = '\profile_data.csv'
        profile_info_df = pd.read_csv(input_file)
        profile_info_df = profile_info_df.drop(columns=["Unnamed: 0"], axis=1)

        final_df = pd.merge(profile_post_info_df,
                            profile_info_df, on='username', how='left')

        print("after final_df merging")

        def extract_name(location):
            if isinstance(location, str):
                match = re.search(r"name='(.*?)'", location)
                if match:
                    return match.group(1).lower()
            return ''

        def preprocess_text(text):
            if text is None:
                return ''

            if not isinstance(text, str):
                text = str(text)

            text = text.translate(str.maketrans('', '', string.punctuation))
            words = nltk.word_tokenize(text)
            words = [lemmatizer.lemmatize(word.lower()) for word in words if word.isalnum(
            ) and word.lower() not in stop_words]
            cleaned_text = ' '.join(words)
            if not cleaned_text.strip():  # Check if the cleaned text has any non-whitespace characters
                return '0' * len(text)

            return cleaned_text

        final_df['like_perc'] = round(
            (final_df['like_count']/final_df['followers_count'])*100, 2)
        final_df['post_date_utc'] = pd.to_datetime(final_df['post_date_utc'])
        final_df['hour_of_day'] = final_df['post_date_utc'].dt.hour
        final_df['day_of_week'] = final_df['post_date_utc'].dt.dayofweek
        final_df['is_image'] = (final_df['post_type'] == 'Image').astype(int)
        final_df.drop(columns=['post_type'], inplace=True)

        final_df['caption'] = final_df['caption'].apply(preprocess_text)
        final_df['description'] = final_df['description'].apply(preprocess_text)
        final_df['bio'] = final_df['bio'].apply(preprocess_text)
        scaler = StandardScaler()
        columns_to_scale = ['num_hashtags', 'num_mentions']
        final_df[columns_to_scale] = scaler.fit_transform(
            final_df[columns_to_scale])

        mean_like_perc = final_df['like_perc'].mean()
        std_like_perc = final_df['like_perc'].std()
        final_df = final_df[(final_df['like_perc'] >= mean_like_perc - 1.5 * std_like_perc)
                            & (final_df['like_perc'] <= mean_like_perc + 1.5 * std_like_perc)]
        user_final_df2 = final_df.copy()
        user_final_df2['post_date_utc'] = pd.to_datetime(
            user_final_df2['post_date_utc'])

        print("before group by generated")
        # user_final_df2 = user_final_df2.groupby('username', group_keys=False).apply(lambda x: x.sort_values('post_date_utc', ascending=True))
        user_final_df2 = user_final_df2.sort_values(
            by=['username', 'post_date_utc'], ascending=[True, True])

        user_final_df2['time_decay_factor'] = np.nan

        def calculate_decay_factor(group):
            n = len(group)
            lam = 0.1
            group['time_decay_factor'] = [
                math.exp(-lam * i) for i in range(n)][::-1]
            return group
        print("before decay factor")
        user_final_df2 = calculate_decay_factor(user_final_df2)

        user_final_df2['weighted_like_perc'] = user_final_df2['like_perc'] * user_final_df2['time_decay_factor']
        print("after user final df")
        print(user_final_df2.head())

        # Initialize TF-IDF Vectorizers for each column
        feature_size = 128
        tfidf_description = TfidfVectorizer(max_features=feature_size)
        tfidf_caption = TfidfVectorizer(max_features=feature_size)
        tfidf_description_matrix = tfidf_description.fit_transform(
            user_final_df2['description'])
        if not np.any(tfidf_description_matrix.toarray()):
            tfidf_description_df = pd.DataFrame(
                {'desc_0': [0] * len(user_final_df2)})
        else:
            tfidf_description_df = pd.DataFrame(tfidf_description_matrix.toarray(
            ), columns=[f'desc_{i}' for i in range(tfidf_description_matrix.shape[1])])
        tfidf_caption_matrix = tfidf_caption.fit_transform(
            user_final_df2['caption'])
        if not np.any(tfidf_caption_matrix.toarray()):
            tfidf_caption_df = pd.DataFrame(
                {'caption_0': [0] * len(user_final_df2)})
        else:
            tfidf_caption_df = pd.DataFrame(tfidf_caption_matrix.toarray(), columns=[
                                            f'caption_{i}' for i in range(tfidf_caption_matrix.shape[1])])

        tfidf_description_df.index = user_final_df2.index
        tfidf_caption_df.index = user_final_df2.index
        print("before cleaned final df")

        cleaned_final_df = pd.concat(
            [user_final_df2, tfidf_description_df, tfidf_caption_df], axis=1)

        print("after preprocessing")
        scoring_size = 1
        scoring_df = cleaned_final_df.tail(scoring_size).copy()
        final_main_df = cleaned_final_df.iloc[:-scoring_size].copy()
        X = final_main_df.drop(['like_count', 'username', 'image_url', 'post_date_utc', 'image_filename', 'like_perc', 'comment_count',
                               'weighted_like_perc', 'description', 'caption', 'bio', 'followers_count', 'following_count', 'is_verified'], axis=1)
        y = final_main_df['weighted_like_perc']
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.1, random_state=42)

        print("after train test split")
        xgb_model = XGBRegressor()
        param_grid = {
            'n_estimators': [300, 250],
            'learning_rate': [0.3, 0.2],
            'max_depth': [4, 3], }
        grid_search = GridSearchCV(estimator=xgb_model, param_grid=param_grid,
                                   cv=8, scoring='neg_root_mean_squared_error', verbose=1)

        grid_search.fit(X_train, y_train)
        model = grid_search.best_estimator_
        y_pred = model.predict(X_test)
        y_pred = np.round(y_pred, 6)
        mse = mean_squared_error(y_test, y_pred)
        rmse = np.sqrt(mse)
        mae = mean_absolute_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)

        print(f"Mean Squared Error (MSE): {mse}")
        print(f"Root Mean Squared Error (RMSE): {rmse}")
        print(f"Mean Absolute Error (MAE): {mae}")
        print(f"R-squared (R2) Score: {r2}")
        print(f"Best hyperparameters: {grid_search.best_params_}")

        cnn_model = Sequential([
            Dense(32, activation='relu', input_dim=X_train.shape[1]),
            Dense(64, activation='relu'),
            Dense(64, activation='relu'),
            Dense(1)])

        cnn_model.compile(optimizer='adam',
                          loss='mean_squared_error', metrics=['mae', 'mse'])
        history = cnn_model.fit(
            X_train, y_train, epochs=10, validation_data=(X_test, y_test))
        cnn_y_pred = cnn_model.predict(X_test)
        mse, mae, _ = cnn_model.evaluate(X_test, y_test)
        print(f"Mean Squared Error (MSE): {mse}")
        print(f"Mean Absolute Error (MAE): {mae}")
        y_pred = y_pred.ravel()

        if 'pred_like_perc' in scoring_df.columns:
            scoring_df['pred_like_perc'] = model.predict(scoring_df.drop(['like_count', 'pred_like_perc', 'username', 'image_url', 'comment_count', 'post_date_utc',
                                                         'image_filename', 'like_perc', 'weighted_like_perc', 'description', 'caption', 'bio', 'followers_count', 'following_count', 'is_verified'], axis=1))
        else:
            scoring_df['pred_like_perc'] = model.predict(scoring_df.drop(['like_count', 'username', 'image_url', 'comment_count', 'post_date_utc', 'image_filename',
                                                         'like_perc', 'weighted_like_perc', 'description', 'caption', 'bio', 'followers_count', 'following_count', 'is_verified'], axis=1))

        original_cnn_likes = cnn_model.predict(scoring_df.drop(['like_count', 'pred_like_perc', 'username', 'image_url', 'comment_count', 'post_date_utc',
                                               'image_filename', 'like_perc', 'weighted_like_perc', 'description', 'caption', 'bio', 'followers_count', 'following_count', 'is_verified'], axis=1))

        def human_format(num):
            magnitude = 0
            while abs(num) >= 1000:
                magnitude += 1
                num /= 1000.0
            return '{:.1f}{}'.format(num, ['', 'K', 'M'][magnitude])
        realikes = (scoring_df['like_perc']*scoring_df['followers_count'])/100
        realikes_f = realikes.apply(human_format)
        pred_likes = (scoring_df['pred_like_perc'] *
                      scoring_df['followers_count'])/100
        pred_likes_f = pred_likes.apply(human_format)

        return jsonify({'message': str(pred_likes_f.values[0])})

    except Exception as e:
        print("Error")
        print(str(e))
        return jsonify({'message ': str(e)}), 400


@app.route('/new_likes', methods=['POST'])
def new_likes():
    try:
        print('getting data......')
        data = request.form.get('data')
        json_data = json.loads(data)
        caption = json_data.get('caption')
        datetime_str = json_data.get('datetime_utc')
        datetime_obj = datetime.fromisoformat(datetime_str)
        datetime_utc = datetime_obj.astimezone(timezone.utc)
        image_file = request.files.get('image')
        if image_file:
            image_filename = secure_filename(image_file.filename)
            image_path = os.path.join(
                '\data\\', image_filename)
            image_file.save(image_path)

        is_image = 1
        # Get the day of the week (0 = Monday, 1 = Tuesday, ..., 6 = Sunday)
        day_of_week = datetime_utc.weekday()
        # Get the hour of the day (0 to 23)
        hour_of_day = datetime_utc.hour
        num_hashtagss = len([tag.strip("#") for tag in caption.split(
        ) if tag.startswith("#")]) if caption else 0
        num_mentionss = len([mention.strip(
            "@") for mention in caption.split() if mention.startswith("@")]) if caption else 0

        realpred_df = pd.DataFrame()

        api_key = #replicate secret key

        client = replicate.Client(api_token=api_key)

        def generate_image_description(filepath):
            return client.run(
                "rmokady/clip_prefix_caption:9a34a6339872a03f45236f114321fb51fc7aa8269d38ae0ce5334969981e4cd8",
                input={"image": open(filepath, "rb")})
        print('generating desciption')
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(generate_image_description, image_path)
            description = future.result()

        if description is not None:
            print(f"Generated description for {image_path}: {description}")
        data = {'username': ["username"],
                'num_hashtags': [num_hashtagss],
                'num_mentions': [num_mentionss],
                'hour_of_day': [hour_of_day],
                'day_of_week': [day_of_week],
                'is_image': [is_image],
                'description': [description],
                'caption': [caption]
                }
        realpred_df = pd.DataFrame(data)
        stop_words = set(stopwords.words('english'))
        lemmatizer = WordNetLemmatizer()

        def preprocess_text(text):
            if text is None:
                return ''

            if not isinstance(text, str):
                text = str(text)

            text = text.translate(str.maketrans('', '', string.punctuation))
            words = nltk.word_tokenize(text)
            words = [lemmatizer.lemmatize(word.lower()) for word in words if word.isalnum(
            ) and word.lower() not in stop_words]
            cleaned_text = ' '.join(words)
            if not cleaned_text.strip():
                return '0' * len(text)

            return cleaned_text

        def calculate_decay_factor(group):
            n = len(group)
            lam = 0.1
            group['time_decay_factor'] = [
                math.exp(-lam * i) for i in range(n)][::-1]
            return group
        columns_to_scale = ['num_hashtags', 'num_mentions']
        realpred_df[columns_to_scale] = scaler.transform(
            realpred_df[columns_to_scale])
        realpred_df['time_decay_factor'] = np.nan
        realpred_df = realpred_df.groupby(
            'username', group_keys=False).apply(calculate_decay_factor)

        tfidf_description_matrix = tfidf_description.transform(
            realpred_df['description'])
        tfidf_caption_matrix = tfidf_caption.transform(realpred_df['caption'])
        tfidf_description_df = pd.DataFrame(tfidf_description_matrix.toarray(
        ), columns=[f'desc_{i}' for i in range(tfidf_description_matrix.shape[1])])
        tfidf_caption_df = pd.DataFrame(tfidf_caption_matrix.toarray(), columns=[
                                        f'caption_{i}' for i in range(tfidf_caption_matrix.shape[1])])
        tfidf_description_df.index = realpred_df.index
        tfidf_caption_df.index = realpred_df.index

        realpred_df = pd.concat(
            [realpred_df, tfidf_description_df, tfidf_caption_df], axis=1)
        realpred_df.to_csv(
            'C:\\Users\\user\\Desktop\\instanext\\server\\data\\realpred.csv')
        realpred_likes = model.predict(realpred_df.drop(
            ['username', 'description', 'caption'], axis=1))
        realpred_likes = realpred_likes.ravel()
        print(realpred_likes)
        cnn_likes = cnn_model.predict(realpred_df.drop(
            ['username', 'description', 'caption'], axis=1))
        cnn_likes = cnn_likes.ravel()
        print(cnn_likes)

        def human_format(num):
            magnitude = 0
            while abs(num) >= 1000:
                magnitude += 1
                num /= 1000.0
            return '{:.1f}{}'.format(num, ['', 'K', 'M'][magnitude])

        original_cnn_likes = np.mean(cnn_y_pred)
        final_likes = realpred_likes+(cnn_likes-original_cnn_likes)
        final_likes = (final_likes*followercount)/100
        final_likes_f = human_format(final_likes[0])

        return jsonify({'message': final_likes_f})

    except Exception as e:
        print("Error")
        print(str(e))
        return jsonify({'message ': str(e)}), 400


@app.route('/get_profile/<username>', methods=['GET'])
def get_profile(username):
    try:
        global instapage
        global loader
        global profile
        global cookie_name, cookie_content, expiration_date_str

        loader = instaloader.Instaloader()
        expiration_date = datetime.strptime(
            expiration_date_str, "%d-%m-%Y %H:%M:%S")
        expiration_timestamp = expiration_date.timestamp()

        loader.context._session.cookies.set(
            cookie_name, cookie_content, expires=expiration_timestamp)
        profile = instaloader.Profile.from_username(loader.context, username)
        followersno = profile.followers
        followeesno = profile.followees
        instapage = profile.username
        bio = profile.biography
        if profile.is_private:
            private = 1
        else:
            private = 0
        postcount = profile.mediacount
        loader.download_profile(username, profile_pic_only=True)
        new_images_folder = '\images3'
        downloaded_image_path = None
        for filename in os.listdir(username):
            if filename.endswith('_UTC_profile_pic.jpg'):
                downloaded_image_path = os.path.join(username, filename)
                break

        if not downloaded_image_path:
            raise FileNotFoundError("Downloaded image not found")

        destination_path = os.path.join(new_images_folder, f'{username}.jpg')
        if not os.path.exists(new_images_folder):
            os.makedirs(new_images_folder)
        shutil.move(downloaded_image_path, destination_path)
        with open(destination_path, "rb") as img_file:
            image_data = base64.b64encode(img_file.read()).decode('utf-8')


        profile_data_df = pd.DataFrame({
            'followeesno': [followeesno],
            'bio': [bio],
            'private': [private],
            'postcount': [postcount]
        })

        # Convert DataFrame to dictionary
        profile_data_dict = profile_data_df.to_dict(orient='records')

        return jsonify({'data': profile_data_dict})
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@app.route('/profile_followers', methods=['GET'])
def profile_followers():
    profile = instaloader.Profile.from_username(loader.context, instapage)
    followersno = profile.followers
    return jsonify({'message': followersno})


@app.route('/profile_likes', methods=['GET'])
def profile_likes():
    try:
        today = datetime.now()

        one_month_ago = today - timedelta(days=30)
        six_months_ago = today - timedelta(days=180)

        month_likes = 0
        month_posts = 0
        sixmonth_likes = 0
        sixmonth_posts = 0
        all_likes = 0
        all_posts = 0
        monthavg = 0
        sixmonthavg = 0
        allavg = 0

        for post in profile.get_posts():
            all_posts += 1
            all_likes += post.likes
            if post.date > one_month_ago:
                month_posts += 1
                month_likes += post.likes
            if post.date > six_months_ago:
                sixmonth_posts += 1
                sixmonth_likes += post.likes

        if month_posts > 0:
            monthavg = month_likes / month_posts
        else:
            monthavg = 0

        if sixmonth_posts > 0:
            sixmonthavg = sixmonth_likes / sixmonth_posts
        else:
            sixmonthavg = 0

        if all_posts > 0:
            allavg = all_likes / all_posts
        else:
            allavg = 0

        response = {
            'last_month': {
                'total_posts': month_posts,
                'total_likes': month_likes,
                'average_likes_per_post': monthavg
            },
            'last_six_months': {
                'total_posts': sixmonth_posts,
                'total_likes': sixmonth_likes,
                'average_likes_per_post': sixmonthavg
            },
            'all_time': {
                'total_posts': all_posts,
                'total_likes': all_likes,
                'average_likes_per_post': allavg
            }
        }
        return jsonify(response)
    except Exception as e:
        return {'message': str(e)}, 500


@app.route('/profile_engagement2', methods=['GET'])
def profile_engagement2():
    try:
        posts = profile.get_posts()
        post_data = []

        for post in posts:
            post_data.append({
                'post': post,
                'likes': post.likes
            })

        df = pd.DataFrame(post_data)

        total_posts = profile.mediacount
        recent_index = int(0.01 * total_posts)  
        older_index = int(0.05 * total_posts)  
        recent_likes = 0
        older_likes = 0

        def calculate_decay_factor(group):
            n = len(df)
            lam = 0.1  
            time_decay_factors = [1 / (1 + lam * i) for i in range(n)]
            df['time_decay_factor'] = time_decay_factors 
            return df
        # print("before decay factor")
        df = calculate_decay_factor(df)
        # print("after decay factor")

        recent_posts = df.head(recent_index)
        older_posts = df.iloc[recent_index:recent_index +
                              (older_index - recent_index)]

        recent_likes = np.sum(
            recent_posts['likes'] * recent_posts['time_decay_factor'])
        older_likes = np.sum(
            older_posts['likes'] * older_posts['time_decay_factor'])
        if recent_index > 0:
            avg_likes_recent = recent_likes / recent_index
        else:
            avg_likes_recent = 0

        if older_index > recent_index:
            avg_likes_older = older_likes / (older_index - recent_index)
        else:
            avg_likes_older = 0

        if avg_likes_older != 0:
            percent_change = (
                (avg_likes_recent - avg_likes_older) / avg_likes_older) * 100
        else:
            percent_change = 0

        if percent_change > 0:
            result = "increasing"
        elif percent_change < 0:
            result = "decreasing"
        else:
            result = "stable"

        return jsonify({
            'result': result,
            'percent_change': percent_change
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/profile_hashtags', methods=['GET'])
def profile_hashtags():
    try:
        hashtags = []
        for post in profile.get_posts():
            hashtags.extend(post.caption_hashtags)

        hashtag_counts = Counter(hashtags)
        top_hashtags = hashtag_counts.most_common(5)
        response_data = [{'hashtag': hashtag, 'count': count}
                         for hashtag, count in top_hashtags]

        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    # app.run(debug=True, port=8080)
    app.run(debug=False, port=8080, use_reloader=False)
