import Link from 'next/link';
import { useState } from 'react';
import TextInput from '../../common/components/TextInput';
import actionLogin from '../actions/actionLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { setToken } from '../../../libs/authClient';

const LoginComponent = () => {
    const router = useRouter();

    const [state, setState] = useState({
        username: '',
        password: '',
    });

    const [formError, setFormError] = useState<any>({});

    const handleChange = (key: string, value: any) => {
        setState({ ...state, [key]: value });
        setFormError({ ...formError, [key]: false });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const response = await actionLogin({ username: state.username, password: state.password });
        if (response && response.accessToken) {
            setState({
                username: '',
                password: '',
            });
            setToken({ token: response.accessToken });
            return router.push('/');
        } else {
            return toast('Login credentials not valid!', {
                type: 'error',
                position: 'bottom-center',
            });
        }
    };

    return (
        <>
            <div className="w-4/5 sm:w-9/12 md:w-1/2 lg:w-1/3 mx-auto mt-32 h-full border shadow-md rounded">
                <form onSubmit={handleSubmit}>
                    <div className="p-4 mb-10 bg-gray-100">
                        <h2>Sign In</h2>
                    </div>
                    <div className="flex flex-col p-4">
                        <div className="px-4 mb-10">
                            <TextInput
                                error={formError['username']}
                                label="Username"
                                value={state.username}
                                onChange={(e) => handleChange('username', e.target.value)}
                            />
                        </div>
                        <div className="px-4 mb-10">
                            <TextInput
                                type="password"
                                error={formError['password']}
                                label="Password"
                                value={state.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                            />
                        </div>

                        <div className="px-4 flex flex-col mb-10">
                            <button className="bg-teal-600 text-white rounded py-2 font-semibold mb-2">Login</button>
                            <Link href={`/registration`}>
                                <a className="text-teal-600 font-semibold">Create an account.</a>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default LoginComponent;
