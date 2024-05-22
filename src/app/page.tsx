import DashRecentTickets from "@/components/DashRecentTickets";
import prisma from "../../prisma/db";
import DashChart from "@/components/DashChart";
import dynamic from "next/dynamic";

export default async function Dashboard() {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: "CLOSED" }],
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  console.log("Dashboard Tickets", tickets);
  const groupTicket = await prisma.ticket.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });
  console.log("GT", groupTicket);
  const data = groupTicket.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    };
  });
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 px-2">
        <div>
          <DashRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashChart data={data} />
        </div>
      </div>
    </div>
  );
}
