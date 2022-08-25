import { useEffect, useState } from 'react';
import Table from '../../common/components/Table';
import { actionGetUsers } from '../actions';
import { User } from '../../common/types/User';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

const HomeComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [usersCount, setUsersCount] = useState(0);
    const [visibleUsers, setVisibleUsers] = useState(0);

    useEffect(() => {
        getUsers({ skip: visibleUsers, limit: 10 });
    }, []);

    const getUsers = async ({ skip = 0, limit = 10 }) => {
        const data = await actionGetUsers({ skip, limit });
        setUsers([...users, ...data.users]);
        setUsersCount(data.count);
        setVisibleUsers(data.users.length + visibleUsers);
    };

    const loadMore = () => {
        if (visibleUsers <= usersCount) {
            getUsers({ skip: visibleUsers, limit: 10 });
        }
    };

    return (
        <>
            <div className="w-1/2 mt-20 mx-auto border shadow-md rounded">
                <Table
                    columns={[
                        {
                            header: <Table.Header labelText={'ID'} />,
                            accessor: 'id',
                        },
                        {
                            header: <Table.Header labelText={'Username'} />,
                            accessor: 'username',
                        },
                        {
                            header: <Table.Header labelText="FirstName" />,
                            accessor: 'firstName',
                        },
                        {
                            header: <Table.Header labelText="LastName" />,
                            accessor: 'lastName',
                        },
                        {
                            header: <Table.Header labelText="Registration Date" />,
                            accessor: 'createdAt',
                        },
                    ]}
                    data={users.map((user, index) => ({
                        id: <h4 className="font-medium">{++index}</h4>,
                        username: <h4 className="font-medium">{user?.username}</h4>,
                        firstName: <h4 className="font-medium">{user?.firstName}</h4>,
                        lastName: <h4 className="font-medium">{user?.lastName}</h4>,
                        createdAt: <h4 className="font-medium">{dayjs(user?.createdAt).format('LL')}</h4>,
                    }))}
                />
                <button onClick={() => loadMore()} className="px-4 py-4 bg-gray-50 w-full font-bold">
                    Load more...
                </button>
            </div>
        </>
    );
};

export default HomeComponent;
