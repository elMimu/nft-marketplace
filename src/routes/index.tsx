import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full">
      <Header />
      <main>
        {/* {} */}
      </main>
    </div>
  );
}
