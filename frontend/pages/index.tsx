import { ReactNode } from 'react';
import AuthLayout from '../src/layouts/AuthLayout';
import Head from 'next/head';
import { withSession, DecodedUser } from './_app';
import { AppProps } from 'next/app';
import HomeContainer from '../src/modules/home/containers/HomeContainer';

const Home = () => {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <HomeContainer />
        </>
    );
};

Home.getLayout = (page: ReactNode, pageProps: AppProps & { user: DecodedUser }) => {
    return <AuthLayout user={pageProps.user}>{page}</AuthLayout>;
};

export const getServerSideProps = withSession(async (ctx, user) => {
    if (user) {
        return {
            props: {
                user,
            },
        };
    }

    return { redirect: { destination: process.env.NEXT_PUBLIC_SIGNIN_URL, permanent: true } };
});

export default Home;
