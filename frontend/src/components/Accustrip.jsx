import React, { useEffect, useState } from 'react'

import { Box, Typography, Button } from '@mui/material'

function Accustrip() {
  const [data, setData] = useState([])
  const [buttonText, setButtonText] = useState('Получить анализы')

  const getData = async () => {
    setButtonText('Получение...')
    const response = await fetch(`http://localhost:8000/accustrip`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const res = await response.json()
    setData(res)
    setButtonText('Получить анализы')
  }

  return (
    <Box>
        <Button variant='contained' onClick={ev => getData()}>{buttonText}</Button>
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

export default Accustrip