import React from 'react'
import styles from '../styles/magiclogin.module.css'
import axios from 'axios'

export default function MagicLogin() {



        const submitHandler = () => {

            const data = document.getElementById('email')

            axios.post(`http://localhost:5000/auth/magiclogin`, data, {
                headers: { 
                    'Access-Control-Allow-Headers': '*'       
                },
                withCredentials: false
              })
                .then(({data}) => {
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    return(
        <div className={styles.wrapper}>
            <form className={styles.magic_link_form} id='form'>
                <h1>One Click Magic Login</h1>
                <input name='email' placeholder='Enter your email here to sign in' id='email'></input>
                <button type='submit' onClick={submitHandler}>Send link</button>
            </form>
        </div>
    )
}