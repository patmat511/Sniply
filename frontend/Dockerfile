ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-slim AS builder

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . . 
RUN npm run build -- --configuration production 

FROM nginx:alpine AS final

LABEL Maintainer="Patryk Matusiak"
LABEL Description="Final optimized image"

RUN adduser -D -H -s /sbin/nologin appuser

COPY --from=builder --chown=appuser:appuser /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT [ "nginx" ]
CMD ["-g", "daemon off;"]