from sqlalchemy import or_
from sqlalchemy.orm import Session
import models, schemas
from passlib.context import CryptContext
from gradio_client import Client
import io
import sys
import httpx

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        username=user.username, password=hashed_password, email=user.email
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def login_user(db: Session, user: schemas.UserLogin):
    db_user = (
        db.query(models.User)
        .filter(
            or_(
                models.User.username == user.usernameOrEmail,
                models.User.email == user.usernameOrEmail,
            )
        )
        .first()
    )
    if not db_user:
        return None
    if verify_password(user.password, db_user.password):
        return db_user
    return False


def predict(db: Session, text: schemas.Text):
    client = Client("https://catw1thu-detect-llm-text.hf.space/", ssl_verify=False)
    retries = 3  # 重试次数

    for attempt in range(retries):
        try:
            result = client.predict(text.text, api_name="/predict")
            return result
        except Exception as exc:
            if(attempt + 1 == retries): raise exc
