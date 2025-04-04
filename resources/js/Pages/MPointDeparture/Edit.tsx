import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import MPointDepartureForm from "@/Components/MPointDeparture/Form";

type PointDeparture = {
    id: number;
    point_departure_name: string;
    zip: string;
    address: string;
};

type Props = {
    m_point_departure: PointDeparture;
};

export default function Edit({ m_point_departure }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    出発地点マスタ編集
                </h2>
            }
        >
            <Head title="出発地点マスタ編集" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <section className="text-gray-600 body-font relative">
                                <MPointDepartureForm
                                    isEdit={true}
                                    m_point_departure={m_point_departure}
                                />
                                <div className="text-center mt-4">
                                    <Link href={route('MPointDepartures.index')} className="text-white bg-gray-500 py-2 px-8 rounded">
                                        戻る
                                    </Link>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
