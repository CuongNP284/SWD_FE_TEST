import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

const sidebarData = [
    {
        title: "CA Certificates",
        apis: [
            { method: "GET", name: "List all CA Certificates", path: "/ca_cert", details: "Retrieve a list of all available Certificate Authority (CA) certificates." },
            { method: "POST", name: "Create a new CA Certificate", path: "/ca_cert", details: "Create a new CA certificate with necessary details." },
            { method: "DELETE", name: "Delete a CA Certificate", path: "/ca_cert", details: "Delete a specified CA certificate." },
            { method: "GET", name: "Fetch a CA Certificate", path: "/ca_cert", details: "Fetch details of a specific CA certificate." },
            { method: "PATCH", name: "Update a CA Certificate", path: "/ca_cert", details: "Update an existing CA certificate." },
            { method: "PUT", name: "Upsert a CA Certificate", path: "/ca_cert", details: "Insert or update a CA certificate." },
        ],
    },
    {
        title: "Certificates", apis: [
            { method: "GET", name: "Fetch a CA Certificate", path: "/ca_cert", details: "Fetch details of a specific CA certificate." },
            { method: "PUT", name: "Upsert a CA Certificate", path: "/ca_cert", details: "Insert or update a CA certificate." },
            { method: "DELETE", name: "Delete a CA Certificate", path: "/ca_cert", details: "Delete a specified CA certificate." },
        ]
    },
    {
        title: "SNIs", apis: [
            { method: "DELETE", name: "Delete a CA Certificate", path: "/ca_cert", details: "Delete a specified CA certificate." },

        ]
    },
    {
        title: "Consumers", apis: [
            { method: "GET", name: "List all CA Certificates", path: "/ca_cert", details: "Retrieve a list of all available Certificate Authority (CA) certificates." },
            { method: "DELETE", name: "Delete a CA Certificate", path: "/ca_cert", details: "Delete a specified CA certificate." },

        ]
    },
];

const methodColors = {
    GET: "bg-blue-500",
    POST: "bg-green-500",
    DELETE: "bg-red-500",
    PATCH: "bg-teal-500",
    PUT: "bg-yellow-500",
};

export default function Sidebar() {
    const [openSections, setOpenSections] = useState({});
    const [selectedApi, setSelectedApi] = useState(null);

    const toggleSection = (title) => {
        setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    return (
        <div className="w-64 bg-gray-100 p-4 shadow-md h-screen overflow-auto">
            <h2 className="text-lg font-bold mb-4">Gateway Admin - EE</h2>
            {sidebarData.map((section, index) => (
                <div key={index} className="mb-2">
                    <button
                        onClick={() => toggleSection(section.title)}
                        className="w-full flex justify-between items-center p-3 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                        <span>{section.title}</span>
                        {openSections[section.title] ? <FaAngleDown /> : <FaAngleRight />}
                    </button>
                    {openSections[section.title] && section.apis.length > 0 && (
                        <div className="ml-4 mt-2">
                            {section.apis.map((api, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md transition cursor-pointer"
                                    onClick={() => setSelectedApi(api)}
                                >
                                    <span className={`px-2 py-1 text-white text-xs rounded ${methodColors[api.method]}`}>
                                        {api.method}
                                    </span>
                                    <span>{api.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
