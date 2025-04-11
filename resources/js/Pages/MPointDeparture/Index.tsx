import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head, Link } from '@inertiajs/react';

type PointDeparture = {
    id: number;
    point_departure_name: string;
    zip: string;
    address: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Props = {
    m_point_departures: {
        data: PointDeparture[];
        links: PaginationLink[];
    };
};

export default function Index({ m_point_departures }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    出発地点マスタ
                </h2>
            }
        >
            <Head title="出発地点マスタ" />
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 py-24 mx-auto">
                                    <div className="flex pl-4 my-4 w-full mx-auto">
                                        <Link
                                            as="button"
                                            className="inline-flex items-center px-4 py-2 bg-blue-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                            href={route('MPointDepartures.create')}
                                        >
                                            新規作成
                                        </Link>
                                    </div>

                                    <div className="w-full mx-auto overflow-auto">
                                        <table className="table-auto w-full text-left whitespace-no-wrap" id="sort_table">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                                                        No.
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                                        出発地点名
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                                        出発地点郵便番号
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                                        出発地点住所
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">

                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {m_point_departures?.data?.length ? (
                                                m_point_departures.data.map((m_point_departure) => (
                                                    <tr key={m_point_departure.id}>
                                                        <td className="px-4 py-3">{m_point_departure.id}</td>
                                                        <td className="px-4 py-3">{m_point_departure.point_departure_name}</td>
                                                        <td className="px-4 py-3">{m_point_departure.zip}</td>
                                                        <td className="px-4 py-3">{m_point_departure.address}</td>
                                                        <td className="px-4 py-3">
                                                            <Link
                                                                as="button"
                                                                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                                                href={route('MPointDepartures.edit', { m_point_departure: m_point_departure.id })}
                                                            >
                                                                編集
                                                            </Link></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="text-center py-4">出発地点のデータがありません</td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Pagination links={m_point_departures.links} />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
