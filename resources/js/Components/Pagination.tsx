import React from "react";
import { Link } from "@inertiajs/react";

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Props = {
    links: PaginationLink[];
};

export default function Pagination({ links }: Props) {
    if (!links || links.length <= 3) return null;

    const parseLabel = (label: string) =>
        label
            .replace(/&laquo;/g, "«")
            .replace(/&raquo;/g, "»")
            .replace("Next", "次へ")
            .replace("Previous", "前へ");

    return (
        <nav className="flex justify-center mt-6" aria-label="ページネーション">
            <ul className="inline-flex items-center gap-1">
                {links.map((link, index) => (
                    <li key={index}>
                        {link.url ? (
                            <Link
                                href={link.url}
                                className={`px-4 py-2 border text-sm rounded transition duration-150 ease-in-out ${
                                    link.active
                                        ? "bg-blue-500 text-white font-bold"
                                        : "bg-white text-blue-500 hover:bg-gray-100"
                                }`}
                            >
                                {parseLabel(link.label)}
                            </Link>
                        ) : (
                            <span
                                className="px-4 py-2 border text-sm text-gray-400 bg-gray-100 rounded cursor-not-allowed"
                                aria-disabled="true"
                            >
                                {parseLabel(link.label)}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
