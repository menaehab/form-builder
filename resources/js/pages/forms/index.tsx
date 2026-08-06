import { useForm, router, Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { index as formsIndex, create as formsCreate, edit as formsEdit, update as formsUpdate, show as formsShow } from '@/routes/forms';

type Form = {
    id: string;
    name: string;
    description: string;
    created_at: string;
};

type PaginatedForms = {
    data: Form[];
    current_page: number;
    from: number | null;
    last_page: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
};

const formateDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Columns will be defined inside the Index component to compute row numbers across pages

export default function Index({ forms }: { forms: PaginatedForms }) {
    const columns = useMemo<ColumnDef<Form>[]>(() => [
        {
            // Sequential row number across pages
            id: 'row',
            header: '#',
            accessorFn: (_, index) => (forms.from ?? 0) + index,
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'created_at',
            header: 'Created At',
            cell: (info) => formateDate(info.getValue() as string),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (info) => {
                const form = info.row.original;

                return (
                    <>
                        <Link href={formsEdit.url({ id: form.id })}>
                            <Button variant="outline" size="sm">Edit</Button>
                        </Link>
                        <Link href={formsShow.url({ id: form.id })}>
                            <Button variant="outline" size="sm">Show</Button>
                        </Link>
                    </>
                );
            },
        },
    ], [forms.from]);
    const { data, setData } = useForm({
        search: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            formsIndex.url({ query: { search: data.search } }),
            {},
            { preserveState: true, preserveScroll: true },
        );
    };

    return (
        <div className="container mx-auto p-4">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Forms</h2>
                        <p className="text-muted-foreground">Manage your forms</p>
                    </div>
                    <Link href={formsCreate.url()}>
                        <Button>Create Form</Button>
                    </Link>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                        placeholder="Search forms..."
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                    />
                    <Button type="submit" variant="outline">Search</Button>
                </form>

                <DataTable columns={columns} data={forms.data} />

                <Pagination
                    links={forms.links}
                    from={forms.from}
                    to={forms.to}
                    total={forms.total}
                />
        </div>
        </div>
    );
}
