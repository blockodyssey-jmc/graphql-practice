# FROM --platform=linux/amd64 mysql
FROM arm64v8/mysql:8.0.29-oracle

ENV TZ Asia/Seoul

ENV MYSQL_DATABASE test_db
ENV MYSQL_ROOT_PASSWORD testsql1@
ENV MYSQL_ROOT_HOST '%'
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD adminsql1@
ENV MYSQL_HOST '%'

COPY init-db.sql /docker-entrypoint-initdb.d/