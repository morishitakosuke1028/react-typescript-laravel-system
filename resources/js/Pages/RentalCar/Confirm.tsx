import React from 'react';
import { useForm, router } from '@inertiajs/react';

type RentalCarFormData = {
  car_type: string;
  car_inspection: string;
  memo: string;
  new_car_image_front?: string;
  new_car_image_side?: string;
  new_car_image_rear?: string;
};

type Props = {
  form: RentalCarFormData;
};

export default function Confirm({ form }: Props) {
  const { data, post, processing } = useForm(form);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/rental_cars', {
      forceFormData: true,
    });
  };

  const handleBack = () => {
    router.visit('/rental_cars/create', {
      method: 'get',
      data,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container px-5 py-8 mx-auto">
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <h2 className="text-xl font-bold mb-4">内容確認</h2>

          <div className="mb-4">
            <div className="font-semibold">車種</div>
            <div>{form.car_type}</div>
          </div>

          <div className="mb-4">
            <div className="font-semibold">車検</div>
            <div>{form.car_inspection}</div>
          </div>

          <div className="mb-4">
            <div className="font-semibold">メモ</div>
            <div className="whitespace-pre-wrap">{form.memo}</div>
          </div>

          {/* 画像表示 */}
          {form.new_car_image_front && (
            <div className="mb-4">
              <div className="font-semibold">正面画像</div>
              <img src={`/storage/${form.new_car_image_front}`} alt="正面" className="w-full border rounded" />
            </div>
          )}

          {form.new_car_image_side && (
            <div className="mb-4">
              <div className="font-semibold">サイド画像</div>
              <img src={`/storage/${form.new_car_image_side}`} alt="サイド" className="w-full border rounded" />
            </div>
          )}

          {form.new_car_image_rear && (
            <div className="mb-4">
              <div className="font-semibold">後部画像</div>
              <img src={`/storage/${form.new_car_image_rear}`} alt="後部" className="w-full border rounded" />
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="text-gray-600 border border-gray-400 px-6 py-2 rounded hover:bg-gray-100"
            >
              戻る
            </button>

            <button
              type="submit"
              disabled={processing}
              className="text-white bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
            >
              登録する
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
