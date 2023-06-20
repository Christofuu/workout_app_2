import React from 'react'
import { 
    Routes,
    Route,
 } from 'react-router-dom'
import Login from '../src/frontend/components/Login'
import Mainmenu from './frontend/components/Mainmenu'
import MagicLogin from './frontend/components/MagicLogin'

export default function App() {
    

    return(
        <Routes>
            <Route path="/" 
            element={<Login/>}
            />
            <Route path="/main-menu" element={<Mainmenu />} />
            <Route path='/magic-login' element={<MagicLogin />} />
        </Routes>
    )
};

