import { useEffect, useState } from "react";
import { getGenres } from "../../../_services/genres";
import { Link } from "react-router-dom";

export default function AdminGenres() {
    const [genres, setGenres] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getGenres();
            setGenres(data);
        };
        fetchData();
    }, []);

    const filteredGenres = genres.filter(g =>
        g.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Genre
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Kelola data genre buku
                </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 border-b dark:border-gray-700">
                    <input
                        type="text"
                        placeholder="Cari genre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/3 px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none text-white"
                    />
                    <Link 
                        to={"create"}
                        className="
                        flex items-center justify-center
                        text-white bg-indigo-700 hover:bg-indigo-800
                        focus:ring-4 focus:ring-indigo-300
                        font-medium rounded-lg text-sm px-4 py-2
                        dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800
                        shadow-md hover:shadow-lg
                        transform hover:scale-105 transition duration-200
                        "
                    >
                        <svg
                            className="h-3.5 w-3.5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            />
                        </svg>
                        Add Genre
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">

                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Genre</th>
                                <th className="px-6 py-4">Deskripsi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredGenres.length > 0 ? (
                                filteredGenres.map((genre) => (
                                    <tr 
                                        key={genre.id} 
                                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {genre.id}
                                        </td>

                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {genre.name}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {genre.description}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-10 text-gray-500">
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