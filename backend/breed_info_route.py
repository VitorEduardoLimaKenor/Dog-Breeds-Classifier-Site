from fastapi import APIRouter, HTTPException
import json
import os

router = APIRouter()

@router.get("/breed-info/{breed_name}", summary="Obter informações de uma raça", description="Retorna informações detalhadas sobre a raça informada.")
async def get_breed_info(breed_name: str):
    """
    Retorna informações detalhadas sobre a raça informada.
    """
    file_path = os.path.join(os.path.dirname(__file__), "dog_breeds_info.json")
    try:
        with open(file_path, encoding="utf-8") as f:
            breeds = json.load(f)
    except Exception:
        raise HTTPException(status_code=500, detail="Erro ao ler o arquivo de raças.")

    for breed in breeds:
        if breed["nome_oficial"].lower().replace(" ", "_") == breed_name.lower():
            return breed
    raise HTTPException(status_code=404, detail="Raça não encontrada.")
