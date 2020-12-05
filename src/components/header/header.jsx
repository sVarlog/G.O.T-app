import React from 'react';
import {Link} from 'react-router-dom';

import style from './header.module.css';

const Header = () => {
    return (
        <div className={style["header"]}>
            <div className={style["header-title"]}>
                <Link to="/">
                Game of Thrones DB
                </Link>
            </div>
            <div className={style["header-links"]}>
                <li>
                    <Link to="/characters/">Characters</Link>
                </li>
                <li>
                    <Link to="/houses/">Houses</Link>
                </li>
                <li>
                    <Link to="/books/">Books</Link>
                </li>
            </div>
        </div>
    );
};

export default Header;