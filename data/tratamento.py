import pandas as pd
from flask import Flask, request, jsonify
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()
app = Flask(__name__)
@app.route("/processar", methods=["POST"])

def processar():
    data_limite = request.get_json()['ano_limite']

    user = os.getenv("BD_USER")
    password = os.getenv("BD_PASS")
    host = os.getenv("BD_HOST")
    port = os.getenv("BD_PORT")
    database = os.getenv("BD_NAME")

    engine = create_engine(f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{database}")

    query = "SELECT nome FROM aluno WHERE data_cadastro <= %(data_limite)s"
    df = pd.read_sql(query, engine, params={"data_limite": data_limite})

    return jsonify(df.to_dict(orient="records"))

    #to-do
    #gerar gráfico de pizza sobre número de alunos interessados por curso
    #gerar gráfico sobre número de alunos por cidade
    #gerar gráfico pizza sobre redes sociais preferidas
    #gerar gráfico sobre número de alunos por sexo e idade
    #FILTROS DE GRÁFICOS: INSTITUIÇÃO E ANO DE COLETA

if __name__ == "__main__":
    app.run(port=os.getenv("PORT_FLASK"))

