import { Header } from './components/Header'
import { Task } from './components/Task'
import { PlusCircle, ClipboardText } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid';

import './global.css'
import styles from './App.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from 'react'

interface Task {
    id: string ,
    isCompleted: boolean,
    taskText: string,
}

export function App() {
    const [totalCreated, setTotalCreated] = useState(0)
    const [totalDone, setTotalDone] = useState(0)
    const [newTaskText, setNewTaskText] = useState('')
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: uuidv4(),
            isCompleted: false,
            taskText: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer."
        }
    ])

    useEffect(() => {
        setTotalCreated(tasks.length)
    }, [tasks])

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault()

        const task: Task = {
            id: uuidv4(),
            isCompleted: false,
            taskText: newTaskText
        }

        setTasks([...tasks, task])
        setNewTaskText('')
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('')
        setNewTaskText(event.target.value)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function deleteTask(taskIdToDelete: string) {
        const tasksWithoutDeletedOne = tasks.filter(task => {
            return task.id !== taskIdToDelete
        })

        setTasks(tasksWithoutDeletedOne)
        
        const tasksCompleted = tasksWithoutDeletedOne.filter(task => {
            return task.isCompleted === true
        })

        setTotalDone(tasksCompleted.length)
    }

    function completedTask(state: boolean, id: string) {
        const taskIndex = tasks.findIndex((task => task.id === id))
        tasks[taskIndex].isCompleted = !state

        const tasksCompleted = tasks.filter(task => {
            return task.isCompleted == true
        })

        setTotalDone(tasksCompleted.length)

        return !state
    }

    return (
        <div>
            <Header />
            <div className={styles.newTask}>
                <form onSubmit={handleCreateNewTask}>
                    <input 
                        type="text"
                        value={newTaskText}
                        onChange={handleNewTaskChange}
                        onInvalid={handleNewCommentInvalid}
                        placeholder="Adicione uma nova tarefa" 
                        required
                    />
                    <div>
                        <button type="submit">
                            Criar
                            <PlusCircle weight='bold' size={16} />
                        </button>
                    </div>
                </form>
            </div>
            <div className={styles.tasks}>
                <div className={styles.info}>
                    <p className={styles.created}>Tarefas criadas <span>{ totalCreated }</span></p>
                    <p className={styles.done}>Concluídas <span>{`${totalDone} de ${totalCreated}`}</span></p>
                </div>
                {
                    tasks.length !== 0 
                    ?
                        <div className={styles.listTasks}>
                            { 
                                tasks.map(task => {
                                    return (
                                        <Task 
                                            key={task.id}
                                            id={task.id}
                                            isCompleted={task.isCompleted}
                                            task={task.taskText}
                                            completedTask={completedTask}
                                            deleteTask={deleteTask}
                                        />
                                    )
                                }) 
                            }
                        </div>
                    :
                        <div className={styles.listTasksEmpty}>
                            <ClipboardText size={56} />
                            <span>Você ainda não tem tarefas cadastradas</span>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                }
            </div>
        </div>
    )
}

