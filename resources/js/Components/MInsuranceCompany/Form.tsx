import React from "react";
import { useForm } from "@inertiajs/react";

type Props = {
    isEdit?: boolean;
    m_insurance_company?: {
        id: number;
        point_departure_name: string;
        zip: string;
        address: string;
    } | null;
    onSuccess?: () => void;
};

export default function Form({ isEdit = false, m_insurance_company = null, onSuccess }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        point_departure_name: m_insurance_company?.point_departure_name ?? '',
        zip: m_insurance_company?.zip ?? '',
        address: m_insurance_company?.address ?? '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && m_insurance_company) {
            put(`/m_insurance_companies/${m_insurance_company.id}`, {
                onSuccess: () => {
                    if (onSuccess) onSuccess();
                },
                onError: (errors) => {
                    console.error("バリデーションエラー:", errors);
                }
            });
        } else {
            post('/m_insurance_companies', {
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
                        {/* 出発地点名 */}
                        <div className="p-2 w-full">
                            <label htmlFor="point_departure_name" className="leading-7 text-sm text-gray-600">
                                出発地点名<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="point_departure_name"
                                name="point_departure_name"
                                value={data.point_departure_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.point_departure_name && (
                                <div className="mt-2 text-red-500 text-xs">{errors.point_departure_name}</div>
                            )}
                        </div>

                        {/* 郵便番号 */}
                        <div className="p-2 w-full">
                            <label htmlFor="zip" className="leading-7 text-sm text-gray-600">
                                郵便番号
                            </label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                value={data.zip}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.zip && (
                                <div className="mt-2 text-red-500 text-xs">{errors.zip}</div>
                            )}
                        </div>

                        {/* 住所 */}
                        <div className="p-2 w-full">
                            <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                                住所
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={data.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.address && (
                                <div className="mt-2 text-red-500 text-xs">{errors.address}</div>
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
