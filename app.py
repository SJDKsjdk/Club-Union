from flask import Flask

app = Flask(__name__)

@app.route('/')
def main():
    return "서버가 실행 중입니다."

if __name__ == '__main__':
    app.run(debug=True, port=5002)