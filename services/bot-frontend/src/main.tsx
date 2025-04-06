import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ReduxProvider, RouterProvider} from "./providers";
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReduxProvider>
            <RouterProvider/>
        </ReduxProvider>
    </StrictMode>,
)
