import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from '../header/header.jsx';
import RandomChar from '../randomChar/randomChar.jsx';
import RandomBook from '../randomBook/randomBook.jsx';
import ErrorMessage from '../errorMessage/errorMessage.jsx';
import CharacterPage from '../pages/characterPage.jsx';
import GotService from '../../service/gotService';
import BookPage from '../pages/bookPage.jsx';
import HousePage from '../pages/housePage.jsx';
import PageItem from '../pages/pageItem.jsx';

import style from './app.module.css';
import Page404 from '../page404/page404.jsx';

export default class App extends Component {
    gotService = new GotService();
    constructor(props) {
        super(props);
        this.state = {
            charShow: true,
            bookShow: true,
            error: false
        }
        this.changeCharElement = this.changeCharElement.bind(this);
        this.changeBookElement = this.changeBookElement.bind(this);
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    changeCharElement() {
        this.setState((state) => {
            return {charShow: !state.charShow};
        });
    }

    changeBookElement() {
        this.setState((state) => {
            return {bookShow: !state.bookShow}
        });
    }

    render() {
        const charShow = this.state.charShow ? <RandomChar interval={15000}/> : null;
        const bookShow = this.state.bookShow ? <RandomBook interval={15000}/> : null;

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <Router> 
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row className="justify-content-between">
                            <Col lg={{size: 5, offset: 0}} className={style["left"]}>
                                {charShow}
                                <button 
                                    onClick={this.changeCharElement}
                                    className={style["hideChar"]}>{this.state.charShow ? `Hide random character` : `Show random character`}</button>
                            </Col>
                            <Col lg={{size: 5, offset: 0}} className={style["left"]}>
                                {bookShow}
                                <button 
                                    onClick={this.changeBookElement}
                                    className={style["hideChar"]}>{this.state.bookShow ? `Hide random book` : `Show random book`}</button>
                            </Col>
                        </Row>

                        <Switch>
                            <Route path="/" exact={true} component={() => <h1>Welcome to GOT DB</h1>} />
                            <Route path="/characters" exact component={CharacterPage}/>
                            <Route path="/characters/:id" render={
                                ({match}) => {
                                    return <PageItem
                                            itemId={match.params.id} 
                                            getData={this.gotService.getCharacter}
                                            fields={["name","gender","born","died","culture"]}/>
                                }
                            }/>
                            <Route path="/houses" exact component={HousePage} />
                            <Route path="/houses/:id" render={
                                ({match}) => {
                                    return <PageItem
                                            itemId={match.params.id} 
                                            getData={this.gotService.getHouse}
                                            fields={["name","region","words","titles","overlord","ancestralWeapons"]}/>
                                }
                            }/>
                            <Route path="/books" exact component={BookPage} />
                            <Route path="/books/:id" render={
                                ({match}) => {
                                    return <PageItem 
                                            itemId={match.params.id} 
                                            getData={this.gotService.getBook}
                                            fields={["numberOfPages", "publiser", "released"]}/>
                                }                            
                            }/>
                            <Route path="*" component={Page404}/>
                        </Switch>
                    </Container>
                </div>
            </Router>
        )
    }
};