import { Prisma } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import TicketStatusBadge from "./TicketStatusBadge";
import Link from "next/link";
import TicketPriority from "./TicketPriority";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: { assignedToUser: true };
}>;

interface Props {
  tickets: TicketWithUser[];
}

const DashRecentTickets = ({ tickets }: Props) => {
  console.log("dashboardTickets", tickets);
  return (
    tickets && (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recently Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {tickets
              ? tickets.map((ticket) => (
                  <div className="flex items-center" key={ticket.id}>
                    <TicketStatusBadge status={ticket.status} />
                    <div className="ml-4 space-y-1">
                      <Link href={`/Tickets/${ticket.id}`}>
                        <p>{ticket.title}</p>
                        <p>{ticket.assignedToUser?.name || "Unassigned"}</p>
                      </Link>
                    </div>
                    <div className="ml-auto font-medium">
                      <TicketPriority priority={ticket?.priority} />
                    </div>
                  </div>
                ))
              : null}
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default DashRecentTickets;
