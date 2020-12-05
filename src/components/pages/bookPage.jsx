import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ItemList from '../itemList/itemList.jsx';
import ErrorMessage from '../errorMessage/errorMessage.jsx';
import GotService from '../../service/gotService';

class BookPage extends Component {
    gotService = new GotService();
    constructor(props) {
        super(props);
        this.state = {
            selectedBook: null,
            error: false
        }
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <ItemList 
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={(el) => el.name}
                itemsName={'Books'}/>
        )
    }
}

export default withRouter(BookPage);