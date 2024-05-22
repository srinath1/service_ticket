"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import axios from "axios";

const DeleteButton = ({ ticketId }: { ticketId: number }) => {
  const [error, setError] = React.useState("");
  const [isDeleteing, setIsDeleting] = React.useState(false);
  const router = useRouter();
  const deleteTicket = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/tickets/" + ticketId);
      router.push("/Tickets");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError("Uknown Error Occured");
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          className={buttonVariants({ variant: "destructive" })}
          disabled={isDeleteing}
        >
          Delete Ticket
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              ticket and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={`${buttonVariants({
                variant: "destructive",
              })}`}
              disabled={isDeleteing}
              onClick={deleteTicket}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-destructive">{error}</p>
    </>
  );
};

export default DeleteButton;
