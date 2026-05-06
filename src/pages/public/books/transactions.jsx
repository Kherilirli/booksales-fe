import { useEffect, useState } from "react";
import { getTransactions } from "../../../_services/transactions";
import { bookImageStorage } from "../../../_api";

export default function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
            } catch (error) {
                setError(error?.response?.data?.message || "Terjadi kesalahan");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="text-center text-white p-6">Loading...</p>;
    if (error) return <p className="text-center text-red-500 p-6">{error}</p>;

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Riwayat Transaksi
            </h1>

            {transactions.length === 0 ? (
                <p className="text-center text-gray-400">
                    Belum ada transaksi
                </p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {transactions.map((trx) => (
                        <div
                            key={trx.id}
                            className="bg-[#1e293b] rounded-xl p-5 shadow-lg hover:shadow-2xl transition"
                        >
                            <img
                                src={`${bookImageStorage}/${trx.book?.cover_photo}`}
                                alt={trx.book?.title}
                                className="w-full h-56 object-cover rounded-lg mb-4"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/150";
                                }}
                            />
                            <h2 className="text-lg font-semibold mb-2">
                                {trx.book?.title}
                            </h2>
                            <div className="text-sm text-gray-300 space-y-1">
                                <p>Harga: {formatRupiah(trx.book?.price)}</p>
                                <p>Jumlah: {trx.quantity} pcs</p>
                                <p>
                                    Tanggal:{" "}
                                    {new Date(
                                        trx.created_at
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-xs text-gray-400">
                                    {trx.order_number}
                                </span>

                                <span className="text-indigo-400 font-bold text-lg">
                                    {formatRupiah(trx.total_amount)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}