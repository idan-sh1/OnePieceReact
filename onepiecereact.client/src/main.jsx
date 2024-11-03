//*
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home.jsx'
import New from './New.jsx'
import Edit from './Edit.jsx'

import './index.css'

// Set the render based on the url
if (window.location.href.indexOf("/new") > -1) {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <New />
        </StrictMode>,
    )
}
else if (window.location.href.indexOf("/edit") > -1) {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <Edit />
        </StrictMode>,
    )
}
else {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <Home />
        </StrictMode>,
    )
}