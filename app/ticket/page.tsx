"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Ticket {
  ticketId: string;
  name: string;
  email: string;
  description: string;
  category: string;
  keyPhrases: string[];
  imageUrl: string;
  submittedAt: string;
}

export default function TicketPage() {
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const savedTicket =
      localStorage.getItem("maintenanceTicket");

    if (savedTicket) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTicket(JSON.parse(savedTicket));
    }
  }, []);

  if (!ticket) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold">
          No ticket found.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-300 flex justify-center items-center p-8">
      <div className="bg-black p-8 rounded-xl shadow-lg w-full max-w-2xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Maintenance Ticket Details
        </h1>

        <div className="space-y-4">

          <div>
            <span className="font-bold">Ticket ID:</span>{" "}
            {ticket.ticketId}
          </div>

          <div>
            <span className="font-bold">Name:</span>{" "}
            {ticket.name}
          </div>

          <div>
            <span className="font-bold">Email:</span>{" "}
            {ticket.email}
          </div>

          <div>
            <span className="font-bold">
              Issue Description:
            </span>{" "}
            {ticket.description}
          </div>

          <div>
            <span className="font-bold">
              AI Category:
            </span>{" "}
            {ticket.category}
          </div>

          <div>
            <span className="font-bold">
              Key Phrases:
            </span>{" "}
            {ticket.keyPhrases.join(", ")}
          </div>

          <div>
            <span className="font-bold">
              Uploaded Image:
            </span>
          </div>

          {ticket.imageUrl ? (
            <Image
              src={ticket.imageUrl}
              alt="Uploaded Maintenance Issue"
              width={500}
              height={400}
              className="rounded-lg border w-full h-auto"
              unoptimized
            />
          ) : (
            <p>No image uploaded.</p>
          )}

          <div>
            <span className="font-bold">
              Date Submitted:
            </span>{" "}
            {ticket.submittedAt}
          </div>

        </div>
      </div>
    </div>
  );
}