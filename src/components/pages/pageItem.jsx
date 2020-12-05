import React, {Component} from 'react';
import ItemDetails from '../itemDetails/itemDetails.jsx';

export default class PageItem extends Component {
    render() {
        console.log(this.props.itemId);
        return (
            <ItemDetails 
                itemId={this.props.itemId}
                getData={this.props.getData}
                fields={this.props.fields}>
            </ItemDetails>
        )
    }
}