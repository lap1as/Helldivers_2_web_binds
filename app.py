from flask import Flask, render_template
import keyboard

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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
