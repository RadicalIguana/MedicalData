import serial 

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
        serialArray.append(serialString.decode('utf-8', 'ignore'))
        print(serialString.decode('utf-8', 'ignore'))
        if serialPort.in_waiting == 0:
            print(serialArray)  
            serialArray = []          