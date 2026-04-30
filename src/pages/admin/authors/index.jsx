import { useEffect, useState } from "react";
import { deleteAuthor, getAuthors } from "../../../_services/authors";
import { Link } from "react-router-dom";

export default function AdminAuthors() {
    const [authors, setAuthors] = useState([]);
    const [search, setSearch] = useState("");

    const [openDropdownId, setOpenDropdownId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAuthors();
            setAuthors(data);
        };
        fetchData();
    }, []);

    const filteredAuthors = authors.filter(g =>
        g.name.toLowerCase().includes(search.toLowerCase())
    );

    const toogleDropdown = (id) => {
            setOpenDropdownId(openDropdownId === id ? null : id);
        };
    
        const handleDelete = async (id) => {
            const confirmDelete = window.confirm(
                "Are you sure you want delete this author?",
            );
    
            if (confirmDelete) {
                await deleteAuthor(id);
                setAuthors(authors.filter((author) => author.id !== id));
            }
        };

    return (
        <section className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Author
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Kelola data penulis buku
                </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 border-b dark:border-gray-700">
                    <input
                        type="text"
                        placeholder="Cari author..."
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
                        Add Author
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">

                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Nama</th>
                                <th className="px-6 py-4">Photo</th>
                                <th className="px-6 py-4">Bio</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAuthors.length > 0 ? (
                                filteredAuthors.map((author) => (
                                    <tr 
                                        key={author.id} 
                                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {author.id}
                                        </td>

                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {author.name}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {author.photo}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {author.bio}
                                        </td>
                                        <td className="px-4 py-3 flex items-center justify-end relative">
                                            <button
                                                id={`dropdown-button-${author.id}`}
                                                onClick={() =>
                                                    toogleDropdown(author.id)
                                                }
                                                className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                type="button"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    aria-hidden="true"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                </svg>
                                            </button>
                                            {openDropdownId === author.id && (
                                                <div
                                                    id="apple-imac-27-dropdown"
                                                    className="absolute right-0 mt-2 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                    style={{
                                                        top: "100%",
                                                        right: "0",
                                                    }}
                                                >
                                                    <ul
                                                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                        aria-labelledby={`dropdown-button-${author.id}`}
                                                    >
                                                        <li>
                                                            <Link
                                                                to={`/admin/authors/edit/${author.id}`}
                                                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                Edit
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    author.id,
                                                                )
                                                            }
                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
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