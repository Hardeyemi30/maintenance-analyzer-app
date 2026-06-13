import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6">

      <h1 className="text-4xl font-bold">
        Building Maintenance Request Analyzer
      </h1>

      <Link
        href="/submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Submit Maintenance Request
      </Link>

      <Link
        href="/ticket"
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        View Sample Ticket
      </Link>

    </div>
  );
}