import styles from '../../styles/mainmenu.module.css'
import React from 'react'
import { useState } from 'react'
import ExerciseSet from './ExerciseSet'


export default function ExerciseItem({ id, setExercises }) {

    const [exerciseSet, setExerciseSet] = useState([])

    const [exercise, setExercise] = useState(false)

    const handleSetExerciseSet = () => {
        setExerciseSet(prev => [...prev, ''])
    }

    const handleRemoveExerciseSet = () => {
        setExerciseSet(prev => (prev.slice(0, -1)))
    }

    const handleRemoveExercise = () => {
        setExercises(prev => [...prev.filter(item => item.id !== id)])
    }

    return (
        <div className={styles.create_workout_menu_exercise}>
            <h3>{!!exerciseSet.length && "Exercise Name"}</h3>
            <div>{id}</div>
            {

                exerciseSet.map((item, idx) => (
                    <ExerciseSet id={idx} key={idx} />
                )
                )
            }
            <span className={styles.create_workout_menu_edit_set}>
                <button onClick={handleSetExerciseSet}> add set </button>
                <button onClick={handleRemoveExerciseSet}> remove set </button>
                <button onClick={handleRemoveExercise}> remove exercise </button>
            </span>
        </div>
    )
}