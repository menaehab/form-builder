import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationProps = {
    links: PaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
};

/**
 * Decode HTML entities like &laquo; and &raquo; that Laravel includes in
 * paginator link labels.
 */
function decodeLabel(label: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = label;
    return txt.value;
}

function isNavLink(label: string): boolean {
    return label.includes('Previous') || label.includes('Next');
}

export function Pagination({ links, from, to, total }: PaginationProps) {
    const handlePage = (url: string | null) => {
        if (!url) return;
        router.get(url, {}, { preserveState: true, preserveScroll: true });
    };

    // Filter out the Previous / Next nav links from the numbered page links
    const prevLink = links[0];
    const nextLink = links[links.length - 1];
    const pageLinks = links.slice(1, -1);

    return (
        <div className="flex items-center justify-between">
            {/* Results summary */}
            <p className="text-sm text-muted-foreground">
                {from && to ? (
                    <>
                        Showing <span className="font-medium">{from}</span>–
                        <span className="font-medium">{to}</span> of{' '}
                        <span className="font-medium">{total}</span> results
                    </>
                ) : (
                    <>No results</>
                )}
            </p>

            {/* Pagination controls */}
            <nav className="flex items-center gap-1" aria-label="Pagination">
                {/* Previous */}
                <button
                    onClick={() => handlePage(prevLink.url)}
                    disabled={!prevLink.url}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Go to previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {pageLinks.map((link, i) =>
                        link.label === '...' ? (
                            <span
                                key={i}
                                className="px-2 py-1 text-sm text-muted-foreground"
                            >
                                …
                            </span>
                        ) : link.url ? (
                            <button
                                key={i}
                                onClick={() => handlePage(link.url)}
                                className={`min-w-8 rounded px-2 py-1 text-sm transition-colors ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground font-medium'
                                        : 'text-foreground hover:bg-muted'
                                }`}
                                aria-current={link.active ? 'page' : undefined}
                            >
                                {decodeLabel(link.label)}
                            </button>
                        ) : (
                            <span
                                key={i}
                                className="min-w-8 rounded px-2 py-1 text-sm text-muted-foreground"
                            >
                                {decodeLabel(link.label)}
                            </span>
                        ),
                    )}
                </div>

                {/* Next */}
                <button
                    onClick={() => handlePage(nextLink.url)}
                    disabled={!nextLink.url}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Go to next page"
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </button>
            </nav>
        </div>
    );
}
