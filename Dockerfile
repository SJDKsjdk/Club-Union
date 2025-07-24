FROM python:3.13.5 AS builder

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1
WORKDIR /app

RUN python -m venv .venv
COPY requirements.txt ./
RUN .venv/bin/pip install -r requirements.txt

FROM python:3.13.5-slim
WORKDIR /app
COPY --from=builder /app/.venv .venv/
COPY . .

# Flask 앱 파일 지정
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# 직접 python으로 실행하는 방식으로 변경
CMD ["/app/.venv/bin/python", "app.py"]