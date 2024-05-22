"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter, useSearchParams } from "next/navigation";
const statuses: { label: string; value?: string }[] = [
  { label: "Open/Started" },
  { label: "Open", value: "OPEN" },
  { label: "Started", value: "STARTED" },
  { label: "Closed", value: "CLOSED" },
];

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        console.log("p1", status);
        const query = params.size ? `?${params.toString()}` : "0";
        console.log("q1", query, params.size);
        router.push(`/Tickets${query}`);
      }}
    >
      <SelectTrigger className="mt-4 w-[200px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => {
            return (
              <SelectItem key={status.value || "0"} value={status.value || "0"}>
                {status.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
