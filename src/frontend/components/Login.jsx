import React from 'react'
import styles from '../styles/login.module.css'

export default function Login() {
    return(
    <div className={styles.login_wrapper}>
        <h1>LiftBuddy</h1>
        <div className={styles.login_menu}>
            <h3>choose a sign in method to continue...</h3>
            <form>
                <input 
                type="button"
                name="emailSignIn"
                value="Email"
                />
                <input 
                type="button"
                name="googleSignIn"
                value="Google"
                />
                <input 
                type="button"
                name="facebookSignIn"
                value="Facebook"
                />
                <input 
                type="button"
                name="twitterSignIn"
                value="Twitter"
                />
            </form>
        </div>
    </div>)
}