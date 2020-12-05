import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ItemList from '../itemList/itemList.jsx';
import ErrorMessage from '../errorMessage/errorMessage.jsx';
import GotService from '../../service/gotService';

class CharacterPage extends Component {
    gotService = new GotService();
    constructor(props) {
        super(props);
        this.state = {
            selectedChar: null,
            error: false
        }
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        });
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
                    this.props.history.push(itemId);
                }}
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}
                itemsName={'Characters'}/>
        )
    }
}

export default withRouter(CharacterPage);