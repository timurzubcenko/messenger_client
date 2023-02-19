import React, { useState, useEffect } from 'react'
import Massage from '../../components/massage/Massage';
import PopUp from '../../components/pop_up/PopUp';
import styles from './MainPage.module.scss'
import axios from 'axios'
import { Airplane, Gear } from 'react-bootstrap-icons'
const API_URL = process.env.REACT_APP_API_URL

const MainPage = () => {
    const [nameNotSave, setNameNotSave] = useState(true)
    const [animateName, setAnimateName] = useState(false)
    const [input, setInput] = useState('')
    const [inputName, setInputname] = useState('')
    const [darkModeOn, setDarkModeOn] = useState(false)
    const [massages, setMassages] = useState([

    ])
    let [name, setName] = useState('')

    const changeThem = () => {
        setDarkModeOn(!darkModeOn)
    }

    const onChange = (e) => {
        setInput(e.target.value)
    }
    const onChangeName = (e) => {
        setInputname(e.target.value)
    }

    const saveName = () => {
        changeName()
        if (inputName !== '') {
            setNameNotSave(!nameNotSave)
            setName(name = inputName)
        }
        else {
            setNameNotSave(nameNotSave)
            setAnimateName(!animateName)
        }
    }
    const rename = () => {
        setNameNotSave(!nameNotSave)
    }

    const getMassages = () => {
        axios.get(API_URL + 'api/messages/')
            .then((res) => {
                setMassages(res.data)
            })
            .catch((err) => {
                console.log('Error from Book List')
            })
    }

    useEffect(() => {
        getMassages()
    }, [])

    const sendMas = () => {
        const massage = { name: inputName, text: input }
        if (input !== '') {
            axios.post(API_URL + 'api/messages', massage)
                .then(res => {
                    setInput('')
                    setMassages([res.data, ...massages])
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    const enter = (e) => {
        if (e.keyCode === 13) {
            sendMas()
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', enter)
        return () => {
            document.removeEventListener('keydown', enter)
        }
    })

    const changeName = () => {
        console.log(name)
    }

    useEffect(() => {
        let timer = setInterval(() => {
            getMassages()
        }, 5000)
        return () => {
            clearInterval(timer)
        }
    })

    return (
        <React.Fragment>
            <div className="container">
                <div className={styles.dicoration}>
                    <div className={styles.ball_1}></div>
                    <div className={styles.ball_2}></div>
                    <div className={styles.ball_3}></div>
                    <div className={styles.ball_4}></div>
                    <div className={styles.ball_5}></div>
                    <div className={styles.ball_6}></div>
                </div>
                <div className={`${styles.main} ${darkModeOn ? styles.dark : ''}`}>
                    <div className={styles.chat}>
                        {massages.map((massage, index) =>
                            <Massage
                                darkModeOn={darkModeOn}
                                changeThem={changeThem}
                                massages={massages}
                                setMassages={setMassages}
                                inputName={inputName}
                                key={index}
                                massage={massage} />
                        )}
                    </div>
                    <div className={styles.inputs}>
                        <input
                            value={input}
                            onChange={onChange}
                            className={styles.input_massage}
                            type="text"
                            name=""
                            id=""
                            placeholder='Введите сообщение' />
                        <div onClick={sendMas} className={`${styles.btn} ${styles.send}`}>
                            <i><Airplane /></i>
                        </div>
                        <div onClick={rename} className={`${styles.btn} ${styles.rename}`}>
                            <i><Gear /></i>
                        </div>
                    </div>
                </div>
            </div>
            <PopUp
                darkModeOn={darkModeOn}
                changeThem={changeThem}
                nameNotSave={nameNotSave}
                onChangeName={onChangeName}
                inputName={inputName}
                saveName={saveName}
                animateName={animateName} />
        </React.Fragment>
    );
};
export default MainPage