import React from "react";

type Payment = {
  id: number;
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed";
  transaction_id: string | null;
  created_at: string;
  method: {
    brand: string | null;
    last4: string | null;
  } | null;
};

type Props = {
  payments: Payment[];
};

export default function Index({ payments }: Props) {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">支払い履歴</h2>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">日付</th>
            <th className="p-2">金額</th>
            <th className="p-2">ステータス</th>
            <th className="p-2">カード</th>
            <th className="p-2">取引ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">
                {new Date(p.created_at).toLocaleString()}
              </td>
              <td className="p-2">
                {p.amount.toLocaleString()} {p.currency}
              </td>
              <td className="p-2">
                {p.status === "succeeded" ? "✅ 成功" : p.status === "failed" ? "❌ 失敗" : "⏳ 保留"}
              </td>
              <td className="p-2">
                {p.method
                  ? `${p.method.brand ?? ""} **** ${p.method.last4 ?? ""}`
                  : "-"}
              </td>
              <td className="p-2">{p.transaction_id ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
