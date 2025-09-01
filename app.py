# 2025.07.24
from flask import Flask, render_template, send_from_directory, request, jsonify
import os
from dotenv import load_dotenv
import requests
import json

app = Flask(__name__, 
            static_folder='static',
            static_url_path='/static')

# 정적 파일 캐싱 설정 (선택사항)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 3600

# 라우트 핸들러를 한 곳에 모으는 것이 좋습니다.
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

@app.route('/history')
def history():
    return render_template('history.html')

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

@app.route('/sjdkllm')
def sjdkllm():
    return render_template('sjdkllm.html')

# notice.json 파일 로드
try:
    with open("/static/notice.json", "r", encoding="utf-8") as f:
        notices = json.load(f)
except FileNotFoundError: 
    print("notice.json 파일을 찾을 수 없습니다. 경로를 확인해 주세요.")
    notices = []


@app.route('/notice-ai', methods=['POST'])
def notice_ai():
    data = request.json
    user_input = data.get("message", "")

    # 관련 공지를 찾아 프롬프트에 포함시킵니다.
    related_notices = [n for n in notices if any(w in n for w in user_input.split())]
    related_text = "\n".join(related_notices[:3])

    # Gemini API를 위한 환경 변수 로드
    load_dotenv()
    google_api_key = os.getenv("GOOGLE_API_KEY")

    if not google_api_key:
        print("Gemini API 키를 찾을 수 없습니다. .env 파일을 확인해 주세요.")
        return jsonify({"reply": "AI 응답을 가져오는 데 문제가 발생했습니다. API 키가 설정되지 않았습니다."}), 500

    # Gemini API 호출을 위한 URL
    gemini_api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key={google_api_key}"

    # Gemini API에 전달할 페이로드
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": f"다음은 학생회 공지입니다. 참고 공지를 바탕으로 새로운 공지 초안을 작성해주세요.\n\n참고 공지:\n{related_text}\n\n새 요청: {user_input}"
                    }
                ]
            }
        ]
    }
    
    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(gemini_api_url, headers=headers, json=payload)
        response.raise_for_status() # HTTP 오류가 발생하면 예외를 발생시킵니다.
        
        reply = response.json()["candidates"][0]["content"]["parts"][0]["text"]

    except requests.exceptions.RequestException as e:
        print(f"API 호출 중 오류 발생: {e}")
        return jsonify({"reply": "AI 응답을 가져오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."}), 500

    return jsonify({"reply": reply})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)