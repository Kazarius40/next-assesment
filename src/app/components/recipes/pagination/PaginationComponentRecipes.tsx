import Link from "next/link";

interface PaginationProps {
    page: number;
    total: number;
}

export default function PaginationComponentRecipes ({ page, total }: PaginationProps) {
    const limit = 30;
    return (
        <div>
            <Link href={`/pages/recipes?page=${page - 1}`}>
                <button disabled={page <= 1}>Попередня</button>
            </Link>

            <Link href={`/pages/recipes?page=${page + 1}`}>
                <button disabled={page * limit >= total}>Наступна</button>
            </Link>
        </div>
    );
}