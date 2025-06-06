import React from "react";
import { useForm, router } from "@inertiajs/react";

type Props = {
  isEdit?: boolean;
  rental_car?: {
    id: number;
    car_type: string;
    car_inspection: string;
    car_image_front: string | null;
    car_image_side: string | null;
    car_image_rear: string | null;
    new_car_image_front: File | null;
    new_car_image_side: File | null;
    new_car_image_rear: File | null;
    memo: string;
  } | null;
  onSuccess?: () => void;
};

export default function Form({ isEdit = false, rental_car = null, onSuccess }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        car_type: rental_car?.car_type ?? '',
        car_inspection: rental_car?.car_inspection ?? '',
        car_image_front: rental_car?.car_image_front ?? '',
        car_image_side: rental_car?.car_image_side ?? '',
        car_image_rear: rental_car?.car_image_rear ?? '',
        memo: rental_car?.memo ?? '',
        new_car_image_front: null as File | null,
        new_car_image_side: null as File | null,
        new_car_image_rear: null as File | null,

        _method: isEdit ? 'put' : '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name } = e.target;

        if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
            const files = e.target.files;
            if (files && files.length > 0) {
                setData('new_car_image_front', files[0]);
            }
        } else {
            const value = e.target.value;
            setData(name as keyof typeof data, value);
        }
  };

  const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('car_type', data.car_type);
        formData.append('car_inspection', data.car_inspection);
        formData.append('memo', data.memo);

        if (isEdit) {
            formData.append('_method', 'put');
        }

        if (isEdit) {
            if (data.new_car_image_front instanceof File) {
                formData.append('new_car_image_front', data.new_car_image_front);
            }
            if (rental_car?.car_image_front) {
                formData.append('new_car_image_front', rental_car.car_image_front);
            }
            if (data.new_car_image_side instanceof File) {
                formData.append('new_car_image_side', data.new_car_image_side);
            }
            if (rental_car?.car_image_side) {
                formData.append('new_car_image_side', rental_car.car_image_side);
            }
            if (data.new_car_image_rear instanceof File) {
                formData.append('new_car_image_rear', data.new_car_image_rear);
            }
            if (rental_car?.car_image_rear) {
                formData.append('new_car_image_rear', rental_car.car_image_rear);
            }
        } else {
            if (data.new_car_image_front instanceof File) {
                formData.append('new_car_image_front', data.new_car_image_front);
            }
            if (data.new_car_image_side instanceof File) {
                formData.append('new_car_image_side', data.new_car_image_side);
            }
            if (data.new_car_image_rear instanceof File) {
                formData.append('new_car_image_rear', data.new_car_image_rear);
            }
        }

        const url = isEdit && rental_car ? `/rental_cars/${rental_car.id}` : '/rental_cars/confirm';
        post(url, {
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
            onError: (errors: Record<string, string>) => {
                console.error("バリデーションエラー:", errors);
            },
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
  };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container px-5 py-8 mx-auto">
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        {/* 車種 */}
                        <div className="p-2 w-full">
                            <label htmlFor="car_type" className="leading-7 text-sm text-gray-600">
                                車種<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="car_type"
                                name="car_type"
                                value={data.car_type}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.car_type && (
                                <div className="mt-2 text-red-500 text-xs">{errors.car_type}</div>
                            )}
                        </div>

                        {/* 車検 */}
                        <div className="p-2 w-full">
                            <label htmlFor="car_inspection" className="leading-7 text-sm text-gray-600">
                                車検
                            </label>
                            <input
                                type="text"
                                id="car_inspection"
                                name="car_inspection"
                                value={data.car_inspection}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.car_inspection && (
                                <div className="mt-2 text-red-500 text-xs">{errors.car_inspection}</div>
                            )}
                        </div>

                        {/* 正面画像*/}
                        <div className="p-2 w-full">
                            <label htmlFor="new_car_image_front" className="leading-7 text-sm text-gray-600">
                                正面画像
                            </label>
                            <input
                                type="file"
                                id="new_car_image_front"
                                name="new_car_image_front"
                                onChange={handleChange}
                                accept="image/*"
                                className="w-full px-3 py-2"
                            />
                            {isEdit
                                ? errors.new_car_image_front && (
                                    <div className="mt-2 text-red-500 text-xs">{errors.new_car_image_front}</div>
                                )
                                : errors.car_image_front && (
                                    <div className="mt-2 text-red-500 text-xs">{errors.car_image_front}</div>
                                )
                            }
                        </div>
                        {/* 画像がある場合に表示（編集時のみ） */}
                        {isEdit && rental_car?.car_image_front && (
                            <div className="p-2 w-full">
                                <label className="leading-7 text-sm text-gray-600">現在の画像</label>
                                <div className="mt-1">
                                    <img
                                         src={`/storage/${rental_car.car_image_front}`}
                                        alt="画像"
                                        className="max-w-full h-auto rounded border border-gray-300"
                                    />
                                </div>
                            </div>
                        )}

                        {/* サイド画像*/}
                        <div className="p-2 w-full">
                            <label htmlFor="new_car_image_side" className="leading-7 text-sm text-gray-600">
                                サイド画像
                            </label>
                            <input
                                type="file"
                                id="new_car_image_side"
                                name="new_car_image_side"
                                onChange={handleChange}
                                accept="image/*"
                                className="w-full px-3 py-2"
                            />
                            {isEdit
                                ? errors.new_car_image_side && (
                                    <div className="mt-2 text-red-500 text-xs">{errors.new_car_image_side}</div>
                                )
                                : errors.car_image_side && (
                                    <div className="mt-2 text-red-500 text-xs">{errors.car_image_side}</div>
                                )
                            }
                        </div>
                        {/* 画像がある場合に表示（編集時のみ） */}
                        {isEdit && rental_car?.car_image_side && (
                            <div className="p-2 w-full">
                                <label className="leading-7 text-sm text-gray-600">現在の画像</label>
                                <div className="mt-1">
                                    <img
                                         src={`/storage/${rental_car.car_image_side}`}
                                        alt="画像"
                                        className="max-w-full h-auto rounded border border-gray-300"
                                    />
                                </div>
                            </div>
                        )}

                        {/* 後部画像*/}
                        <div className="p-2 w-full">
                            <label htmlFor="new_car_image_rear" className="leading-7 text-sm text-gray-600">
                                後部画像
                            </label>
                            <input
                                type="file"
                                id="new_car_image_rear"
                                name="new_car_image_rear"
                                onChange={handleChange}
                                accept="image/*"
                                className="w-full px-3 py-2"
                            />
                            {isEdit
                                ? errors.new_car_image_rear && (
                                    <div className="mt-2 text-red-500 text-xs">{errors.new_car_image_rear}</div>
                                )
                                : errors.car_image_rear && (
                                    <div className="mt-2 text-red-500 text-xs">{errors.car_image_rear}</div>
                                )
                            }
                        </div>
                        {/* 画像がある場合に表示（編集時のみ） */}
                        {isEdit && rental_car?.car_image_rear && (
                            <div className="p-2 w-full">
                                <label className="leading-7 text-sm text-gray-600">現在の画像</label>
                                <div className="mt-1">
                                    <img
                                         src={`/storage/${rental_car.car_image_rear}`}
                                        alt="画像"
                                        className="max-w-full h-auto rounded border border-gray-300"
                                    />
                                </div>
                            </div>
                        )}

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
