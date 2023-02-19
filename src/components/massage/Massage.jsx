import React, { useState } from 'react'
import axios from 'axios'
import styles from './Massage.module.scss'
import { Trash3, XCircle } from 'react-bootstrap-icons'
const API_URL = process.env.REACT_APP_API_URL

const Massage = ({ darkModeOn, massages, setMassages, inputName, massage }) => {

    const { _id, name, text } = massage
    const [deleteMassage, setDeleteMassage] = useState(false)

    const removeMassage = () => {
        setDeleteMassage(!deleteMassage)
    }

    const yesRemove = (id) => {
        // setMassages(massages.filter(m => m._id !== _id))
        // setDeleteMassage(!deleteMassage)
        axios.delete(API_URL + 'api/messages/' + id)
            .then(res => {
                console.log(res.data.msg)
                setMassages(massages.filter(m => m._id !== id))
                setDeleteMassage(!deleteMassage)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const noRemove = () => {
        setDeleteMassage(!deleteMassage)
    }
    let date = massage.date.split('-')
    let time = date[2].split('T')
    let timeNow = time[1].split('.')

    return (
        <div className={`${styles.align} ${inputName === name ? styles.my_massage : ''} ${darkModeOn ? styles.dark : ''}`}>
            <div className={styles.block_message}>
                <div onClick={removeMassage} className={styles.massage}>
                    <h6 className={inputName === name ? styles.my_color : ''} >{name}</h6>
                    <p>{text}</p>
                    <div className={styles.time}>
                        <h4>{timeNow[0]}</h4>
                    </div>
                </div>
                <div className={`${styles.pop_up_2} ${!deleteMassage ? styles.hidden : ''}`}>
                    <div onClick={(e) => e.stopPropagation()} className={styles.window}>
                        <ul className={styles.btns}>
                            <li onClick={() => yesRemove(_id)} className={`${styles.btn} ${styles.yes}`}><Trash3 /> <p>Удалить</p></li>
                            <li onClick={noRemove} className={styles.btn}><XCircle /> <p>Закрыть</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Massage