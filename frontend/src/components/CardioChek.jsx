import React from 'react'

import { Box, Typography, Button } from '@mui/material'

function CardioChek() {
  const [data, setData] = useState([])
  const [buttonText, setButtonText] = useState('Получить анализы')

  const getData = async () => {
    setButtonText('Получение...')
    const response = await fetch('http://localhost:8000/cardiochek', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const res = await response.json()
    setData(res)

    setButtonText('Получить анализы')
  }

  return (
    <Box>
      <Button varian='contained' onClick={ev => getData()}>{buttonText}</Button>
      <Typography>
            {
              data.map((d) => (
                <p>{d}</p>
              ))
            }
        </Typography>
    </Box>
  )
}

export default CardioChek