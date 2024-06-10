# 数字灯塔-API开放平台（前端）

基于 React + Spring Boot + Dubbo + Spring Cloud Gateway 的 API 接口调用平台

管理员可以接入并发布接口并且可视化的查看各接口的调用情况；用户可以通过平台浏览接口及在线调用，开发者可以通过封装的 SDK
轻松的调用接口

后端地址：[数字灯塔-API开放平台（后端）](https://github.com/null920/lightHouse-api-backend)

  ## 技术栈

* React
* Ant Design Pro
* Ant Design & Procomponents 组件库
* Umi4
* OpenAPI
* 数据可视化

## 快速开始

1. 安装依赖

``` bash
npm install
```

2. 运行项目

``` bash
npm run dev
```

3. 访问 http://localhost:8000

## 快速部署

### Docker 部署

1. 安装 Docker
2. 上传代码和 nginx.conf
3. 进入项目目录
4. 构建 Docker 镜像

``` bash
docker build -t lighthouse-api-frontend:v0.0.1 .
```

5. 运行 Docker 容器

``` bash
docker run -p 8343:80 -d lighthouse-api-frontend:v0.0.1
```
