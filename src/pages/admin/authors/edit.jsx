import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showAuthor, updateAuthor } from "../../../_services/authors";

export default function AuthorEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        photo: null,
        bio: "",
        _method: "PUT",
    });

    useEffect(() => {
        const fetchData = async () => {
            const [authorsData] = await Promise.all([showAuthor(id)]);

            setFormData({
                name: authorsData.name,
                photo: authorsData.photo,
                bio: authorsData.bio,
                _method: "PUT",
            });
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "photo") {
            setFormData({
                ...formData,
                photo: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const playload = new FormData();
            for (const key in formData) {
                if (key === "photo") {
                    if (formData.photo instanceof File) {
                        playload.append("photo", formData.photo);
                    }
                } else {
                    playload.append(key, formData[key]);
                }
            }

            await updateAuthor(id, playload);
            navigate("/admin/authors");
        } catch (error) {
            console.log(error);
            alert("Error update book");
        }
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Edit Author
                    </h1>
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
                                Save Data
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
