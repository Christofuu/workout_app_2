import React, { useEffect } from 'react'
import styles from '../styles/mainmenu.module.css'
import axios from 'axios'
import {
    useNavigate
} from 'react-router-dom'
import { BiCog } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'

export default function Mainmenu() {
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true; // flag to keep track of component mount status
    
        const checkIfUserIsLoggedIn = async () => {
            try {
                const isLoggedIn = await axios.get('http://localhost:5000/auth/check', { withCredentials: true });
    
                if (isMounted) {
                    console.log("main-menu: user is logged in", isLoggedIn);
                    navigate('/main-menu');
                }
    
            } catch (err) {
                console.log("auth check error ", err);
    
                if (isMounted) {
                    navigate('/');
                }
            }
        }
    
        checkIfUserIsLoggedIn();
    
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
        <div className={styles.templates_wrapper}>
            <div className={styles.templates_header}><AiOutlinePlusCircle></AiOutlinePlusCircle><h2>Split 1</h2><BiCog></BiCog></div>
            <div className={styles.templates_content}>Function that pulls user templates and displays appropiate content</div>
        </div>
    </div>
)}