import React from 'react';
import {Link} from 'react-router-dom';

import style from './page404.module.css';

const Page404 = () => {
    return (
        <div className={style["content"]}>
            <h2>404. Page not found!</h2>
            <Link to="/">Go home</Link>
        </div>
    )
};

export default Page404;