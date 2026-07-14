import { Link } from "@inertiajs/react"

export default function QuickAdd() {
    return (

        <Link
            href="/panel/artikel/create"
            className="flex group w-full h-full bg-gray-50 ring-1 ring-prim/20 rounded-xl justify-center items-center gap-1.5 px-4 py-2 text-prim text-xs font-medium transition-all ring-inset hover:bg-prim/5 hover:ring-2 hover:ease-in-out hover:duration-300"
        >
            <div className="flex justify-center gap-1 items-center">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Buat Artikel
            </div>
        </Link>
    )
}