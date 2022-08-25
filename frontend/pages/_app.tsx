import { Provider } from 'react-redux';
import { store } from '../src/store';
import { ReactElement, ReactNode } from 'react';
import jwt_decode from 'jwt-decode';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import type { AppProps } from 'next/app';
import NextNProgress from '../src/modules/common/components/NProgress';

//css
import '../styles/build.css';
import '../styles/global.scss';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement, pageProps: AppProps) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export type DecodedUser = {
    username: string;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <Provider store={store}>
            {getLayout(
                <>
                    <NextNProgress />
                    <Component {...pageProps} />
                </>,
                { ...pageProps }
            )}
        </Provider>
    );
}

export const withSession = (
    getSerSideProps: (ctx: GetServerSidePropsContext, user: DecodedUser | null) => any
): GetServerSideProps => {
    return (ctx: GetServerSidePropsContext) => {
        const { req } = ctx;
        const token = req.cookies.token || '';
        let user: DecodedUser | null = null;

        if (token) {
            const decodeuser = jwt_decode(token) as {
                username: DecodedUser;
            } | null;

            user = decodeuser && decodeuser?.username ? decodeuser.username : null;
        }

        return getSerSideProps(ctx, user);
    };
};

export default MyApp;
