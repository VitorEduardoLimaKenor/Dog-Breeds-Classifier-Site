from pydantic import BaseModel, Field
from typing import List


class HealthResponse(BaseModel):
    """Resposta do endpoint de saúde da API."""
    message: str = Field(..., example="Dog Breed Classifier API")
    status: str = Field(..., example="online")

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "message": "Dog Breed Classifier API",
                    "status": "online"
                }
            ]
        }
    }


class BreedsResponse(BaseModel):
    """Resposta com a lista de raças suportadas."""
    breeds: List[str] = Field(
        ...,
        example=[
            "beagle", "boxer", "chihuahua", "corgi", "dachshund",
            "french_bulldog", "german_shepherd", "golden_retriever",
            "husky", "pomeranian", "poodle", "pug", "rottweiler",
            "shiba_inu", "shih_tzu", "yorkshire_terrier"
        ]
    )

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "breeds": [
                        "beagle", "boxer", "chihuahua", "corgi", "dachshund",
                        "french_bulldog", "german_shepherd", "golden_retriever",
                        "husky", "pomeranian", "poodle", "pug", "rottweiler",
                        "shiba_inu", "shih_tzu", "yorkshire_terrier"
                    ]
                }
            ]
        }
    }


class PredictionResponse(BaseModel):
    """Resposta da predição de raça."""
    success: bool = Field(..., example=True)
    breed: str = Field(..., example="golden_retriever")
    filename: str = Field(..., example="meu_cachorro.jpg")

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "success": True,
                    "breed": "golden_retriever",
                    "filename": "meu_cachorro.jpg"
                }
            ]
        }
    }


class ErrorResponse(BaseModel):
    """Resposta de erro."""
    detail: str = Field(..., example="O arquivo enviado deve ser uma imagem")

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "detail": "O arquivo enviado deve ser uma imagem"
                },
                {
                    "detail": "Erro ao processar a imagem: arquivo corrompido"
                }
            ]
        }
    }
