import React, { useEffect, useState } from 'react'
import styles from '../styles/mainmenu.module.css'
import axios from 'axios'
import {
    useNavigate
} from 'react-router-dom'
import { BiCog } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'

function SplitMenu({ email }) {

    return (
        <div className={styles.templates_wrapper}>
            <div className={styles.templates_header}><AiOutlinePlusCircle></AiOutlinePlusCircle><h2>Split Name</h2><BiCog></BiCog></div>
            <div className={styles.templates_content}>{ email }</div>
        </div>
    )
}

export default function Mainmenu() {
    const navigate = useNavigate()
    const [user, setUser] = useState({})



    useEffect(() => {
        let isMounted = true; // flag to keep track of component mount status
    
        const checkIfUserIsLoggedIn = async () => {
            try {
                await axios.get('http://localhost:5000/auth/check', { withCredentials: true });
    
                // if (isMounted) {
                //     navigate('/main-menu');
                // }
    
            } catch (err) {
                console.log("auth check error ", err);
    
                if (isMounted) {
                    navigate('/');
                }
            }
        }
        
        const getUserData = async () => {
            try {
                const userData = await axios.get('http://localhost:5000/user', { withCredentials: true });
                console.log(userData);
                setUser(userData.data.user)
            } catch (err) {
                console.log("user get data ", err);
            }
        }

        checkIfUserIsLoggedIn();
        getUserData();
    
        // cleanup function
        return () => {
            isMounted = false; // set flag false when component unmounts
        }
    }, []);


    const logout = async() => {

        await axios.post(
            'http://localhost:5000/logout', 
            { 
                withCredentials: false,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
            })
            .then(navigate('/'))
            .catch((err) => {
                console.log('logout error', err)
            })
    }

    return (
    <div className={styles.main_menu_wrapper}>
        
        <div className={styles.quick_start_buttons_wrapper}>
            <h1>Your Workouts</h1>
            <button><h2>Quick Start</h2></button>
            <button><h2>Start Today's Lift</h2></button>
            <button onClick={logout}><h2>Log out</h2></button>
        </div>
        <SplitMenu email={ user.email }/>
    </div>
)}