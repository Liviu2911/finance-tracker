import { Link } from "@tanstack/react-router";
import { Card as Type } from "../../type";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Card({ card, size }: { card: Type; size?: true }) {
  const { owner, nickname, balance, id } = card;
  const [show, setShow] = useState(false);
  const sizes = size ? "w-80 h-44" : "w-56 h-[135px]";

  const variants = {
    animate: {
      y: -320,
      transition: {
        duration: 0.35,
        ease: "linear",
      },
    },
    exit: {
      y: 160,
      transition: {
        duration: 0.35,
        ease: "linear",
      },
    },
  };

  const text = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.35,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        // delay: 5,
      },
    },
  };

  const hide = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.25,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <Link to={`/cards/${id}`} params={{ id: String(id) }}>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(!true)}
        className={`${sizes} rounded-lg border border-stone-200 relative overflow-hidden flex items-center justify-center`}
      >
        <AnimatePresence initial={false}>
          {!show && (
            <>
              <motion.h1
                variants={hide}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`text-stone-200 text-lg`}
              >
                {balance}$
              </motion.h1>
              <motion.h1
                variants={hide}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`absolute top-3 left-3 text-stone-200`}
              >
                Owned by {owner}
              </motion.h1>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {show && (
            <>
              <motion.h1
                variants={text}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-stone-200 text-lg z-10 absolute"
              >
                {nickname}
              </motion.h1>
              <motion.div
                className={`${sizes} bg-green-500 absolute top-80`}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}

export default Card;
