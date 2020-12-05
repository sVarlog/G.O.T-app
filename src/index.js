import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import bg1 from './img/bg1.jpg';
import bg2 from './img/bg2.jpg';
import bg3 from './img/bg3.jpg';
import bg4 from './img/bg4.jpg';
import bg5 from './img/bg5.jpg';

const imgs = [bg1, bg2, bg3, bg4, bg5];

function changeBg() {
    let current = 0;
    let num = 0;

    const change = () => {
        document.body.style.backgroundImage = `url(${imgs[current]})`;
    };

    const setNum = () => {
        num = Math.floor(Math.random() * 6 - 1);
        if (num > imgs.length) {
            num -= 1;
        } else if (num < 0) {
            num = 0;
        }
        if (num === current) {
            num = Math.floor(Math.random() * 6 - 1);
        } else {
            current = num;
            change();
        }
    };
    setNum();
    console.log(current);
    console.log(imgs[current]);

    setInterval(() => {
        setNum();
        console.log(current);
        console.log(imgs[current]);
    }, 10000);
}
changeBg();

ReactDOM.render(<App />, document.getElementById('root'));