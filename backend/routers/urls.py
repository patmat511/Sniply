from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db

router = APIRouter()

@router.post("/shorten", response_model=schemas.URLResponse)
def shorten_url(url: schemas.URLCreate, db: Session = Depends(get_db)):
    return crud.create_url(db=db, url=url)

@router.get("/{short_code}")
def redirect_url(short_code: str, db: Session = Depends(get_db)):
    db_url = crud.get_url_by_code(db=db, short_code=short_code)
    if not db_url:
        raise HTTPException(status_code=404, detail="URL not found")
    crud.increment_clicks(db=db, db_url=db_url)
    return RedirectResponse(url=db_url.original_url)

@router.get("/stats/{short_code}", response_model=schemas.URLResponse)
def get_stats(short_code: str, db: Session = Depends(get_db)):
    db_url = crud.get_url_by_code(db=db, short_code=short_code)
    if not db_url:
        raise HTTPException(status_code=404, detail="URL not found")
    return db_url