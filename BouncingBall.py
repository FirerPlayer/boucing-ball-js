from flask import Flask, render_template

mainApp = Flask(__name__)

@mainApp.route('/')
def game():
    return render_template(['game.html'])

if __name__ == '__main__':
    mainApp.run(debug=True)