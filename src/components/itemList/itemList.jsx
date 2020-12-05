import React, {useState, useEffect} from 'react';
import Spinner from '../spinner/spinner';

import style from './itemList.module.css';

function ItemList({getData, onItemSelected, renderItem, itemsName}){
    const [dataList, updateList] = useState([]);
    const [page, updatePage] = useState(1);
    const [cursor, updateCursor] = useState([]);
    
    useEffect(() => {
        requestData(page);
    }, []);

    useEffect(() => {
    }, [dataList]);

    useEffect(() => {
        requestData(page);
    }, [page]);

    function requestData(p) {
        getData(p)
            .then((data) => {
                data.length < 10 ? updateCursor(false) : updateCursor(true);
                updateList(data);
            });
    }

    function click(dir) {
        if (dir === 'next') {
            if (cursor) {
                updatePage(page + 1);
            }
        } else if (dir === 'prev') {
            if(page <= 1) {
                return;
            }
            updatePage(page - 1);
        }
    };

    const Buttons = ({click}) => {
        return (
            <div className={style["buttons"]}>
                <button onClick={() => click('prev')} disabled={page <= 1 ? true : false}>Prev</button>
                <button onClick={() => click('next')} disabled={cursor ? false : true}>Next</button>
            </div>
        )
    };

    function renderItems(arr) {
        return arr.map(el => {
            const {id} = el;
            const label = renderItem(el);
            return (
                <li
                    key={el.id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            )
        });
    }
    
    if (dataList.length === 0) {
        return <Spinner />
    }

    const items = renderItems(dataList);
    const itemsList = dataList;

    return (
        <ul className={style["item-list"] + " list-group"}>
            <h2>{itemsName} {itemsList[0]["id"]} - {itemsList[itemsList.length - 1]["id"]}</h2>
            {items}
            <Buttons click={click} />
        </ul>
    );
}

export default ItemList;