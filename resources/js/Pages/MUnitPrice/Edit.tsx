import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import MUnitPriceForm from "@/Components/MUnitPrice/Form";

type UnitPrice = {
    id: number;
    unit_price_name: string;
    km_unit_price: number;
};

type Props = {
    m_unit_price: UnitPrice;
};

export default function Edit({ m_unit_price }: Props) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (confirm('本当に削除しますか？')) {
            destroy(route('MUnitPrices.destroy', m_unit_price.id));
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    単価マスタ編集
                </h2>
            }
        >
            <Head title="単価マスタ編集" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <section className="text-gray-600 body-font relative">
                                <MUnitPriceForm
                                    isEdit={true}
                                    m_unit_price={m_unit_price}
                                />
                                <div className="mt-4 text-center">
                                    <Link href={route('MUnitPrices.index')} className="text-white bg-gray-500 py-2 px-8 rounded">
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
