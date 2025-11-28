import pandas as pd
from flask import Flask, request, jsonify
from sqlalchemy import text
import os
import psycopg2
from datetime import datetime
from database import engine

SECRET = os.environ.get('SERVICE_TOKEN')

app = Flask(__name__)
@app.route("/data", methods=["POST"])

def triagem():
    auth = request.headers.get('Authorization', '')
    if(auth != SECRET):
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.get_json()
    data_limite = data.get('ano_limite')
    contagem = data.get('contagem')
    redes_sociais = data.get('redes_sociais')

    params = {}
    if(data_limite != '-1'):
        data_limite_sup = datetime(int(data_limite), 1, 1).date()
        data_limite_inf = datetime(int(data_limite), 12, 31).date()
        params['data_limite_sup'] = data_limite_sup
        params['data_limite_inf'] = data_limite_inf

    if(contagem):
        return contagem_alunos(params)
    if(redes_sociais):
        return contagem_rede_social(params)

    return "erro"

def contagem_alunos(params):
    query = "SELECT COUNT(*) FROM aluno"

    if(params):
        query += " WHERE data_nascimento BETWEEN :data_limite_sup AND :data_limite_inf"

    with engine.connect() as connection:
        result = connection.execute(text(query), params)
        df = pd.DataFrame(result.fetchall(), columns=result.keys())

    return(df.to_json(orient='records'))

def contagem_rede_social(params):
    query = "SELECT rede_social FROM preferencia"

    if(params):
        query += " AND data_nascimento BETWEEN :data_limite_sup AND :data_limite_inf"

    with engine.connect() as connection:
        result = connection.execute(text(query), params)
        df = pd.DataFrame(result.fetchall(), columns=result.keys())

    return(df.to_json(orient='records'))

