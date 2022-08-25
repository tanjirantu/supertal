import { httpAdapter } from '../../../config';
import { CreateUserInput } from '../types/CreateUserInput';

const actionCreateUser = async (user: CreateUserInput) => {
    try {
        const { data } = await httpAdapter.post('/users/signup', user);
        return data;
    } catch (err: any) {
        console.log(err.toString());
    }
};

export default actionCreateUser;
