import serial

import uvicorn

from fastapi import FastAPI, Depends, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def read_root():
    return {'message': 'some text'}

@app.get('/accustrip')
async def read_accustrip():
    data = accustripData()
    # data = {'data': data}
    return data 

def accustripData():
    serialPort = serial.Serial(
            port='COM4',  
            # baudrate=19200, 
            parity=serial.PARITY_NONE, bytesize=8, timeout=2, stopbits=serial.STOPBITS_ONE, 
        )
    
    serialPort.close()
    
    serialPort = serial.Serial(
        port='COM4',  
        baudrate=19200, 
        parity=serial.PARITY_NONE, bytesize=8, timeout=2, stopbits=serial.STOPBITS_ONE, 
    )
    serialString = ''
    serialArray = []
    while True:
        if serialPort.in_waiting > 0:
            serialString = serialPort.readline()
            print(type(serialString))
            str = serialString.decode('utf-8', 'ignore')
            txt = str.replace('\r\n', '')
            serialArray.append(txt)
            
            if len(serialArray) == 21:
                unnecessary_values = [serialArray[0], serialArray[1], serialArray[2], serialArray[5], serialArray[7], serialArray[8], serialArray[19], serialArray[20]]
                for i in unnecessary_values:
                    serialArray.remove(i)
                data = dict()
                
                for i in range(len(serialArray)):
                    data[i] = serialArray[i]
                return serialArray  
            
@app.get('/carrdiochek')
def read_cardiochek():
    return {'msg': 'text'}

def cardiochekData():
    pass
            

### User database
@app.middleware('http')
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response
         
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@app.post('/users/', response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get('/users', response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get('/users/{user_id}', response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail='User not found')
    return db_user

@app.post('/users/{user_id}/items/', response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)

@app.get('/items/', response_model=list[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items


            
if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="localhost", port=8000, reload=True)