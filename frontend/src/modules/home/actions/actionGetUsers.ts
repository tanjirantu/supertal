import { httpAdapter } from '../../../config';

const actionGetUsers = async (params: any) => {
    try {
        const { data } = await httpAdapter.get('/users', { params: params || {} });
        return data;
    } catch (err: any) {
        console.log(err.toString());
    }
};

export default actionGetUsers;
