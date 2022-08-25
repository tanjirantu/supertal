import Link from 'next/link';
import TextInput from '../../common/components/TextInput';
import { useState } from 'react';
import { actionCreateUser } from '../actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordMeter from '../../common/components/PasswordMeter';
import classNames from 'classnames';
import { checkPassStrength } from '../../../helpers';

const RegistrationComponent = () => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [formError, setFormError] = useState<any>({});

    const handleChange = (key: string, value: any) => {
        setState({ ...state, [key]: value });
        setFormError({ ...formError, [key]: false });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        if (state.password !== state.confirmPassword) {
            return toast('Password mismatch!', {
                type: 'error',
                position: 'bottom-center',
            });
        } else {
            const user = {
                firstName: state.firstName,
                lastName: state.lastName,
                username: state.username,
                password: state.password,
            };

            const response = await actionCreateUser(user);
            if (response) {
                setState({
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                });
                toast('Registration successful!', {
                    type: 'success',
                    position: 'bottom-center',
                });
            }
        }
    };

    return (
        <>
            <div className="w-4/5 sm:w-9/12 md:w-1/2 lg:w-1/3 mx-auto mt-32 h-full border shadow-md rounded">
                <form onSubmit={handleSubmit}>
                    <div className="p-4 mb-10 bg-gray-100">
                        <h2>Registration</h2>
                    </div>
                    <div className="flex flex-col p-4">
                        <div className="px-4 mb-10">
                            <TextInput
                                error={formError['firstName']}
                                label="First Name"
                                value={state.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                            />
                        </div>
                        <div className="px-4 mb-10">
                            <TextInput
                                error={formError['lastName']}
                                label="Last Name"
                                value={state.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                            />
                        </div>
                        <div className="px-4 mb-10">
                            <TextInput
                                error={formError['username']}
                                label="Username"
                                value={state.username}
                                onChange={(e) => handleChange('username', e.target.value)}
                            />
                        </div>
                        <div className="px-4 mb-8">
                            <TextInput
                                type="password"
                                error={formError['password']}
                                label="Password"
                                value={state.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                            />
                        </div>
                        <div className="px-4 flex justify-between items-center my-2 pl-1">
                            <div
                                className={classNames(
                                    `text-sm font-normal ${
                                        state.password.length < 8 && state.password.length !== 0
                                            ? 'text-dh-red-500'
                                            : 'text-dh-gray-600'
                                    }`
                                )}
                            >
                                {/* Contain at least 8 characters */}
                            </div>
                            <PasswordMeter passwordStatus={state.password ? checkPassStrength(state.password) : ''} />
                        </div>
                        <div className="px-4 mb-10">
                            <TextInput
                                type="password"
                                error={formError['confirmPassword']}
                                label="Confirm Password"
                                value={state.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            />
                        </div>

                        <div className="px-4 mb-10 flex flex-col">
                            <button
                                onClick={handleSubmit}
                                className="bg-teal-600 text-white rounded py-2 font-semibold mb-2"
                            >
                                Login
                            </button>
                            <Link href={`/login`}>
                                <a className="text-teal-600 font-semibold">Already have an account? Login.</a>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>

            <ToastContainer />
        </>
    );
};

export default RegistrationComponent;
