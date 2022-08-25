type Column<T extends string = string> = {
    header: string | JSX.Element | JSX.Element[];
    accessor: T;
};

type Data<T extends string = string> = {
    [key in T]: string | JSX.Element | JSX.Element[];
};

export interface ITable<T extends string = string> {
    columns: Column<T>[];
    data: Data<T>[];
}
