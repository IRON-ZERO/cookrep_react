# Node.js 환경에서 React 빌드
FROM node:18 AS build
WORKDIR /app

# package.json과 package-lock.json을 먼저 복사하여 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 전체 소스 코드 복사 후 빌드 실행
COPY . .
RUN npm run build

# Nginx를 사용하여 정적 파일 서빙
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html

# 환경 변수 설정
ENV PORT=80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]