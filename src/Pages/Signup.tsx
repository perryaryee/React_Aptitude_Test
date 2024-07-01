import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../Types/types';
import { useRegisterUserMutation } from '../Redux/ApiSlice/UserAuthApi';
import { useDispatch } from 'react-redux';
import { Add_User } from '../Redux/Slice/UserSlice';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<User>({
        username: '',
        email: '',
        password: ''
    });

    const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();

    const { username, email, password } = formData;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const newUser = await registerUser({
                username,
                email,
                password,
            }).unwrap();

            const data = newUser.user;
            dispatch(Add_User({
                username: data.username,
                email: data.email,
                token: data.token
            }))

            navigate('/');
        } catch (err) {
            console.error('Failed to register:', err);
        }
    };

    const renderErrors = () => {
        if (!isError || !error) return null;

        const apiError = error as { data: { errors: Record<string, string[]> } };
        const errorMessages = apiError.data.errors;

        return (
            <ul className="error-messages">
                {Object.entries(errorMessages).map(([field, messages]) => (
                    messages.map((message, index) => (
                        <li key={`${field}-${index}`}>{field} {message}</li>
                    ))
                ))}
            </ul>
        );
    };

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center text-5xl">Sign up</h1>
                        <p className="text-xs-center">
                            <a href="/login">Have an account?</a>
                        </p>

                        {renderErrors()}

                        <form onSubmit={handleSubmit}>
                            <fieldset className="form-group">
                                <input
                                    onChange={handleInputChange}
                                    value={username}
                                    name="username"
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Username"
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    onChange={handleInputChange}
                                    value={email}
                                    name="email"
                                    className="form-control form-control-lg"
                                    type="email"
                                    placeholder="Email"
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    onChange={handleInputChange}
                                    value={password}
                                    name="password"
                                    className="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                />
                            </fieldset>
                            <button
                                className="btn btn-lg btn-primary pull-xs-right"
                                type="submit"
                                disabled={isLoading}
                            >
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
