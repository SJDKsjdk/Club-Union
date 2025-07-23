from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')
    
@app.route('/clubs')
def clubs():
    return render_template('clubs.html')

@app.route('/introduce')
def introduce():
    return render_template('introduce.html')

@app.route('/logo')
def logo():
    return render_template('logo.html')

@app.route('/help')
def help():
    return render_template('help.html')

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

@app.route('/semi')
def semi():
    return render_template('semi.html')

@app.route('/concerto')
def concerto():
    return render_template('concerto.html')

@app.route('/aram')
def aram():
    return render_template('aram.html')

@app.route('/nongak')
def nongak():
    return render_template('nongak.html')

@app.route('/seoktop')
def seoktop():
    return render_template('seoktop.html')

@app.route('/ccc')
def ccc():
    return render_template('ccc.html')

@app.route('/yesu')
def yesu():
    return render_template('yesu.html')

@app.route('/buddha')
def buddha():
    return render_template('buddha.html')

@app.route('/dagachi')
def dagachi():
    return render_template('dagachi.html')

@app.route('/basket')
def basket():
    return render_template('basket.html')

@app.route('/base')
def base():
    return render_template('base.html')

@app.route('/kusma')
def kusma():
    return render_template('kusma.html')

@app.route('/kubc')
def kubc():
    return render_template('kubc.html')

@app.route('/kutt')
def kutt():
    return render_template('kutt.html')

@app.route('/high')
def high():
    return render_template('high.html')

@app.route('/up')
def up():
    return render_template('up.html')

@app.route('/sulmak')
def sulmak():
    return render_template('sulmak.html')

@app.route('/muho')
def muho():
    return render_template('muho.html')

@app.route('/adzone')
def adzone():
    return render_template('adzone.html')

@app.route('/seohwa')
def seohwa():
    return render_template('seohwa.html')

@app.route('/green')
def green():
    return render_template('green.html')

@app.route('/yeongsang')
def yeongsang():
    return render_template('yeongsang.html')

@app.route('/kloset')
def kloset():
    return render_template('kloset.html')
    
@app.route('/mmc')
def mmc():
    return render_template('mmc.html')

@app.route('/time')
def time():
    return render_template('time.html')

@app.route('/news')
def news():
    return render_template('news.html')

@app.route('/mana')
def mana():
    return render_template('mana.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)