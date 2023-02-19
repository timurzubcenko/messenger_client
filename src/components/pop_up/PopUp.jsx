import React from 'react'
import styles from './PopUp.module.scss'
import { BrightnessHigh, Moon } from 'react-bootstrap-icons'

const PopUp = ({ darkModeOn, changeThem, animateName, nameNotSave, onChangeName, inputName, saveName }) => {
    return (
        <div className={`${styles.pop_app} ${nameNotSave ? '' : styles.hidden} ${darkModeOn ? styles.dark : ''}`}>
            <div className={styles.window}>
                <div className={styles.name_create}>
                    <h3>Введите свое имя</h3>
                    <input
                        onChange={onChangeName}
                        value={inputName}
                        className={`${styles.input_name} ${animateName ? styles.onAnimate : ''}`}
                        type="text"
                        name="" id=""
                        placeholder='Введите имя' />
                </div>
                <div className={styles.change_them}>
                    <h3>Оформление</h3>
                    <i onClick={changeThem}>
                        {darkModeOn ? <BrightnessHigh /> : <Moon />}
                    </i>
                </div>
                <div className={styles.btns}>
                    <div onClick={saveName} className={`${styles.btn} ${styles.yes}`}>Ок</div>
                </div>
            </div>
        </div>
    );
};
export default PopUp