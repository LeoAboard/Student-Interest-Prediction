from sqlalchemy import create_engine
import os

BD_USER = os.environ.get("BD_USER")
BD_PASS = os.environ.get("BD_PASS")
HOST = os.environ.get("HOST")
BD_PORT = os.environ.get("BD_PORT")
BD_NAME = os.environ.get("BD_NAME")

engine = create_engine(
    f"postgresql+psycopg2://{BD_USER}:{BD_PASS}@{HOST}:{BD_PORT}/{BD_NAME}"
)