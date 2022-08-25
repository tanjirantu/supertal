import { httpAdapter } from '../../../config';
import { LoginCredentials } from '../types/LoginCredentials';

const actionLogin = async (loginCredentials: LoginCredentials) => {
    try {
        const { data } = await httpAdapter.post('/auth/signin', loginCredentials);
        return data;
    } catch (err: any) {
        console.log(err.toString());
    }
};

export default actionLogin;
