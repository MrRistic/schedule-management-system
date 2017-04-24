import React from 'react';
import {Link} from 'react-router';

const Header = (props) => {
    return (
        <nav className="navbar navbar-default navbar">
            <div className="container">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"> Shift Planing System </Link>
                </div>

            </div>
        </nav>
    )
};

export default Header;