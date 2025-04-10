import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <nav className="flex justify-center mt-4">
            <ul className="inline-flex items-center -space-x-px">
                {links.map((link, index) => (
                    <li key={index}>
                        {link.url ? (
                            <Link
                                href={link.url}
                                className={`px-4 py-2 border text-sm ${
                                    link.active
                                        ? "bg-blue-500 text-white font-bold"
                                        : "bg-white text-blue-500 hover:bg-gray-100"
                                } rounded`}
                            >
                                {link.label
                                    .replace(/&laquo;/g, "«")
                                    .replace(/&raquo;/g, "»")
                                    .replace("Next", "次へ")
                                    .replace("Previous", "前へ")}
                            </Link>
                        ) : (
                            <span className="px-4 py-2 border text-gray-400 text-sm cursor-not-allowed">
                                {link.label
                                    .replace(/&laquo;/g, "«")
                                    .replace(/&raquo;/g, "»")
                                    .replace("Next", "次へ")
                                    .replace("Previous", "前へ")}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
