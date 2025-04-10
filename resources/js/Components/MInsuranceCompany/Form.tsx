import React from "react";
import { useForm } from "@inertiajs/react";

type Props = {
    isEdit?: boolean;
    m_insurance_company?: {
        id: number;
        insurance_company_name: string;
        insurance_company_kana: string;
        policy_number: string;
        person_name: string;
        tel: string;
        email: string;
    } | null;
    onSuccess?: () => void;
};

export default function Form({ isEdit = false, m_insurance_company = null, onSuccess }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        insurance_company_name: m_insurance_company?.insurance_company_name ?? '',
        insurance_company_kana: m_insurance_company?.insurance_company_kana ?? '',
        policy_number: m_insurance_company?.policy_number ?? '',
        person_name: m_insurance_company?.person_name ?? '',
        tel: m_insurance_company?.tel ?? '',
        email: m_insurance_company?.email ?? '',
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
                        {/* 保険会社名 */}
                        <div className="p-2 w-full">
                            <label htmlFor="insurance_company_name" className="leading-7 text-sm text-gray-600">
                                保険会社名<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="insurance_company_name"
                                name="insurance_company_name"
                                value={data.insurance_company_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.insurance_company_name && (
                                <div className="mt-2 text-red-500 text-xs">{errors.insurance_company_name}</div>
                            )}
                        </div>

                        {/* 保険会社名フリガナ */}
                        <div className="p-2 w-full">
                            <label htmlFor="insurance_company_kana" className="leading-7 text-sm text-gray-600">
                                保険会社名フリガナ<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="insurance_company_kana"
                                name="insurance_company_kana"
                                value={data.insurance_company_kana}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.insurance_company_kana && (
                                <div className="mt-2 text-red-500 text-xs">{errors.insurance_company_kana}</div>
                            )}
                        </div>

                        {/* 証券番号 */}
                        <div className="p-2 w-full">
                            <label htmlFor="policy_number" className="leading-7 text-sm text-gray-600">
                                証券番号
                            </label>
                            <input
                                type="text"
                                id="policy_number"
                                name="policy_number"
                                value={data.policy_number}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.policy_number && (
                                <div className="mt-2 text-red-500 text-xs">{errors.policy_number}</div>
                            )}
                        </div>

                        {/* 担当者名 */}
                        <div className="p-2 w-full">
                            <label htmlFor="person_name" className="leading-7 text-sm text-gray-600">
                                担当者名
                            </label>
                            <input
                                type="text"
                                id="person_name"
                                name="person_name"
                                value={data.person_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.person_name && (
                                <div className="mt-2 text-red-500 text-xs">{errors.person_name}</div>
                            )}
                        </div>

                        {/* 電話番号 */}
                        <div className="p-2 w-full">
                            <label htmlFor="tel" className="leading-7 text-sm text-gray-600">
                                電話番号
                            </label>
                            <input
                                type="text"
                                id="tel"
                                name="tel"
                                value={data.tel}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.tel && (
                                <div className="mt-2 text-red-500 text-xs">{errors.tel}</div>
                            )}
                        </div>

                        {/* メールアドレス */}
                        <div className="p-2 w-full">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                メールアドレス
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.email && (
                                <div className="mt-2 text-red-500 text-xs">{errors.email}</div>
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
