import React from 'react';
import style from './errorMessage.module.css';
import img from './error.png';

const ErrorMessage = () => {
    return (
        <div className={style["errorWrapp"]}>
            <img src={img} alt="error"/>
            <span className={style["error"]}>Something goes wrong!</span>
        </div>
    )
}

export default ErrorMessage;