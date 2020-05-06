import os
from flask import Flask, send_from_directory, jsonify, request
from werkzeug.utils import secure_filename
from flask_cors import CORS
from turtle import Turtle
from pathlib import Path

Path("./uploads").mkdir(parents=True, exist_ok=True)
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'txt'}

app = Flask(__name__, static_folder='./ReactApp/build', static_url_path='/')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}}) # to enable server access during development in React

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def home():
	return app.send_static_file('index.html')

@app.route('/uploader', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'msg' : 'No file part'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'msg' : 'No selected file'}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            newTurtle = Turtle([0, 0], [(0, 0)], 0)
            with open(os.path.join(app.config['UPLOAD_FOLDER'], filename), "r") as direction:
                line = direction.readline()
            if newTurtle.followDirection(line) == 'Sucsess' :
                os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                return jsonify({'locationHistory' : newTurtle.locationHistory, 'duplicates' : newTurtle.duplicates()}), 200
            else:
                os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                return jsonify({'msg' : 'Invalid Character(s) in Text File.\nText File should contain only F, L, and R characters with no space'}), 400
        else:
            return jsonify({'msg' : 'Invalid File Extension.\nYou can upload only .txt File'}), 400

if __name__ == '__main__':
    app.run(debug=True)