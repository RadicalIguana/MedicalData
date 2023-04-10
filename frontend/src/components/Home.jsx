import React, { useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'



function Home() {
  const [data, setData] = useState({})

  const getData = async () => {
    const response = await fetch(`http://localhost:8000/`)
    const res = await response.json()
    debugger
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box>
        <Typography>

        </Typography>
    </Box>

  )
}

export default Home