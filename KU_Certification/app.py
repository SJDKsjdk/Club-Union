import os
from flask import Flask, request, render_template, redirect, url_for, session, flash
from flask_session import Session
import sqlite3
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'ehddkfldusgkqghl45_1234')
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

DATABASE_URL = os.environ.get('DATABASE_URL')

def get_db():
    try:
        if not DATABASE_URL:
            return sqlite3.connect('students.db')
        
        import psycopg2
        db_url = DATABASE_URL
        if db_url.startswith('postgres://'):
            db_url = db_url.replace('postgres://', 'postgresql://', 1)
        
        return psycopg2.connect(db_url, sslmode='require')
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def init_db():
    conn = get_db()
    if not conn:
        return
        
    cur = conn.cursor()
    
    try:
        cur.execute('''
        CREATE TABLE IF NOT EXISTS students (
            student_num TEXT PRIMARY KEY,
            department TEXT,
            name TEXT,
            birth_date TEXT,
            club_info TEXT
        )
        ''')
        
        sample_data = [
            ('2024123456', '글로벌비즈니스대학 융합경영학부 디지털경영전공', '홍길동', '2000-01-01', '전시창작분과 애드존'),
            ('2024789012', '과학기술대학 컴퓨터융합소프트웨어학과', '김철수', '2001-02-02', '학술분과 프로그래밍동아리'),
            ('2024345678', '문화스포츠대학 국제스포츠학부', '이영희', '1999-03-03', '체육분과 축구동아리'),
            ('2023390822', '글로벌비즈니스대학 융합경영학부 디지털경영전공', '장선규', '2004-06-16', '전시창작분과 애드존'),
        ]
        
        placeholder = '%s' if DATABASE_URL else '?'
        insert_query = f'''
        INSERT INTO students (student_num, department, name, birth_date, club_info)
        VALUES ({placeholder}, {placeholder}, {placeholder}, {placeholder}, {placeholder})
        '''
        
        if DATABASE_URL:
            insert_query += ' ON CONFLICT (student_num) DO NOTHING'
        else:
            insert_query = insert_query.replace('INSERT INTO', 'INSERT OR IGNORE INTO')
            
        for data in sample_data:
            cur.execute(insert_query, data)
                
        conn.commit()
    except Exception as e:
        print(f"Database initialization error: {e}")
    finally:
        cur.close()
        conn.close()

with app.app_context():
    init_db()

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        student_num = request.form['student_num']
        name = request.form['name']
        
        try:
            conn = get_db()
            if not conn:
                flash('데이터베이스 연결 오류가 발생했습니다.')
                return redirect(url_for('login'))
                
            cur = conn.cursor()
            
            placeholder = '%s' if DATABASE_URL else '?'
            query = f'SELECT * FROM students WHERE student_num = {placeholder} AND name = {placeholder}'
            
            cur.execute(query, (student_num, name))
            student = cur.fetchone()
            
            cur.close()
            conn.close()
            
            if student:
                today = datetime.now().strftime('%Y년 %m월 %d일')
                return render_template('certificate.html', student=student, today=today)
            else:
                flash('학번 또는 이름이 일치하지 않습니다.')
                return redirect(url_for('login'))
                
        except Exception as e:
            print(f"Database error: {e}")
            flash('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
            return redirect(url_for('login'))
            
    return render_template('login.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)