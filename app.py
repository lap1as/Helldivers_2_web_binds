from flask import Flask, render_template, request
import pyautogui
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
@app.route('/press_stratagem/<stratagem_name>')
def press_stratagem(stratagem_name):
    # Load the stratagems configuration
    with open('static/divConfig/stratagemsConfig.json') as f:
        stratagems = json.load(f)

    # Find the stratagem with the given name
    for stratagem in stratagems:
        if stratagem['name'] == stratagem_name:
            # Press and hold the ctrl key
            pyautogui.keyDown('ctrl')

            # Press the keys in the bind
            for key in stratagem['bind'].split(', '):
                pyautogui.press(key)
                print(key)

            # Release the ctrl key
            pyautogui.keyUp('ctrl')

            return 'Stratagem activated: {}'.format(stratagem_name)

    return 'Stratagem not found: {}'.format(stratagem_name), 404

@app.route('/save_image_paths', methods=['POST'])
def save_image_paths():
    # Get the image paths from the request data
    image_paths = request.get_json().get('imagePaths')

    # Write the image paths to a file in the static directory
    with open('static/divConfig/imagePaths.json', 'w') as f:
        json.dump(image_paths, f)
    return 'Success'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)
