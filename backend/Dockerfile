ARG PYTHON_VERSION=3.12
FROM python:${PYTHON_VERSION}-slim AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt --no-cache-dir --prefix=/install


FROM python:${PYTHON_VERSION}-slim AS final

LABEL Maintainer="Patryk Matusiak"
LABEL Description="Final optimized image"

WORKDIR /app

ENV PYTHONUNBUFFERED=1

RUN adduser --disabled-password --no-create-home appuser 

COPY --from=builder /install /usr/local
COPY --chown=appuser:appuser . .

USER appuser

EXPOSE 8000

ENTRYPOINT [ "uvicorn" ]
CMD [ "main:app", "--host", "0.0.0.0", "--port", "8000" ]