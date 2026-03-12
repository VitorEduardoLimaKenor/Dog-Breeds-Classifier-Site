# Imagem base Python
FROM python:3.12-slim

# Define o diretório de trabalho
WORKDIR /app

# Variáveis de ambiente
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV TF_USE_LEGACY_KERAS=1
ENV TF_ENABLE_ONEDNN_OPTS=0
ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências do sistema necessárias para OpenCV
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copia o arquivo de requirements
COPY requirements.txt .

# Instala as dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia os arquivos da aplicação
COPY classificador.py .
COPY schemas.py .
COPY routes.py .
COPY breed_info_route.py .
COPY dog_breeds_info.json .
COPY main.py .
COPY best_model.h5 .

# Expõe a porta da aplicação
EXPOSE 4004

# Comando para iniciar a aplicação
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4004"]
