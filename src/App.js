import React from 'react'
import { 
    Routes,
    Route,
 } from 'react-router-dom'
import Login from '../src/frontend/components/Login'
import Mainmenu from './frontend/components/Mainmenu'

export default function App() {
    

    return(
        <Routes>
            <Route path="/" 
            element={<Login/>}
            />
            <Route path="/main-menu" element={<Mainmenu />} />
        </Routes>
    )
};

