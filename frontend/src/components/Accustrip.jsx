import React, { useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'

function Accustrip() {
  const [data, setData] = useState([])

  const getData = async () => {
    const response = await fetch(`http://localhost:8000/accustrip`)
    const res = await response.json()
    console.log(res.data);
    setData(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box>
        <Typography>
            {
              data
            }
        </Typography>
    </Box>
  )
}

export default Accustrip