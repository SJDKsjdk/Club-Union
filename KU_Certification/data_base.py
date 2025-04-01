import sqlite3

conn = sqlite3.connect('/Users/jangseongyu/Library/Mobile Documents/com~apple~CloudDocs/Dev/45th_project/students.db')
cursor = conn.cursor()

cursor.execute('''
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
]

cursor.executemany('''
INSERT OR REPLACE INTO students (student_num, department, name, birth_date, club_info)
VALUES (?, ?, ?, ?, ?)
''', sample_data)

conn.commit()
conn.close()

print("데이터베이스가 성공적으로 초기화되었습니다.")