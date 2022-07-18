import { Trash } from "phosphor-react";
import { useState } from "react";

import styles from './Task.module.css'

interface TaskProps {
    id: string
    isCompleted: boolean,
    task: string,
    deleteTask: (id: string) => void
    completedTask: (state: boolean, id: string) => boolean
}

export function Task({ id, isCompleted, task, deleteTask, completedTask }: TaskProps) {
    const [isChecked, setIsChecked] = useState(isCompleted)    
    
    function handleDeleteTask() {
        deleteTask(id)
    }

    function handleCompletedTask() {
        setIsChecked(completedTask(isChecked, id))
    }

    return (
        <div className={styles.task}>
            <label className={styles.containerCheckbox}> <p className={ isChecked ? styles.taskChecked : '' } >{ task }</p>
                <input type="checkbox" checked={isChecked} onChange={handleCompletedTask}/>
                <span className={styles.checkmark}></span>
            </label>
            <div className={styles.ContainerTrash}>
                <button onClick={handleDeleteTask}>
                    <Trash/>
                </button>
            </div>
        </div>
    )
}