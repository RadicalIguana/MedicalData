import serial

serialString = 'A60,000240,0,4,1,1,N,"CHOL    : >  400 mg/dL"'

for i in range(40, 401, 40):
    if f'{i}' in serialString[0:21]:
        serialString = serialString.replace(serialString[0:21], '')    
    
print(serialString)        