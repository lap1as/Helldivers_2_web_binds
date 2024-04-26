from flask import Flask, render_template, request
import keyboard
import json

app = Flask(__name__)


# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/selection')  # Define the '/selection' endpoint
def selection():
    return render_template('selection/index.html')


# Route to handle keyboard events
@app.route('/press_key/<key>')
def press_key(key):
    keyboard.press(key)
    return 'Key pressed: {}'.format(key)


@app.route('/save_image_paths', methods=['POST'])
def save_image_paths():
    # Get the image paths from the request data
    image_paths = request.get_json().get('imagePaths')

    # Write the image paths to a file
    with open('imagePaths.json', 'w') as f:
        json.dump(image_paths, f)
    return 'Success'


@app.route('/remove_image_paths', methods=['POST'])
def remove_image_paths():
    # Get the image paths from the request data
    data = request.get_json()
    image_paths_to_remove = data.get('imagePaths', [])

    # Read the existing data from the file
    with open('imagePaths.json', 'r') as f:
        try:
            existing_data = json.load(f)
        except json.JSONDecodeError:
            existing_data = []

    # Remove the image paths
    existing_data = [path for path in existing_data if path not in image_paths_to_remove]

    # Write the data back to the file
    with open('imagePaths.json', 'w') as f:
        json.dump(existing_data, f)
    return 'Success'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
