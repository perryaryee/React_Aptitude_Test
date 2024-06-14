import React from 'react'
import { useSelector } from 'react-redux';
import { selectUserToken, selectUsername } from '../Redux/Slice/UserSlice';

const Header = () => {
    const isLoggedIn = useSelector(selectUserToken);
    const username = useSelector(selectUsername);


    return (
        <>
            {isLoggedIn ? <nav className="navbar navbar-light">
                <div className="container">
                    <a className="navbar-brand" href="/">conduit</a>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">

                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/new-article"> <i className="ion-compose"></i>&nbsp;New Article </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={`/profile/${username}`}>
                                <img src="" className="user-pic" />
                                {username}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav> :
                <nav className="navbar navbar-light">
                    <div className="container">
                        <a className="navbar-brand" href="/">conduit</a>
                        <ul className="nav navbar-nav pull-xs-right">
                            <li className="nav-item">

                                <a className="nav-link active" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Sign in</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Sign up</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            }
        </>
    )
}

export default Header;