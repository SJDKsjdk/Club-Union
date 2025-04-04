from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')
    
@app.route('/clubs')
def clubs():
    return render_template('clubs.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)