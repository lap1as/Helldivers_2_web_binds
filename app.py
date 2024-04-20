from flask import Flask, render_template
import keyboard  # Install the keyboard package via pip

app = Flask(__name__)

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle keyboard events
@app.route('/press_key/<key>')
def press_key(key):
    keyboard.press(key)
    return 'Key pressed: {}'.format(key)

@app.route('/release_key/<key>')
def release_key(key):
    keyboard.release(key)
    return 'Key released: {}'.format(key)

if __name__ == '__main__':
    app.run(debug=True)
