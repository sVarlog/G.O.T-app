import React, {Component} from 'react';
import style from './itemDetails.module.css';
import GotService from '../../service/gotService';

export default class ItemDetails extends Component {
    gotService = new GotService();
    constructor(props) {
        super(props);
        this.state = {
            item: null
        }
    }

    updateItem() {
        const {itemId} = this.props;
        if (!itemId) {
            return;
        }
        
        const {getData} = this.props;
        getData(itemId)
            .then((item) => {
                this.setState({item})
            });
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    render() {

        if (!this.state.item) {
            return <span className={style["select-error"]}>Please select a character</span>
        }
        const {item} = this.state;
        const {name} = item;

        const fieldNames = this.props.fields;

        const fields = fieldNames.map(el => {
            return (
                <li key={el} className="list-group-item d-flex justify-content-between">
                    <span className="term">{el}</span>
                    <span>{this.state.item[el]}</span>
                </li>
            )
        });

        return (
            <div className={style["char-details"] + " rounded"}>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {fields}
                </ul>
            </div>
        );
    }
}