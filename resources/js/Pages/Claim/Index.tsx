import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head, Link } from '@inertiajs/react';

type InsuranceCompany = {
    id: number;
    insurance_company_name: string;
};

type Claim = {
    id: number;
    m_point_departure_id: number;
    other_point_departure_address: string;
    local_address: string;
    arrival_point_address: string;
    transportation_image: string;
    price: number;
    m_insurance_company_id: number;
    status: number;
    m_unit_price_id: number;
    workday: string | null;
    worktime: string | null;
    name: string;
    customer_contact: string;
    insurance_company?: InsuranceCompany;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Props = {
    claims: {
        data: Claim[];
        links: PaginationLink[];
    };
};

export default function Index({ claims }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    請求フォーム
                </h2>
            }
        >
            <Head title="請求フォーム" />
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
                                            href={route('Claims.create')}
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
                                                        顧客名
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                                        顧客連絡先
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                                        保険会社名
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {claims?.data?.length ? (
                                                claims.data.map((claim) => (
                                                    <tr key={claim.id}>
                                                        <td className="px-4 py-3">{claim.id}</td>
                                                        <td className="px-4 py-3">{claim.name}</td>
                                                        <td className="px-4 py-3">{claim.customer_contact}</td>
                                                        <td className="px-4 py-3">{claim.insurance_company?.insurance_company_name ?? ''}</td>
                                                        <td className="px-4 py-3">
                                                            <Link
                                                                as="button"
                                                                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                                                href={route('Claims.edit', { claim: claim.id })}
                                                            >
                                                                編集
                                                            </Link></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="text-center py-4">請求データがありません</td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Pagination links={claims.links} />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
