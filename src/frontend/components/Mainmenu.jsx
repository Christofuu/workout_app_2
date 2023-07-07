import React, { useEffect, useState } from 'react'
import styles from '../styles/mainmenu.module.css'
import axios from 'axios'
import {
    useNavigate
} from 'react-router-dom'
import { BiCog } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { ImCheckmark } from 'react-icons/im'
import { v4 as uuidv4 } from "uuid";

import ExerciseItem from './Split/ExerciseItem'

export default function Mainmenu() {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [createSplit, setCreateSplit] = useState(false)
    const [createWorkout, setCreateWorkout] = useState(false)

    const [exercises, setExercises] = useState([])

    const handleSetExercises = () => {

        const id = uuidv4();

        console.log(id)

        const e = {
            id: id
        }

        setExercises(prev => [...prev, e])

    }

    const handleCreateSplit = () => {
        setCreateSplit(true);
    }

    const handleFinishCreateSplit = () => {
        setCreateSplit(false)
    }

    const handleCreateWorkout = () => {
        setCreateWorkout(true);
    }

    const handleFinishCreateWorkout = () => {
        setCreateWorkout(false);
    }


    useEffect(() => {
        let isMounted = true; // flag to keep track of component mount status

        const checkIfUserIsLoggedIn = async () => {
            try {
                await axios.get('http://localhost:5000/auth/check', { withCredentials: true });

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


    const logout = async () => {

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

    if (createSplit == false) {
        return (
            <div className={styles.main_menu_wrapper}>

                <div className={styles.quick_start_buttons_wrapper}>
                    <h1>Your Workouts</h1>
                    <button><h2>Quick Start</h2></button>
                    <button><h2>Start Today's Lift</h2></button>
                    <button onClick={logout}><h2>Log out</h2></button>
                </div>
                <div className={styles.templates_wrapper}>
                    <div className={styles.templates_header}><AiOutlinePlusCircle onClick={handleCreateSplit}></AiOutlinePlusCircle><h2>Split Name</h2><a name="splitSettings"><BiCog></BiCog></a></div>
                    <div className={styles.templates_content}>{user.email}</div>
                </div>
            </div>
        )
    }
    else if (createWorkout == false) {
        return (
            <div className={styles.create_split_wrapper}>
                <h1>Create a new split</h1>
                <div className={styles.create_split_menu}>
                    <div className={styles.create_split_workout_grid}>
                        <BiCog></BiCog>
                        <h2>Name Your Split</h2>
                        <ImCheckmark></ImCheckmark>
                        <div className={styles.create_split_workout_grid_boxes} onClick={handleCreateWorkout}>Click to create a workout</div>
                        <div className={styles.create_split_workout_grid_boxes} onClick={handleCreateWorkout}>Click to create a workout</div>
                        <div className={styles.create_split_workout_grid_boxes} onClick={handleCreateWorkout}>Click to create a workout</div>
                        <div className={styles.create_split_workout_grid_boxes} onClick={handleCreateWorkout}>Click to create a workout</div>
                        <div className={styles.create_split_workout_grid_boxes} onClick={handleCreateWorkout}>Click to create a workout</div>
                        <div className={styles.create_split_workout_grid_boxes} onClick={handleCreateWorkout}>Click to create a workout</div>
                        <button onClick={handleFinishCreateSplit}>Back</button>
                    </div>
                </div>
            </div>
        )
    }
    else if (createWorkout == true) {
        return (
            <div className={styles.create_split_wrapper}>
                <h1>Create Workout for Split Name</h1>
                <div className={styles.create_workout_menu}>
                    <h2>Name your workout</h2>
                    {
                        exercises?.map((item, idx) => (
                            <ExerciseItem id={item.id} key={item.id} setExercises={setExercises} />
                        )
                        )
                    }
                    <button onClick={handleSetExercises}> add exercise </button>
                    <button>finish create workout</button>
                    <button onClick={handleFinishCreateWorkout}>Go back</button>
                </div>
            </div>
        )
    }
}