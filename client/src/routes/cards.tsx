import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Card as CardType } from "../../type";
import Card from "../components/card";
import CardForm from "../components/cardForm";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const getCards = async () => {
  const res = await fetch("http://localhost:3000/cards", { method: "GET" });
  return await res.json().then((data) => data);
};

const transition = {
  duration: 0.3,
  ease: "linear",
};

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition,
  },
  exit: {
    opacity: 0,
    transition,
  },
};

const Cards = () => {
  // Use this shi when addin new card
  // const client = useQueryClient();

  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const cards = useQuery<CardType[], Error>({
    queryKey: ["cards"],
    queryFn: getCards,
    refetchInterval: 1000,
  }).data;

  return (
    <>
      <div className="ml-8 mt-20 absolute">
        <button
          className={`flex items-center gap-2 ${active || hover ? "text-sky-500" : "text-stone-200"} t3`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(!true)}
          onClick={() => setActive((prev) => !prev)}
        >
          <h1>Add new card</h1>
          <span className={`t3 ${active ? "rotate-0" : "-rotate-90"}`}>
            <FaAngleDown />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CardForm method="POST" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-4 h-full w-[70%] ml-80 mr-auto mt-20">
        {cards &&
          cards.map((card: CardType) => <Card key={card.id} card={card} />)}
      </div>
      <Outlet />
    </>
  );
};

export const Route = createFileRoute("/cards")({
  component: Cards,
});
