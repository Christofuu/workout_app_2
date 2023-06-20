import React from 'react'
import styles from '../styles/login.module.css'
import { Link } from 'react-router-dom'
import { BsGoogle } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { GiWeightLiftingUp } from 'react-icons/gi'

export default function Login() {

    return(
    <div className={styles.login_wrapper}>
        <h1>LiftBuddy</h1>
        <h2>A web based fitness tracker and workout manager</h2>
        <div className={styles.login_menu}>
            <h2>choose a sign in method to continue...</h2>
            <form>
                <a href="http://localhost:5000/auth/google">
                    <button type="button" name="googleSignIn" value="Google">
                        <h3>Google</h3> 
                            <div className={styles.icon}>
                                <BsGoogle />
                            </div>
                    </button>
                </a>
                <a href="http://localhost:5000/auth/facebook">
                <button type="button" name="facebookSignIn" value="Facebook">
                    <h3>Facebook</h3> 
                    <div className={styles.icon}>
                        <FaFacebookF />
                    </div>
                </button>
                </a>
                <Link to='/magic-login'>
                <button type="button" name="emailSignIn" value="Email">
                    <h3>Email</h3> 
                    <div className={styles.icon}>
                        <MdEmail />
                    </div>
                </button>
                </Link>
                <button type="button" name="noLogin" value="noLogin" >
                    <h3>Try it out</h3> 
                    <div className={styles.icon}>
                        <GiWeightLiftingUp />
                    </div>
                </button>
            </form>
        </div>
    </div>
    )
}