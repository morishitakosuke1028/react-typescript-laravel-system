import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import type { PageProps as InertiaPageProps } from '@inertiajs/core';

type CustomPageProps = InertiaPageProps & {
    googleMapsApiKey: string;
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
};

type Props = {
    isEdit?: boolean;
    claim?: {
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
    } | null;
    onSuccess?: () => void;
    pointDepartures: MPointDeparture[];
    insuranceCompanies: MInsuranceCompany[];
    unitPrices: MUnitPrice[];
};

export default function Form({
    isEdit = false,
    claim = null,
    onSuccess,
    pointDepartures,
    insuranceCompanies,
    unitPrices
    }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: claim?.name ?? '',
        customer_contact: claim?.customer_contact ?? '',
        m_point_departure_id: claim?.m_point_departure_id ?? '',
        other_point_departure_address: claim?.other_point_departure_address ?? '',
        local_address: claim?.local_address ?? '',
        arrival_point_address: claim?.arrival_point_address ?? '',
        transportation_image: claim?.transportation_image ?? '',
        price: claim?.price ?? '',
        m_insurance_company_id: claim?.m_insurance_company_id ?? '',
        status: claim?.status ?? '',
        m_unit_price_id: claim?.m_unit_price_id ?? '',
        workday: claim?.workday ?? '',
        worktime_raw: claim?.worktime?.slice(11, 16) ?? '',
        worktime: claim?.worktime ?? '',
    });

    const { props: page } = usePage<CustomPageProps>();

    const googleMapsApiKey = page.googleMapsApiKey;

    const getPointDepartureAddress = (id: number): string | null => {
        const found = pointDepartures.find(p => p.id === Number(id));
        return found?.address ?? null;
    };

    const fetchDistance = async () => {
        const origin = data.other_point_departure_address || getPointDepartureAddress(Number(data.m_point_departure_id));
        const destination = data.local_address;

        if (!origin || !destination) return;

        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${googleMapsApiKey}&language=ja`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.status === 'OK') {
                const distance = result.rows[0].elements[0].distance.text;
                alert(`距離: ${distance}`);
            } else {
                console.error(result);
                alert('距離の取得に失敗しました');
            }
        } catch (error) {
            console.error(error);
            alert('API通信に失敗しました');
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);

        if (name === 'workday' || name === 'worktime_raw') {
            const day = name === 'workday' ? value : data.workday;
            const time = name === 'worktime_raw' ? value : data.worktime_raw;

            if (day && time) {
                setData('worktime', `${day} ${time}:00`);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && claim) {
            put(`/claims/${claim.id}`, {
                onSuccess: () => {
                    if (onSuccess) onSuccess();
                },
                onError: (errors) => {
                    console.error("バリデーションエラー:", errors);
                }
            });
        } else {
            post('/claims', {
                onSuccess: () => {
                    if (onSuccess) onSuccess();
                },
                onError: (errors) => {
                    console.error("バリデーションエラー:", errors);
                }
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container px-5 py-8 mx-auto">
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        {/* 顧客名*/}
                        <div className="p-2 w-full">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                顧客名
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.name && (
                                <div className="mt-2 text-red-500 text-xs">{errors.name}</div>
                            )}
                        </div>

                        {/* 顧客連絡先*/}
                        <div className="p-2 w-full">
                            <label htmlFor="customer_contact" className="leading-7 text-sm text-gray-600">
                                顧客連絡先
                            </label>
                            <input
                                type="text"
                                id="customer_contact"
                                name="customer_contact"
                                value={data.customer_contact}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.customer_contact && (
                                <div className="mt-2 text-red-500 text-xs">{errors.customer_contact}</div>
                            )}
                        </div>

                        {/* 出発地点 */}
                        <div className="p-2 w-full">
                            <label htmlFor="m_point_departure_id" className="text-sm text-gray-600">
                                出発地点（選択）
                            </label>
                            <select
                                id="m_point_departure_id"
                                name="m_point_departure_id"
                                value={data.m_point_departure_id}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">選択してください</option>
                                {pointDepartures.map((departure) => (
                                    <option key={departure.id} value={departure.id}>
                                        {departure.point_departure_name}
                                    </option>
                                ))}
                            </select>
                            {errors.m_point_departure_id && <div className="mt-2 text-red-500 text-xs">{errors.m_point_departure_id}</div>}
                        </div>

                        {/* その他出発地点住所*/}
                        <div className="p-2 w-full">
                            <label htmlFor="other_point_departure_address" className="leading-7 text-sm text-gray-600">
                                その他出発地点住所
                            </label>
                            <input
                                type="text"
                                id="other_point_departure_address"
                                name="other_point_departure_address"
                                value={data.other_point_departure_address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.other_point_departure_address && (
                                <div className="mt-2 text-red-500 text-xs">{errors.other_point_departure_address}</div>
                            )}
                        </div>

                        {/* 現地住所*/}
                        <div className="p-2 w-full">
                            <label htmlFor="local_address" className="leading-7 text-sm text-gray-600">
                                現地住所
                            </label>
                            <input
                                type="text"
                                id="local_address"
                                name="local_address"
                                value={data.local_address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.local_address && (
                                <div className="mt-2 text-red-500 text-xs">{errors.local_address}</div>
                            )}
                        </div>

                        {/* 到着地点住所*/}
                        <div className="p-2 w-full">
                            <label htmlFor="arrival_point_addresslocal_address" className="leading-7 text-sm text-gray-600">
                                到着地点住所
                            </label>
                            <input
                                type="text"
                                id="arrival_point_address"
                                name="arrival_point_address"
                                value={data.arrival_point_address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.arrival_point_address && (
                                <div className="mt-2 text-red-500 text-xs">{errors.arrival_point_address}</div>
                            )}
                        </div>

                        <div className="p-2 w-full text-right">
                            <button
                                type="button"
                                onClick={fetchDistance}
                                className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                            >
                                距離を取得
                            </button>
                        </div>

                        {/* 搬送画像*/}
                        <div className="p-2 w-full">
                            <label htmlFor="transportation_image" className="leading-7 text-sm text-gray-600">
                                搬送画像
                            </label>
                            <input
                                type="file"
                                id="transportation_image"
                                name="transportation_image"
                                value={data.transportation_image}
                                onChange={handleChange}
                                className="w-full px-3 py-2"
                            />
                            {errors.transportation_image && (
                                <div className="mt-2 text-red-500 text-xs">{errors.transportation_image}</div>
                            )}
                        </div>

                        {/* 単価*/}
                        <div className="p-2 w-full">
                            <label htmlFor="m_unit_price_id" className="leading-7 text-sm text-gray-600">
                                単価
                            </label>
                            <select
                                id="m_unit_price_id"
                                name="m_unit_price_id"
                                value={data.m_unit_price_id}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">選択してください</option>
                                {unitPrices.map((unitPrice) => (
                                    <option key={unitPrice.id} value={unitPrice.id}>
                                        {unitPrice.unit_price_name}
                                    </option>
                                ))}
                            </select>
                            {errors.m_unit_price_id && (
                                <div className="mt-2 text-red-500 text-xs">{errors.m_unit_price_id}</div>
                            )}
                        </div>

                        {/* 料金*/}
                        <div className="p-2 w-full">
                            <label htmlFor="price" className="leading-7 text-sm text-gray-600">
                                料金
                            </label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={data.price}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.price && (
                                <div className="mt-2 text-red-500 text-xs">{errors.price}</div>
                            )}
                        </div>

                        {/* 保険会社*/}
                        <div className="p-2 w-full">
                            <label htmlFor="m_insurance_company_id" className="leading-7 text-sm text-gray-600">
                                保険会社
                            </label>
                            <select
                                id="m_insurance_company_id"
                                name="m_insurance_company_id"
                                value={data.m_insurance_company_id}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">選択してください</option>
                                {insuranceCompanies.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.insurance_company_name}
                                    </option>
                                ))}
                            </select>
                            {errors.m_insurance_company_id && (
                                <div className="mt-2 text-red-500 text-xs">{errors.m_insurance_company_id}</div>
                            )}
                        </div>
                        {/* 作業日*/}
                        <div className="p-2 w-full">
                            <label htmlFor="workday" className="leading-7 text-sm text-gray-600">
                                作業日
                            </label>
                            <input
                                type="date"
                                id="workday"
                                name="workday"
                                value={data.workday}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.workday && (
                                <div className="mt-2 text-red-500 text-xs">{errors.workday}</div>
                            )}
                        </div>

                        {/* 作業時分*/}
                        <div className="p-2 w-full">
                            <label htmlFor="worktime_raw" className="leading-7 text-sm text-gray-600">
                                作業　時：　分
                            </label>
                            <input
                                type="time"
                                id="worktime_raw"
                                name="worktime_raw"
                                value={data.worktime_raw}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.worktime && (
                                <div className="mt-2 text-red-500 text-xs">{errors.worktime}</div>
                            )}
                        </div>

                        {/* ステータス*/}
                        <div className="p-2 w-full">
                            <label htmlFor="status" className="leading-7 text-sm text-gray-600">
                                ステータス
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={data.status}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">選択してください</option>
                                <option value="1">一時保存</option>
                                <option value="0">完了</option>
                            </select>
                            {errors.status && (
                                <div className="mt-2 text-red-500 text-xs">{errors.status}</div>
                            )}
                        </div>

                        <div className="p-2 w-full text-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="text-white bg-blue-500 py-2 px-8 rounded hover:bg-blue-600"
                            >
                                {isEdit ? "更新" : "登録"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
