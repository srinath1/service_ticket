import React from "react";
import prisma from "../../../prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { Status, Ticket } from "@prisma/client";
export interface SearchParams {
  page: string;
  status: Status;
  orderBy: keyof Ticket;
}
// interface SearchParams {
//   searchParams: { [key: string]: string | string[] | undefined };
// }

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  console.log("sp", typeof searchParams.status);
  const page = parseInt(searchParams.page) || 1;
  const statuses = Object.values(Status);
  const orderBy = searchParams?.orderBy ? searchParams?.orderBy : "createdAt";
  const status = statuses.includes(searchParams?.status)
    ? searchParams?.status
    : undefined;
  let where = {};
  if (status) {
    where = { status };
  } else {
    where = {
      NOT: [{ status: "CLOSED" as Status }],
    };
  }
  const ticketCount = await prisma.ticket.count({ where });

  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: {
      [orderBy]: "desc",
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  console.log("sp3", searchParams);

  return (
    <div className="mb-4">
      <Link
        href="/Tickets/new"
        className={buttonVariants({ variant: "default" })}
      >
        New Ticket
      </Link>
      <StatusFilter />
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
