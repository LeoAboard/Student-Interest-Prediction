import pandas as pd
from flask import Flask, request, jsonify
from sqlalchemy import text
import os
import psycopg2
from datetime import datetime
from database import engine
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import io
import base64

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
    rede_social = data.get('redes_sociais')
    turno = data.get('turno')
    localizacao = data.get('localizacao')
    enem = data.get('enem')

    params = {}
    if(data_limite != '-1'):
        data_limite_sup = datetime(int(data_limite), 1, 1).date()
        data_limite_inf = datetime(int(data_limite), 12, 31).date()
        params['data_limite_sup'] = data_limite_sup
        params['data_limite_inf'] = data_limite_inf

    if(contagem):
        return contagem_alunos(params)
    elif(rede_social):
        return contagem_rede_social(params)
    elif(localizacao):
        return contagem_cidade(params)
    elif(turno):
        return contagem_turno(params)
    elif(enem):
        return contagem_enem(params)

    return "erro"

def contagem_alunos(params):
    query = "SELECT COUNT(*) FROM aluno"

    if(params):
        query += " WHERE data_cadastro BETWEEN :data_limite_sup AND :data_limite_inf"

    with engine.connect() as connection:
        result = connection.execute(text(query), params)
        df = pd.DataFrame(result.fetchall(), columns=result.keys())

    return(df.to_json(orient='records'))

def contagem_rede_social(params):
    query = "SELECT p.rede_social, COUNT(*) as total FROM preferencia p JOIN aluno a ON p.aluno_id = a.id"

    if(params):
        query += " WHERE data_cadastro BETWEEN :data_limite_sup AND :data_limite_inf GROUP BY rede_social"

    with engine.connect() as connection:
        result = connection.execute(text(query), params)
        df = pd.DataFrame(result.fetchall(), columns=result.keys())

    fig, ax = plt.subplots(figsize=(8, 5))
    ax.bar(df["rede_social"], df["total"])
    ax.set_title("Quantidade por Rede Social")
    ax.set_xlabel("Rede Social")
    ax.set_ylabel("Total")
    plt.tight_layout()

    buf = io.BytesIO()
    fig.savefig(buf, format="png")
    plt.close(fig)
    buf.seek(0)

    img_b64 = base64.b64encode(buf.read()).decode("ascii")

    return jsonify({"image": img_b64})

def contagem_cidade(params):
    return

def contagem_turno(params):
    return

def contagem_enem(params):
    return