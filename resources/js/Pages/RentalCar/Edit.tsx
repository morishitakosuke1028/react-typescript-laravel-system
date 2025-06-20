import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import RentalCarForm from "@/Components/RentalCar/Form";

type RentalCar = {
    id: number;
    car_type: string;
    car_inspection: string;
    memo: string;
    car_image_front?: string;
    car_image_side?: string;
    car_image_rear?: string;
};

type Props = {
    rental_car: RentalCar;
};

export default function Edit({ rental_car }: Props) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (confirm('本当に削除しますか？')) {
            destroy(route('RentalCars.destroy', rental_car.id));
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    レンタカー編集
                </h2>
            }
        >
            <Head title="レンタカー編集" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <section className="text-gray-600 body-font relative">
                                <RentalCarForm
                                    isEdit={true}
                                    rental_car={rental_car}
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
