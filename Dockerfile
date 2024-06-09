# 使用官方的Nginx镜像作为基础镜像
FROM nginx:alpine
# 删除默认的Nginx配置文件
RUN rm /etc/nginx/conf.d/default.conf
# 将本地的Nginx配置文件复制到容器的/etc/nginx/conf.d/目录下
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# 将前端项目编译后的静态文件复制到容器的Nginx默认网页根目录下
COPY ./dist /usr/share/nginx/html
# 设置容器启动时的工作目录
WORKDIR /usr/share/nginx/html
USER root
# 容器对外暴露的端口
EXPOSE 80
# 设置容器启动命令为Nginx服务的启动命令
CMD ["nginx", "-g", "daemon off;"]