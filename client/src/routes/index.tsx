import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  return <main className="mt-10 top-10 p-4"></main>;
};

export const Route = createFileRoute("/")({
  component: Home,
});
