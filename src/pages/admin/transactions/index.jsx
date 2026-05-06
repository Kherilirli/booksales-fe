import { useEffect, useState } from "react";
import { getTransactions } from "../../../_services/transactions";
import { Link } from "react-router-dom";
import { bookImageStorage } from "../../../_api";

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [openDropdownId, setOpenDropdownId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTransactions();
            setTransactions(data);
        };
        fetchData();
    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    const filteredTransactions = transactions.filter((trx) =>
        trx.book?.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Transactions
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Kelola semua transaksi customer
                </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
                    <input
                        type="text"
                        placeholder="Cari buku..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/3 px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none text-white"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Order</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Book</th>
                                <th className="px-6 py-4">Qty</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((trx) => (
                                    <tr
                                        key={trx.id}
                                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        <td className="px-6 py-4 text-white">
                                            {trx.id}
                                        </td>
                                        <td className="px-6 py-4 text-white">
                                            {trx.order_number}
                                        </td>
                                        <td className="px-6 py-4 text-white">
                                            {trx.user?.name || "-"}
                                        </td>
                                        <td className="px-6 py-4 flex items-center gap-3 text-white">
                                            <img
                                                src={`${bookImageStorage}/${trx.book?.cover_photo}`}
                                                alt=""
                                                className="w-12 h-16 object-cover rounded"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "https://via.placeholder.com/50";
                                                }}
                                            />
                                            <span>{trx.book?.title}</span>
                                        </td>
                                        <td className="px-6 py-4 text-white">
                                            {trx.quantity}
                                        </td>
                                        <td className="px-6 py-4 text-indigo-400 font-semibold">
                                            {formatRupiah(trx.total_amount)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {new Date(
                                                trx.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 relative">
                                            <button
                                                onClick={() =>
                                                    toggleDropdown(trx.id)
                                                }
                                                className="text-gray-400 hover:text-white"
                                            >
                                                ⋮
                                            </button>

                                            {openDropdownId === trx.id && (
                                                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded shadow-lg z-10">
                                                    <ul className="text-sm">
                                                        <li>
                                                            <Link
                                                                to={`/admin/transactions/${trx.id}`}
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-white"
                                                            >
                                                                Detail
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center py-10 text-gray-500"
                                    >
                                        Data tidak ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}