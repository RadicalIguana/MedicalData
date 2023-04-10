from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

# from receiver import accustripData

import serial

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