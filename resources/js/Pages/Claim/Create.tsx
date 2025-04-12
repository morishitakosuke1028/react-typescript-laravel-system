import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import MUnitPriceForm from "@/Components/MUnitPrice/Form";

export default function Create({}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    単価マスタ作成
                </h2>
            }
        >
            <Head title="単価マスタ作成" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <section className="text-gray-600 body-font relative">
                                <MUnitPriceForm />
                                <div className="text-center mt-4">
                                    <Link href={route('MUnitPrices.index')} className="text-white bg-gray-500 py-2 px-8 rounded">
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
