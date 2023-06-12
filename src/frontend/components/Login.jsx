import React from 'react'
import styles from '../styles/login.module.css'
import { BsGoogle } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function Login() {
    return(
    <div className={styles.login_wrapper}>
        <h1>LiftBuddy</h1>
        <div className={styles.login_menu}>
            <h2>choose a sign in method to continue...</h2>
            <form>
                <button type="button" name="googleSignIn" value="Google"><h3>Google</h3> <div className={styles.icon}><BsGoogle /></div></button>
                <button type="button" name="googleSignIn" value="Google"><h3>Facebook</h3> <div className={styles.icon}><FaFacebookF /></div></button>
                <button type="button" name="googleSignIn" value="Google"><h3>Email</h3> <div className={styles.icon}><MdEmail /></div></button>
            </form>
        </div>
    </div>)
}