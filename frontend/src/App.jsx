import Sidebar from "./components/Sidebar"
import { Stack } from '@mui/material'

import { Outlet } from 'react-router-dom'

function App() {
  return (
    <Stack direction="row" spacing={2} >
      <Sidebar/>
      <Outlet/>
    </Stack>
  )
}

export default App
