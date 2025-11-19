# Node.js 환경에서 React 빌드
FROM node:22 AS build
WORKDIR /app

# 환경 변수 ARG로 전달받기
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

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

# 커스텀 Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 환경 변수 및 포트
ENV PORT=80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]