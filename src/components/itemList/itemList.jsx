import React, {useState, useEffect} from 'react';
import Spinner from '../spinner/spinner';

import style from './itemList.module.css';

function ItemList({getData, onItemSelected, renderItem}){
    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data);
            })
    }, []);

    function renderItems(arr) {
        return arr.map((el, i) => {
            const {id} = el;
            const label = renderItem(el);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            )
        });
    }

    if (itemList.length === 0) {
        return <Spinner />
    }

    const items = renderItems(itemList);

    return (
        <ul className={style["item-list"] + " list-group"}>
            {items}
        </ul>
    );
}

export default ItemList;