import React from 'react';
import { ITable } from './ITable';
import { IHeader } from './IHeader';

const Header: React.FC<IHeader> = ({ labelText }) => {
    return (
        <div className="flex items-center bg-gray-100 px-4 py-2">
            <h4 className="whitespace-nowrap text-sm capitalize">{labelText}</h4>
        </div>
    );
};

function Table<T extends string = string>({ columns, data }: ITable<T>) {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.accessor}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((d, i) => (
                    <tr key={i}>
                        {columns.map((col) => (
                            <td key={col.accessor}>
                                <div className="py-2 px-4 bn">{d[col.accessor]}</div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Object.assign(Table, { Header });
