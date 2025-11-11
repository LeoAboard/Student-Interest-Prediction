import pandas as pd
from flask import Flask, request, jsonify
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()

user = os.getenv("BD_USER")
password = os.getenv("BD_PASS")
host = os.getenv("BD_HOST")
port = os.getenv("BD_PORT")
database = os.getenv("BD_NAME")

engine = create_engine(f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{database}")

query = "SELECT "

#to-do
#gerar gráfico de pizza sobre número de alunos interessados por curso
#gerar gráfico sobre número de alunos por cidade
#gerar gráfico pizza sobre redes sociais preferidas
#gerar gráfico sobre número de alunos por sexo e idade
#FILTROS DE GRÁFICOS: INSTITUIÇÃO E ANO DE COLETA

