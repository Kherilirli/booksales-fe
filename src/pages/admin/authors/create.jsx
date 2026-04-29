import { useState } from "react";
import { createAuthor } from "../../../_services/authors";
import { useNavigate } from "react-router-dom";

export default function AuthorCreate() {
    const [formData, setFormData] = useState({
        name: "",
        photo: null,
        bio: ""
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value, files} = e.target;

        if(name === "photo") {
            setFormData({
                ...formData,
                photo: files[0],

            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = new FormData();

            for (const key in formData) {
                payload.append(key, formData[key]);
            }

            await createAuthor(payload);
            navigate("/admin/authors");
        } catch (error) {
            console.log(error.response?.data);
            alert("Gagal menambahkan author");
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Add Author
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Tambahkan penulis baru ke dalam sistem
                </p>
            </div>
            <div className="max-w-xl bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nama
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Masukkan nama penulis"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                        for="photo"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Photo
                        </label>
                        <input
                        type="file"
                        name="photo"
                        id="photo"
                        onChange={handleChange}
                        accept="image/"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        required
                        />
                    </div>
                     <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Bio
                        </label>

                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Masukkan bio"
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
                            Create Author
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
    );
}