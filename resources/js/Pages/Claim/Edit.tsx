import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ClaimForm from "@/Components/Claim/Form";

type Claim = {
    id: number;
    name: string;
    customer_contact: string;
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
    new_transportation_image: File | null;
};

type MPointDeparture = {
    id: number;
    point_departure_name: string;
    address: string;
};

type MInsuranceCompany = {
    id: number;
    insurance_company_name: string;
};

type MUnitPrice = {
    id: number;
    unit_price_name: string;
    km_unit_price: number;
};

type Props = {
    claim: Claim;
    pointDepartures: MPointDeparture[];
    insuranceCompanies: MInsuranceCompany[];
    unitPrices: MUnitPrice[];
};

export default function Edit({ claim, pointDepartures, insuranceCompanies, unitPrices }: Props) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (confirm('本当に削除しますか？')) {
            destroy(route('Claims.destroy', claim.id));
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    請求編集
                </h2>
            }
        >
            <Head title="請求編集" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <section className="text-gray-600 body-font relative">
                                <ClaimForm
                                    isEdit={true}
                                    claim={claim}
                                    pointDepartures={pointDepartures}
                                    insuranceCompanies={insuranceCompanies}
                                    unitPrices={unitPrices}
                                />
                                <div className="mt-4 text-center">
                                    <Link href={route('Claims.index')} className="text-white bg-gray-500 py-2 px-8 rounded">
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
