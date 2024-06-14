import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginPayload, User } from '../Types/types';
import { useLoginUserMutation } from '../Redux/ApiSlice/UserAuthApi';
import { Add_User } from '../Redux/Slice/UserSlice';
import { useDispatch } from 'react-redux';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    

    const [formData, setFormData] = useState<LoginPayload>({
        email: '',
        password: ''
    });

    const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
    const { email, password } = formData;

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
            const newUser = await loginUser({
                email,
                password,
            }).unwrap();

            const data = newUser.user;
            dispatch(Add_User({
                username: data.username,
                email: data.email,
                token: data.token
            }))

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
                        <h1 className="text-xs-center text-5xl">Sign in</h1>
                        <p className="text-xs-center">
                            <a href="/register">Need an account?</a>
                        </p>

                        {renderErrors()}

                        <form onSubmit={handleSubmit}>
                            <fieldset className="form-group">
                                <input name='email' value={email} onChange={handleInputChange} className="form-control form-control-lg" type="text" placeholder="Email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input name='password' value={password} onChange={handleInputChange} className="form-control form-control-lg" type="password" placeholder="Password" />
                            </fieldset>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;