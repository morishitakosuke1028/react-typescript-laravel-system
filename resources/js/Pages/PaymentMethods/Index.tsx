import React from "react";
import { Link, useForm, router } from "@inertiajs/react";

type PaymentMethod = {
  id: number;
  brand: string | null;
  last4: string | null;
  exp_month: number | null;
  exp_year: number | null;
};

type Props = {
  methods: PaymentMethod[];
};

export default function Index({ methods }: Props) {
  const { delete: destroy } = useForm();

  const handleDelete = (id: number) => {
    if (confirm("このカードを削除しますか？")) {
      destroy(route("payment_methods.destroy", id));
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">登録済みカード</h2>

      <Link
        href={route("payment_methods.create")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        カードを追加
      </Link>

      <table className="table-auto w-full mt-4 border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ブランド</th>
            <th className="p-2">番号</th>
            <th className="p-2">有効期限</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {methods.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="p-2">{m.brand ?? "-"}</td>
              <td className="p-2">**** **** **** {m.last4}</td>
              <td className="p-2">
                {m.exp_month}/{m.exp_year}
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(m.id)}
                  className="text-red-500 hover:underline"
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
