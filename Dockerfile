# Node.js 환경에서 React 빌드
FROM node:22 AS build
WORKDIR /app

# 환경 변수 ARG로 전달받기
ARG VITE_SECRET_SERVER_URL
ENV VITE_SECRET_SERVER_URL=$VITE_SECRET_SERVER_URL

# package.json과 package-lock.json 먼저 복사 후 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 전체 소스 코드 복사 후 빌드
COPY . .
RUN npm run build

# Nginx를 사용하여 정적 파일 서빙
FROM nginx:latest

# React 빌드 파일 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 템플릿 복사
COPY nginx.conf /etc/nginx/templates/default.conf.template

# 환경변수 치환 후 실행
ENV SPRING_BACKEND_IP=10.0.64.174
CMD envsubst '$SPRING_BACKEND_IP' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
EXPOSE 80