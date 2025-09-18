import React from "react";
import { useForm } from "@inertiajs/react";

type FormData = {
  token: string;
  brand: string;
  last4: string;
  exp_month: string;
  exp_year: string;
};

export default function Create() {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    token: "",
    brand: "",
    last4: "",
    exp_month: "",
    exp_year: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("payment_methods.store"));
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">カード登録</h2>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block">カードトークン</label>
          <input
            type="text"
            value={data.token}
            onChange={(e) => setData("token", e.target.value)}
            className="border p-2 w-full"
          />
          {errors.token && <div className="text-red-500">{errors.token}</div>}
        </div>

        <div>
          <label className="block">ブランド</label>
          <input
            type="text"
            value={data.brand}
            onChange={(e) => setData("brand", e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block">カード番号下4桁</label>
          <input
            type="text"
            maxLength={4}
            value={data.last4}
            onChange={(e) => setData("last4", e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="flex space-x-2">
          <div>
            <label className="block">有効期限（月）</label>
            <input
              type="text"
              value={data.exp_month}
              onChange={(e) => setData("exp_month", e.target.value)}
              className="border p-2 w-24"
            />
          </div>
          <div>
            <label className="block">有効期限（年）</label>
            <input
              type="text"
              value={data.exp_year}
              onChange={(e) => setData("exp_year", e.target.value)}
              className="border p-2 w-32"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          登録
        </button>
      </form>
    </div>
  );
}
