import serial 

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
            print(txt)
            serialArray.append(txt)
            
            if serialPort.in_waiting == 0:
                serialArray.pop(0)
                serialArray.pop(-1)
                print(serialArray)  
                return serialArray    
            
accustripData()