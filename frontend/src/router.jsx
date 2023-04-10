import { createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Accustrip from './components/Accustrip'
import NotFound from './components/NotFound'
import MainLayout from './layouts/MainLayout'
import Todo from './components/Todo'
import Cardio from './components/Cardio'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/accustrip',
                element: <Accustrip/>
            },
            {
                path: '/cardio',
                element: <Cardio/>
            },
            {
                path: '/todo',
                element: <Todo/>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
    
])

export default router
