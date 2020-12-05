import React, {Component} from 'react';
import Spinner from '../spinner/spinner';

import style from './itemList.module.css';

export default class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: null
        }   
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList: itemList
                });
            });
    }

    renderItems(arr) {
        console.log(arr);
        return arr.map((el, i) => {
            const {id} = el;
            const label = this.props.renderItem(el);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        });
    }

    render() {
        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner />
        }

        const items = this.renderItems(itemList);

        return (
            <ul className={style["item-list"] + " list-group"}>
                {items}
            </ul>
        );
    }
}