import LoginContainer from '../src/modules/login/containers/LoginContainer';
import Head from 'next/head';

const Login = () => {
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <LoginContainer />
        </>
    );
};

export default Login;
