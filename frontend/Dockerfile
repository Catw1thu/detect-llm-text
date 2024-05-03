# 使用Node官方镜像
FROM node:20

# 设置工作目录
WORKDIR /app

# 复制前端代码到容器中
COPY . /app

# 后端地址
ARG REACT_APP_BACKEND_URL

# 安装依赖
RUN npm install

# 构建静态文件
RUN npm run build

# 使用serve来提供静态文件服务
RUN npm install -g serve

# 暴露端口5000
EXPOSE 5000

# 运行前端服务
CMD ["serve", "-s", "build", "-l", "5000"]