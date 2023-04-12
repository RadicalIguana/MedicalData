import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Accustrip from './components/Accustrip'
import CardioChek from './components/CardioChek'
import Todo from './components/Todo'
import Game from './components/Game'

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
                path: '/cardiochek',
                element: <CardioChek/>
            },
            {
                path: '/todo',
                element: <Todo/>
            },
            {
                path: '/game',
                element: <Game/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
    
])

export default router
