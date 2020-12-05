import React, {useState, useEffect} from 'react';
import GotService from '../../service/gotService';
import Spinner from '../spinner/spinner';
import style from './randomBook.module.css';

function RandomBook({interval = 15000}) {
    const gotService = new GotService();
    const [book, updateBook] = useState([]);
    let [loading, updateLoading] = useState(true);

    function onBookLoaded(book) {
        updateBook(() => book);
        updateLoading(() => loading = false)
    }

    function newBook() {
        let id = Math.floor(Math.random() * 11 + 1);
        gotService.getBook(id)
            .then(onBookLoaded)
    }

    useEffect(() => {
        newBook();
        setInterval(newBook, interval);
    }, []);

    const spinner = loading ? <Spinner/> : null;
    const content = !(loading) ? <View book={book}/> : null;

    return (
        <div className={style["random-block"] + " rounded"}>
            {spinner}
            {content}
        </div>
    );
}

const View = ({book}) => {
    const {name, id, numberOfPages, publiser, released} = book;
    return (
        <>
            <h4>Random Book: <p>{name}</p></h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className={style["term"]}>Book ID</span>
                    <span>{id}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className={style["term"]}>Number of pages</span>
                    <span>{numberOfPages}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className={style["term"]}>Publiser </span>
                    <span>{publiser}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className={style["term"]}>Released </span>
                    <span>{released}</span>
                </li>
            </ul>
        </>
    )
};

export default RandomBook;