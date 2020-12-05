import React, {useState, useEffect} from 'react';
import style from './itemDetails.module.css';

export default function ItemDetails({fields, itemId, getData}) {
    const [item, updateItem] = useState([]);

    useEffect(() => {
        getData(itemId)
            .then((item) => updateItem(() => item));
    }, []);

    const fieldsItems = fields.map(el => {
        return (
            <li key={el} className="list-group-item d-flex justify-content-between">
                <span className="term">{el}</span>
                <span>{item[el]}</span>
            </li>
        )
    });

    return (
        <div className={style["char-details"] + " rounded"}>
            <h4>{item.name}</h4>
            <ul className="list-group list-group-flush">
                {fieldsItems}
            </ul>
        </div>
    );
}