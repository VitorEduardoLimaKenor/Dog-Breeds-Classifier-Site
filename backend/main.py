import os
os.environ['TF_USE_LEGACY_KERAS'] = '1'

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routes import router
from breed_info_route import router as breed_info_router

API_KEY = os.environ.get("API_KEY", "dog-classifier-secret-key-2026")

app = FastAPI(
    title="Dog Breed Classifier API",
    description="API para classificação de raças de cachorros usando Deep Learning.",
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

# Middleware de autenticação por API Key
@app.middleware("http")
async def api_key_middleware(request: Request, call_next):
    # Libera requisições de health check sem autenticação
    if request.url.path == "/health":
        return await call_next(request)

    # Verifica a API Key no header
    request_api_key = request.headers.get("X-API-Key")
    if request_api_key != API_KEY:
        return JSONResponse(status_code=403, content={"detail": "Acesso negado"})

    return await call_next(request)

# CORS restrito — apenas o frontend pode acessar
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["X-API-Key", "Content-Type"],
)

# Registra as rotas
app.include_router(router)
app.include_router(breed_info_router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4004)
