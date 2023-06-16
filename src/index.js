import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../src/index.css'
import {
    BrowserRouter
} from 'react-router-dom'

// const container = document.getElementById('root');

// Create a root.
// const root = ReactDOM.createRoot(container);

// Initial render
// root.render(<App />);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);