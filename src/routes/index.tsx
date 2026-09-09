import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <Header />
        <Hero />
      </div>
      <main>{/* {} */}</main>
    </div>
  );
}
