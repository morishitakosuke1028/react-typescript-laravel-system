import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import MInsuranceCompanyForm from "@/Components/MInsuranceCompany/Form";

type InsuranceCompany = {
    id: number;
    insurance_company_name: string;
    insurance_company_kana: string;
    policy_number: string;
    person_name: string;
    tel: string;
    email: string;
};

type Props = {
    m_insurance_company: InsuranceCompany;
};

export default function Edit({ m_insurance_company }: Props) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (confirm('本当に削除しますか？')) {
            destroy(route('MInsuranceCompanies.destroy', m_insurance_company.id));
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    保険会社マスタ編集
                </h2>
            }
        >
            <Head title="保険会社マスタ編集" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <section className="text-gray-600 body-font relative">
                                <MInsuranceCompanyForm
                                    isEdit={true}
                                    m_insurance_company={m_insurance_company}
                                />
                                <div className="mt-4 text-center">
                                    <Link href={route('MInsuranceCompanies.index')} className="text-white bg-gray-500 py-2 px-8 rounded">
                                        戻る
                                    </Link>
                                </div>
                                <div className="mt-3 text-center">
                                    <button
                                        className="text-white bg-red-500 py-2 px-8 rounded"
                                        onClick={handleDelete}
                                        disabled={processing}
                                    >
                                        削除
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
