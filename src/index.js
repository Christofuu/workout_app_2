import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../src/index.css'

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(<App />);

// (() => {
//     console.log('webpack working');
// })();