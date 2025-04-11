import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head, Link } from '@inertiajs/react';

type InsuranceCompany = {
    id: number;
    insurance_company_name: string;
    policy_number: string;
    person_name: string;
    tel: string;
    email: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};


type Props = {
    m_insurance_companies: {
        data: InsuranceCompany[];
        links: PaginationLink[];
    };
};

export default function Index({ m_insurance_companies }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    保険会社マスタ
                </h2>
            }
        >
            <Head title="保険会社マスタ" />
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
                                            href={route('MInsuranceCompanies.create')}
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
                                                        保険会社名
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                                        証券番号
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                                        担当者名
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                                        電話番号
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                                        メールアドレス
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">

                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {m_insurance_companies?.data?.length ? (
                                                m_insurance_companies.data.map((m_insurance_company) => (
                                                    <tr key={m_insurance_company.id}>
                                                        <td className="px-4 py-3">{m_insurance_company.id}</td>
                                                        <td className="px-4 py-3">{m_insurance_company.insurance_company_name}</td>
                                                        <td className="px-4 py-3">{m_insurance_company.policy_number}</td>
                                                        <td className="px-4 py-3">{m_insurance_company.person_name}</td>
                                                        <td className="px-4 py-3">{m_insurance_company.tel}</td>
                                                        <td className="px-4 py-3">{m_insurance_company.email}</td>
                                                        <td className="px-4 py-3">
                                                            <Link
                                                                as="button"
                                                                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                                                href={route('MInsuranceCompanies.edit', { m_insurance_company: m_insurance_company.id })}
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
                                    <Pagination links={m_insurance_companies.links} />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
