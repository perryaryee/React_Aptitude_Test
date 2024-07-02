import React, { useEffect, useState } from 'react';
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from '../Redux/ApiSlice/UserAuthApi';
import { User } from '../Types/types';
import { useDispatch, useSelector } from 'react-redux';
import { Add_User, ClearUser, selectUserToken } from '../Redux/Slice/UserSlice';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectUserToken);

    const { data: currentUserData, error: currentUserError, isLoading } = useGetCurrentUserQuery();
    const [updateCurrentUser, { isLoading: isUpdating }] = useUpdateCurrentUserMutation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [bio, setBio] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        if (currentUserData) {
            setUsername(currentUserData.username);
            setEmail(currentUserData.email);
            setImage(currentUserData.image || '');
            setBio(currentUserData.bio || '');
        }
    }, [currentUserData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userDataToUpdate: Partial<User> = {
            username,
            email,
            image,
            bio,
            password: newPassword
        };

        try {
            const updatedUser = await updateCurrentUser(userDataToUpdate).unwrap();
            console.log('Updated User:', updatedUser); // Debugging line
            if (updatedUser) {
                console.log('Navigating to profile:', updatedUser.user.username); // Debugging line

                dispatch(Add_User({
                    username: updatedUser.user.username,
                    email: updatedUser.user.email,
                    token: updatedUser.user.token
                }));

                navigate(`/profile/${updatedUser.user.username}`);
            }
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (currentUserError) {
        return <div>Error Loading Data!!!!</div>;
    }

    const logout = () => {
        dispatch(ClearUser());
        navigate("/login");
    }

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <ul className="error-messages">
                            {/* Error messages here */}
                        </ul>

                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="URL of profile picture"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your Name"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        rows={8}
                                        placeholder="Short bio about you"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </fieldset>
                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    type="submit"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'Updating...' : 'Update Settings'}
                                </button>
                            </fieldset>
                        </form>

                        <hr />

                        <button className="btn btn-outline-danger" onClick={logout}>
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;









