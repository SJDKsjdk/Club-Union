from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')
    
@app.route('/clubs')
def clubs():
    return render_template('clubs.html')

@app.route('/soma')
def soma():
    return render_template('soma.html')

@app.route('/mudan')
def mudan():
    return render_template('mudan.html')

@app.route('/kasting')
def kasting():
    return render_template('kasting.html')

@app.route('/sum')
def sum():
    return render_template('sum.html')

@app.route('/beat')
def beat():
    return render_template('beat.html')

@app.route('/rooters')
def rooters():
    return render_template('rooters.html')

@app.route('/udf')
def udf():
    return render_template('udf.html')

@app.route('/star')
def star():
    return render_template('star.html')

@app.route('/icarus')
def icarus():
    return render_template('icarus.html')

@app.route('/underdog')
def underdog():
    return render_template('underdog.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)