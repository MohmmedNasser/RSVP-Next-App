"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface RSVP {
    id: string;
    name: string;
    email: string;
    accompany: number;
    attendance: string;
    notes: string;
}

interface RSVPTableProps {
    data: RSVP[];
}

const RSVPTable = ({ data }: RSVPTableProps) => {
    const [filter, setFilter] = useState("");

    const filteredData = data.filter((rsvp) =>
        rsvp.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <section>
            <div className="container mx-auto">
                <div className="flex items-center mb-8 relative ">
                    <Search className="absolute top-[10px] left-3 text-gray-400 size-5" />
                    <Input
                        placeholder="Filter by name..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="max-w-sm ps-10 rounded-full placeholder:text-gray-400"
                    />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow className="uppercase">
                            <TableHead className="text-gray-600">
                                Full Name
                            </TableHead>
                            <TableHead className="text-gray-600">
                                Email
                            </TableHead>
                            <TableHead className="text-gray-600">
                                Guests
                            </TableHead>
                            <TableHead className="text-gray-600">
                                Attendance Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData?.length > 0 ? (
                            filteredData?.map((rsvp: RSVP) => (
                                <TableRow key={rsvp.id}>
                                    <TableCell className="py-3">
                                        {rsvp.name}
                                    </TableCell>
                                    <TableCell className="py-3">
                                        {rsvp.email}
                                    </TableCell>
                                    <TableCell className="py-3">
                                        {rsvp.accompany}
                                    </TableCell>
                                    <TableCell className="py-3">
                                        {rsvp.attendance === "yes" ? (
                                            <span className="text-green-600 bg-green-100 py-1 px-3 rounded-full">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="text-red-600 bg-red-100 py-1 px-3 rounded-full">
                                                No
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
};

export default RSVPTable;
