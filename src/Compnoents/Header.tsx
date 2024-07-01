import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserToken, selectUsername } from '../Redux/Slice/UserSlice';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
    const isLoggedIn = useSelector(selectUserToken);
    const username = useSelector(selectUsername);
    const location = useLocation();

    const getNavLinkClass = (path: string) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    };

    return (
        <nav className="navbar navbar-light px-0 lg:px-40">
            <div className="container">
                <Link className="navbar-brand" to="/">conduit</Link>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <Link className={getNavLinkClass('/')} to="/">Home</Link>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className={getNavLinkClass('/new-article')} to="/new-article">
                                    <i className="ion-compose"></i>&nbsp;New Article
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={getNavLinkClass('/settings')} to="/settings">
                                    <i className="ion-gear-a"></i>&nbsp;Settings
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={getNavLinkClass(`/profile/${username}`)} to={`/profile/${username}`}>
                                    {username}
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className={getNavLinkClass('/login')} to="/login">Sign in</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={getNavLinkClass('/register')} to="/register">Sign up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
