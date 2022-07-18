import styles from './Header.module.css'

import toDoLogo from '../../assets/logo.png'

export function Header() {
    return (
        <div className={styles.header}>
            <img src={toDoLogo} alt="Logo ToDo" />
        </div>
    )
}