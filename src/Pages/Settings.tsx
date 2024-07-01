import React, { useEffect, useState } from 'react';
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from '../Redux/ApiSlice/UserAuthApi';
import { User } from '../Types/types';
import { useDispatch } from 'react-redux';
import { Add_User, ClearUser } from '../Redux/Slice/UserSlice';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: currentUserData, error: currentUserError, isLoading } = useGetCurrentUserQuery();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [bio, setBio] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Mutation hook for updating current user
    const [updateCurrentUser, { isLoading: isUpdating }] = useUpdateCurrentUserMutation();

    // Effect to update local state when currentUserData changes
    useEffect(() => {
        if (currentUserData) {
            setUsername(currentUserData.username);
            setEmail(currentUserData.email);
            setImage(currentUserData.image || '');
            setBio(currentUserData.bio || '');
        }
    }, [currentUserData]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Prepare data to update user
        const userDataToUpdate: Partial<User> = {
            username,
            email,
            image,
            bio,
            password: newPassword
        };

        try {
            // Call updateCurrentUser mutation
            const updatedUser = await updateCurrentUser(userDataToUpdate).unwrap();
            if (updatedUser) {
                console.log(updatedUser.user.username);

                navigate(`/profile/${updatedUser.user.username}`);
                dispatch(Add_User({
                    username: updatedUser.user.username,
                    email: updatedUser.user.email,
                }));
            }
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

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

                        {/* Error messages or notifications */}
                        <ul className="error-messages">
                            {/* Error messages here */}
                        </ul>

                        {/* Profile settings form */}
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

                        {/* Logout button */}
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






































// import React, { useEffect, useState } from 'react';
// import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from '../Redux/ApiSlice/UserAuthApi';
// import { User } from '../Types/types';
// import { useDispatch } from 'react-redux';
// import { Add_User, ClearUser } from '../Redux/Slice/UserSlice';
// import { useNavigate } from 'react-router-dom';


// const Settings: React.FC = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate()
//     const { data: currentUserData, error: currentUserError, isLoading } = useGetCurrentUserQuery();
//     console.log(currentUserData);

//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [image, setImage] = useState('');
//     const [bio, setBio] = useState('');
//     const [newPassword, setNewPassword] = useState('');

//     // Mutation hook for updating current user
//     const [updateCurrentUser, { isLoading: isUpdating }] = useUpdateCurrentUserMutation();

//     // Effect to update local state when currentUserData changes
//     useEffect(() => {
//         if (currentUserData) {
//             setUsername(currentUserData.username);
//             setEmail(currentUserData.email);
//             setImage(currentUserData.image || '');
//             setBio(currentUserData.bio || '');
//         }
//     }, [currentUserData]);

//     // Handle form submission
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Prepare data to update user
//         const userDataToUpdate: Partial<User> = {
//             username,
//             email,
//             image,
//             bio,
//             password: newPassword
//         };

//         try {
//             // Call updateCurrentUser mutation
//             const updatedUser = await updateCurrentUser(userDataToUpdate).unwrap();
//             navigate(`/profile/${updatedUser.username}`);

//             dispatch(Add_User({
//                 username: updatedUser.username,
//                 email: updatedUser.email,
//             }));

//         } catch (error) {
//             console.error('Failed to update user:', error);
//         }
//     };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (currentUserError) {
//         return <div>Error Loadind Data!!!!</div>;
//     }


//     const logout = () => {
//         dispatch(ClearUser());
//         navigate("/login")

//     }

//     return (
//         <div className="settings-page">
//             <div className="container page">
//                 <div className="row">
//                     <div className="col-md-6 offset-md-3 col-xs-12">
//                         <h1 className="text-xs-center">Your Settings</h1>

//                         {/* Error messages or notifications */}
//                         <ul className="error-messages">
//                             {/* Error messages here */}
//                         </ul>

//                         {/* Profile settings form */}
//                         <form onSubmit={handleSubmit}>
//                             <fieldset>
//                                 <fieldset className="form-group">
//                                     <input
//                                         className="form-control"
//                                         type="text"
//                                         placeholder="URL of profile picture"
//                                         value={image}
//                                         onChange={(e) => setImage(e.target.value)}
//                                     />
//                                 </fieldset>
//                                 <fieldset className="form-group">
//                                     <input
//                                         className="form-control form-control-lg"
//                                         type="text"
//                                         placeholder="Your Name"
//                                         value={username}
//                                         onChange={(e) => setUsername(e.target.value)}
//                                     />
//                                 </fieldset>
//                                 <fieldset className="form-group">
//                                     <textarea
//                                         className="form-control form-control-lg"
//                                         rows={8}
//                                         placeholder="Short bio about you"
//                                         value={bio}
//                                         onChange={(e) => setBio(e.target.value)}
//                                     ></textarea>
//                                 </fieldset>
//                                 <fieldset className="form-group">
//                                     <input
//                                         className="form-control form-control-lg"
//                                         type="text"
//                                         placeholder="Email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                 </fieldset>
//                                 <fieldset className="form-group">
//                                     <input
//                                         className="form-control form-control-lg"
//                                         type="password"
//                                         placeholder="New Password"
//                                         value={newPassword}
//                                         onChange={(e) => setNewPassword(e.target.value)}
//                                     />
//                                 </fieldset>
//                                 <button
//                                     className="btn btn-lg btn-primary pull-xs-right"
//                                     type="submit"
//                                     disabled={isUpdating}
//                                 >
//                                     {isUpdating ? 'Updating...' : 'Update Settings'}
//                                 </button>
//                             </fieldset>
//                         </form>

//                         <hr />

//                         {/* Logout button */}
//                         <button className="btn btn-outline-danger" onClick={logout}>
//                             Or click here to logout.
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Settings;












