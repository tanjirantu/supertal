import Head from 'next/head';
import RegistrationContainer from '../src/modules/registration/containers/RegistrationContainer';

const Registration = () => {
    return (
        <>
            <Head>
                <title>Registration</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <RegistrationContainer />
        </>
    );
};

export default Registration;
