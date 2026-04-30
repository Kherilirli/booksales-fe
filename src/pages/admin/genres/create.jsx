import { useState } from "react";
import { createGenre } from "../../../_services/genres";
import { useNavigate } from "react-router-dom";

export default function GenreCreate() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = new FormData();

            for (const key in formData) {
                payload.append(key, formData[key]);
            }

            await createGenre(payload);
            navigate("/admin/genres");
        } catch (error) {
            console.log(error.response?.data);
            alert("Gagal menambahkan genre");
        }
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Add Genre
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Tambahkan genre baru ke dalam sistem
                    </p>
                </div>
                <div className="max-w-xl bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nama Genre
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Masukkan nama genre"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Masukkan deskripsi"
                                rows="4"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="submit"
                                className="
                                flex items-center justify-center
                                text-white bg-indigo-700 hover:bg-indigo-800
                                focus:ring-4 focus:ring-indigo-300
                                font-medium rounded-lg text-sm px-5 py-2.5
                                dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800
                                shadow-md hover:shadow-lg
                                transform hover:scale-105 hover:-translate-y-0.5
                                transition duration-200
                            "
                            >
                                Create Genre
                            </button>
                            <button
                                type="reset"
                                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
