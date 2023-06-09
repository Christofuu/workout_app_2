const React= require('react');
const ReactDOM = require('react-dom');
const App = require('./App')

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(<App />);

// (() => {
//     console.log('webpack working');
// })();