import os
import tempfile
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse

from classificador import DogBreedClassifier
from schemas import HealthResponse, BreedsResponse, PredictionResponse, ErrorResponse

router = APIRouter()

# Inicializa o classificador
classifier = DogBreedClassifier()


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Verificação de saúde",
    description="Verifica se a API está online e funcionando corretamente.",
    responses={
        200: {
            "description": "API está online",
            "content": {
                "application/json": {
                    "example": {
                        "message": "Dog Breed Classifier API",
                        "status": "online"
                    }
                }
            }
        }
    }
)
async def health_check():
    """Endpoint de verificação de saúde da API."""
    return HealthResponse(
        message="Dog Breed Classifier API",
        status="online"
    )


@router.get(
    "/breeds",
    response_model=BreedsResponse,
    summary="Listar raças",
    description="Retorna a lista de todas as raças de cachorros que o modelo consegue identificar.",
    responses={
        200: {
            "description": "Lista de raças suportadas",
            "content": {
                "application/json": {
                    "example": {
                        "breeds": [
                            "beagle", "boxer", "chihuahua", "corgi", "dachshund",
                            "french_bulldog", "german_shepherd", "golden_retriever",
                            "husky", "pomeranian", "poodle", "pug", "rottweiler",
                            "shiba_inu", "shih_tzu", "yorkshire_terrier"
                        ]
                    }
                }
            }
        }
    }
)
async def list_breeds():
    """Lista todas as raças que o modelo pode identificar."""
    return BreedsResponse(breeds=DogBreedClassifier.CLASS_NAMES)


@router.post(
    "/predict",
    response_model=PredictionResponse,
    summary="Classificar imagem",
    description="""
    Recebe uma imagem de cachorro e retorna a raça identificada pelo modelo.
    
    **Formatos aceitos:** JPG, PNG, JPEG, WEBP
    
    **Exemplo de uso com curl:**
    ```bash
    curl -X POST "http://localhost:8000/predict" -F "file=@meu_cachorro.jpg"
    ```
    """,
    responses={
        200: {
            "description": "Predição realizada com sucesso",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "breed": "golden_retriever",
                        "filename": "meu_cachorro.jpg"
                    }
                }
            }
        },
        400: {
            "description": "Arquivo inválido",
            "model": ErrorResponse,
            "content": {
                "application/json": {
                    "example": {
                        "detail": "O arquivo enviado deve ser uma imagem"
                    }
                }
            }
        },
        500: {
            "description": "Erro interno ao processar a imagem",
            "model": ErrorResponse,
            "content": {
                "application/json": {
                    "example": {
                        "detail": "Erro ao processar a imagem: arquivo corrompido"
                    }
                }
            }
        }
    }
)
async def predict(
    file: UploadFile = File(
        ...,
        description="Imagem do cachorro para classificação (JPG, PNG, JPEG, WEBP)"
    )
):
    """
    Recebe uma imagem e retorna a raça do cachorro identificada.
    
    - **file**: Arquivo de imagem do cachorro
    """
    # Valida o tipo do arquivo
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="O arquivo enviado deve ser uma imagem"
        )

    # Valida o tamanho do arquivo (máximo 10MB)
    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail="A imagem deve ter no máximo 10MB"
        )
    await file.seek(0)
    
    tmp_path = None
    
    # Salva temporariamente o arquivo para processar
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
            shutil.copyfileobj(file.file, tmp)
            tmp_path = tmp.name
        
        # Faz a predição
        breed = classifier.predict(tmp_path)
        
        return PredictionResponse(
            success=True,
            breed=breed,
            filename=file.filename
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao processar a imagem: {str(e)}"
        )
    
    finally:
        # Remove o arquivo temporário
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)
