import React, {useState, useEffect} from 'react';
import GotService from '../../service/gotService';
import Spinner from '../spinner/spinner';
import style from './randomChar.module.css';

function RandomChar({interval = 15000}) {
    const gotService = new GotService();
    const [char, updateChar] = useState([]);
    let [loading, updateLoading] = useState(true);

    function onCharLoaded(char) {
        updateChar(() => char);
        updateLoading(() => loading = false)
    }

    function newChar() {
        let id = Math.floor(Math.random() * 140 + 25);
        gotService.getCharacter(id)
            .then(onCharLoaded)
    }

    useEffect(() => {
        newChar();
        setInterval(newChar, interval);
    }, []);

    const spinner = loading ? <Spinner/> : null;
    const content = !(loading) ? <View char={char}/> : null;

    return (
        <div className={style["random-block"] + " rounded"}>
            {spinner}
            {content}
        </div>
    );
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: <p>{name}</p></h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className={style["term"]}>Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className={style["term"]}>Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className={style["term"]}>Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className={style["term"]}>Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
};

export default RandomChar;