from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi import HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import schemas, crud
from database import SessionLocal, engine
import loguru
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# 配置loguru日志
logger = loguru.logger
logger.add(
    "logs/app.log",
    rotation="32 MB",
    level="INFO",
    format="{time:YYYY-MM-DD at HH:mm:ss} | {level} | {message}",
)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


load_dotenv()

REACT_APP_FRONTEND_URL = os.getenv("REACT_APP_FRONTEND_URL")

origins = [REACT_APP_FRONTEND_URL]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 允许来自特定原点的请求
    allow_credentials=True,  # 允许前端带有凭据的请求
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有头
)


@app.middleware("http")
async def log_request(request: Request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    logger.info(f"Client IP: {request.client.host}")
    response = await call_next(request)
    logger.info(f"Response: {response.status_code}")
    return response


@app.post("/register")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    logger.info(f"Registering new user:{user.username},{user.email}")
    db_user_by_username = crud.get_user_by_username(db, user.username)
    if db_user_by_username:
        logger.warning(f"Username adready registered:{user.username}")
        raise HTTPException(status_code=400, detail="用户名已存在")
    db_user_by_email = crud.get_user_by_email(db, user.email)
    if db_user_by_email:
        logger.warning(f"Email adready existed:{user.email}")
        raise HTTPException(status_code=400, detail="邮箱已被注册")
    db_user = crud.create_user(db, user)
    if db_user:
        logger.info(f"User successfully registered")
        return JSONResponse(
            content={
                "msg": "注册成功",
                "user": {"username": user.username, "email": user.email},
            },
            status_code=status.HTTP_201_CREATED,
        )
    else:
        logger.warning(f"register failed, unknows reason")
        raise HTTPException(status_code=400, detail="注册失败，未知错误")


@app.post("/login")
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    logger.info(f"User attempting to login:{user.usernameOrEmail}")
    db_user = crud.login_user(db, user)
    if db_user is None:
        logger.warning(f"User login failed, user not found")
        raise HTTPException(status_code=400, detail="用户名或邮箱错误")
    elif db_user == False:
        logger.warning(f"User login failed, password wrong")
        raise HTTPException(status_code=400, detail="密码错误")
    logger.info(f"Login successfully")
    return JSONResponse(
        content={
            "msg": "登陆成功",
        },
    )


@app.post("/predict")
def predict(text: schemas.Text, db: Session = Depends(get_db)):
    result = crud.predict(db, text)
    return JSONResponse(content={"result": result})
