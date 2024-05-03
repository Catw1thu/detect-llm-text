# 使用官方的Python运行时作为父镜像
FROM python:3.10

# 将工作目录设置为/app
WORKDIR /app

# 复制后端代码到容器中
COPY . /app

# 使用pip安装任何需要的包
RUN pip install --no-cache-dir -r requirements.txt

# 暴露端口8000
EXPOSE 8000

# 定义环境变量
ENV PYTHONPATH=/app

# 运行服务
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]