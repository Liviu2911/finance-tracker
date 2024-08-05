import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { IconType } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import EditCard from "./card/editCard";
import { Card } from "../../type";
import Transfer from "./card/transfer";

const transition = {
  duration: 0.3,
  ease: "linear",
};

const modalVariants = {
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

function Option({
  Icon,
  text,
  hover,
  id,
  func,
  card,
}: {
  Icon: IconType;
  text: string;
  hover: string;
  id: number;
  func: "delete" | "edit" | "add";
  card: Card;
}) {
  const [modal, setModal] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const navigate = useNavigate();
  const deleteCard = async () => {
    if (id < 0) return undefined;
    const res = await fetch(`http://localhost:3000/cards/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Couldn't delete the card");

    navigate({
      to: "/cards",
    });
  };

  const edit = () => {
    setModal(true);
  };
  const add = () => {
    setTransfer(true);
  };

  const closeEdit = () => {
    setModal(false);
  };

  const closeTransfer = () => {
    setTransfer(false);
  };

  return (
    <>
      <button
        onClick={() =>
          func === "delete" ? deleteCard() : func === "edit" ? edit() : add()
        }
        className={`flex flex-row items-center gap-2 text-stone-200 hover:text-${hover}-500 t3`}
      >
        <span>
          <Icon />
        </span>
        <h1>{text}</h1>
      </button>

      <AnimatePresence>
        {modal && (
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute w-full h-[100vh] flex items-center justify-center left-0 top-0 bg-black bg-opacity-50"
          >
            <EditCard card={card} close={closeEdit} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {transfer && (
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute w-full h-[100vh] flex items-center justify-center left-0 top-0 bg-black bg-opacity-50"
          >
            <Transfer card={card} close={closeTransfer} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Option;
