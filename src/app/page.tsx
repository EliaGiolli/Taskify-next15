import TicketCard from "@/components/ui/TicketCard";

export default function Home() {
  return (
    <div className="bg-zinc-900 text-white w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8 rounded-md">
      <TicketCard />
      <TicketCard />
      <TicketCard />
      <TicketCard />
      <TicketCard />
      <TicketCard />
    </div>
  );
}
