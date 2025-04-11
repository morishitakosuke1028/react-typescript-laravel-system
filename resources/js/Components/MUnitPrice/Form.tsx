import React from "react";
import { useForm } from "@inertiajs/react";

type Props = {
    isEdit?: boolean;
    m_unit_price?: {
        id: number;
        unit_price_name: string;
        km_unit_price: number;
    } | null;
    onSuccess?: () => void;
};

export default function Form({ isEdit = false, m_unit_price = null, onSuccess }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        unit_price_name: m_unit_price?.unit_price_name ?? '',
        km_unit_price: m_unit_price?.km_unit_price ?? '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && m_unit_price) {
            put(`/m_unit_prices/${m_unit_price.id}`, {
                onSuccess: () => {
                    if (onSuccess) onSuccess();
                },
                onError: (errors) => {
                    console.error("バリデーションエラー:", errors);
                }
            });
        } else {
            post('/m_unit_prices', {
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
                        {/* 単価名 */}
                        <div className="p-2 w-full">
                            <label htmlFor="unit_price_name" className="leading-7 text-sm text-gray-600">
                                単価名<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="unit_price_name"
                                name="unit_price_name"
                                value={data.unit_price_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.unit_price_name && (
                                <div className="mt-2 text-red-500 text-xs">{errors.unit_price_name}</div>
                            )}
                        </div>

                        {/* キロ単価 */}
                        <div className="p-2 w-full">
                            <label htmlFor="km_unit_price" className="leading-7 text-sm text-gray-600">
                                キロ単価
                            </label>
                            <input
                                type="text"
                                id="km_unit_price"
                                name="km_unit_price"
                                value={data.km_unit_price}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.km_unit_price && (
                                <div className="mt-2 text-red-500 text-xs">{errors.km_unit_price}</div>
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
