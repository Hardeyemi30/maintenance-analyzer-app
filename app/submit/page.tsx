"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ticket = {
      ticketId: `TICKET-${Date.now()}`,
      name,
      email,
      description,
      category: "General",
      keyPhrases: ["sample phrase"],
      imageUrl: imagePreview,
      submittedAt: new Date().toLocaleDateString(),
    };

    localStorage.setItem("maintenanceTicket", JSON.stringify(ticket));

    router.push("/ticket");
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.success) {
      alert("Failed to upload image");
      return;
    }

    setImagePreview(data.imageUrl);

    const result = classifyIssue(description);
    const imageUrl = data.imageUrl || imagePreview;

    // Create ticket object
    const ticket = {
      name,
      email,
      description,
      category: result.category,
      keyPhrases: description.split(" ").slice(0, 3),
      imageUrl,
    };

    // Save ticket to Cosmos DB
    const ticketResponse = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    const savedTicket = await ticketResponse.json();

    // Save locally for ticket page
    localStorage.setItem("maintenanceTicket", JSON.stringify(savedTicket));
  };

  return (
    <div className="min-h-screen bg-green-300 flex justify-center items-center p-8">
      <div className="bg-black p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Building Maintenance Request
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Describe Issue</label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the maintenance issue..."
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Photo</label>

            <input type="file" className="w-full border rounded-lg p-3"  onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              const url = URL.createObjectURL(file);
              setImagePreview(url);
            }
          }} />
          </div>

          <button
            type="submit"
            onClick={handleUpload}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

function classifyIssue(description: string): { category: string } {
  // simple keyword-based classifier
  const text = (description || "").toLowerCase();
  if (text.includes("leak") || text.includes("water") || text.includes("pipe")) {
    return { category: "Plumbing" };
  }
  if (text.includes("light") || text.includes("bulb") || text.includes("electr")) {
    return { category: "Electrical" };
  }
  if (text.includes("door") || text.includes("window") || text.includes("lock")) {
    return { category: "Carpentry" };
  }
  if (text.includes("pest") || text.includes("rodent") || text.includes("insect")) {
    return { category: "Pest Control" };
  }
  return { category: "General" };
}
