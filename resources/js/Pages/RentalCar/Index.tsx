import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head, Link } from '@inertiajs/react';

type RentalCar = {
    id: number;
    car_type: string;
    car_inspection: string;
    car_image_front: string;
    car_image_side: string;
    car_image_rear: string;
    memo: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Props = {
    rental_cars: {
        data: RentalCar[];
        links: PaginationLink[];
    };
};

export default function Index({ rental_cars }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    レンタカーマスタ
                </h2>
            }
        >
            <Head title="レンタカーマスタ" />
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
                                            href={route('RentalCars.create')}
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
                                                        車種
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                                        車検
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                                        正面画像
                                                    </th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">

                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {rental_cars?.data?.length ? (
                                                rental_cars.data.map((rental_car) => (
                                                    <tr key={rental_car.id}>
                                                        <td className="px-4 py-3">{rental_car.id}</td>
                                                        <td className="px-4 py-3">{rental_car.car_inspection}</td>
                                                        <td className="px-4 py-3">{rental_car.memo}</td>
                                                        <td className="px-4 py-3"><img src={`/storage/${rental_car.car_image_front}`} /></td>
                                                        <td className="px-4 py-3">
                                                            <Link
                                                                as="button"
                                                                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                                                href={route('MUnitPrices.edit', { rental_car: rental_car.id })}
                                                            >
                                                                編集
                                                            </Link></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="text-center py-4">レンタカーのデータがありません</td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Pagination links={rental_cars.links} />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
