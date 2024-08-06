import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Card as CardType } from "../../type";
import { GoGear } from "react-icons/go";
import { LuTrash2 } from "react-icons/lu";
import { TbPigMoney } from "react-icons/tb";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CardComp from "../components/card";
import Option from "../components/card/button";
import EditCard from "../components/card/editCard";
import Transfer from "../components/card/transfer";

const getCard = async (id: number) => {
  if (id < 0) return null;
  const res = await fetch(`http://localhost:3000/cards/${id}`, {
    method: "GET",
  });
  return await res.json().then((data: CardType[]) => data[0]);
};

export const Route = createFileRoute("/cards/$id")({
  component: Card,
});

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

function Card() {
  const [showEdit, setShowEdit] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const { navigate } = useRouter()

  const id = parseInt(location.pathname.slice(7));
  const { data, isLoading, error } = useQuery<CardType | null>({
    queryKey: ["card"],
    queryFn: () => getCard(id || -1),
    refetchInterval: 1000,
  });

  if (isLoading) return <h1 className="text-stone-200">loading...</h1>;
  if (!data || error)
    return <h1>An error has occured while trying to get the data</h1>;


  const edit = () => {
    setShowEdit(true);
  };
  const closeEdit = () => {
    setShowEdit(false);
  };
  const transfer = () => {
    setShowTransfer(true);
  };

  const closeTransfer = () => {
    setShowTransfer(!true);
  };

  const deleteCard = async () => {
    const res = await fetch(`http://localhost:3000/cards/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Could not delete card");
    else navigate({
      to: "/cards"
    })
  };

  if (data)
    return (
      <>
        <div className="w-full flex flex-col items-center gap-4 mt-20 ">
          <div className="">
            <CardComp card={data} size />
          </div>
          <div className="flex flex-row items-center gap-4">
            <Option Icon={GoGear} text="Edit" hover="sky" func={edit} />
            <Option
              Icon={TbPigMoney}
              text="Add money"
              hover="green"
              func={transfer}
            />
            <Option
              Icon={LuTrash2}
              text="Delete"
              hover="rose"
              func={deleteCard}
            />
          </div>
        </div>

        <AnimatePresence>
          {showEdit && (
            <motion.div
              className="w-full h-[100vh] bg-black bg-opacity-50 flex items-center justify-center absolute top-0 left-0"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <EditCard close={closeEdit} card={data} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTransfer && (
            <motion.div
              className="w-full h-[100vh] bg-black bg-opacity-50 flex items-center justify-center absolute top-0 left-0"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Transfer close={closeTransfer} card={data} />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
}
