import pandas as pd
from flask import Flask, request, jsonify
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
import psycopg2
from datetime import datetime

SECRET = os.environ.get('SERVICE_TOKEN')

load_dotenv()

BD_USER = os.getenv("BD_USER")
BD_PASS = os.getenv("BD_PASS")
HOST = os.getenv("HOST")
BD_PORT = os.getenv("BD_PORT")
BD_NAME = os.getenv("BD_NAME")

app = Flask(__name__)
engine = create_engine(
    f"postgresql+psycopg2://{BD_USER}:{BD_PASS}@{HOST}:{BD_PORT}/{BD_NAME}"
)

@app.route("/data", methods=["POST"])
# def handle_data():
#     return processar_graficos()

def processar_graficos():
    auth = request.headers.get('Authorization', '')
    if(auth != SECRET):
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.get_json()
    date_str = data.get('ano_limite')

    with engine.connect() as connection:
        query = text("SELECT * FROM aluno WHERE id > 2")
        result = connection.execute(query)
        df = pd.DataFrame(result.fetchall(), columns=result.keys())

    return(df.to_json(orient='records'))

