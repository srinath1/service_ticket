import { NextRequest, NextResponse } from "next/server";
import {
  ticketSchema,
  ticketPatchSchema,
} from "../../../../../validationSchemas/ticket";
import prisma from "../../../../../prisma/db";
import { revalidatePath } from "next/cache";
interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = ticketPatchSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!ticket) {
    return NextResponse.json({ error: "Ticket Not Found" }, { status: 404 });
  }
  if (body?.assignedToUserId) {
    console.log(body);
    body.assignedToUserId = parseInt(body.assignedToUserId);
  }
  const updateTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: { ...body },
  });
  return NextResponse.json(updateTicket);
}
export async function DELETE(request: NextRequest, { params }: Props) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!ticket) {
    return NextResponse.json({ error: "Ticket Not Found" }, { status: 404 });
  }
  await prisma.ticket.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ message: "Ticket Deleted" });
}
