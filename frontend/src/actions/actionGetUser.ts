import { httpAdapter } from '../config';

const actionGetUser = async () => {
    try {
        const { data } = await httpAdapter.get('/users/me/profile');
        return data;
    } catch (err: any) {
        console.log(err.toString());
    }
};

export default actionGetUser;
