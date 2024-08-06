import { useEffect, useState } from "react";
import { Card } from "../../../type";
import { FaAngleDown } from "react-icons/fa";
import Modal from "../modal";
import Option from "./option";

interface Props {
  close: () => void;
  card: Card;
}

function Transfer({ close, card }: Props) {
  const [current, setCurrent] = useState<Card | "Bank">("Bank");
  const [show, setShow] = useState(false);
  const [cards, setCards] = useState<(Card | "Bank")[]>([]);
  const [amount, setAmount] = useState("");
  const getAll = async () => {
    const res = await fetch("http://localhost:3000/cards", { method: "GET" });
    return await res.json().then((data) => setCards(data));
  };
  useEffect(() => {
    getAll();
  }, []);

  const submit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (current === "Bank") {
      const res = await fetch(`http://localhost:3000/cards/${card.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...card,
          balance: Number(card.balance) + Number(amount),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Could not transfer");
      else close();
    } else if (current.balance >= Number(amount)) {
      const res1 = await fetch(`http://localhost:3000/cards/${card.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...card,
          balance: Number(card.balance) + Number(amount),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res1.ok)
        throw new Error(
          "Could not tranfer. Error occured at the receiving card"
        );
      const res2 = await fetch(`http://localhost:3000/cards/${current.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...current,
          balance: Number(current.balance) - Number(amount),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res2.ok)
        throw new Error("Could not transfer. Error occured at the giving card");

      close();
    }
  };

  return (
    <Modal close={close}>
      <h1 className="text-2xl font-bold flex items-center gap-2">
        Add money to{" "}
        <span className="text-rose-500 font-semibold">{card.nickname}</span>
        <span className="text-stone-500 text-xl font-semibold">#{card.id}</span>
      </h1>

      <form onSubmit={submit} className="mt-8 flex flex-col gap-2">
        <label htmlFor="method">Method of transfer</label>
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="w-[500px] px-4 py-2 rounded bg-white shadow-md flex items-center gap-2"
        >
          <h1>{current === "Bank" ? "Bank" : current.nickname}</h1>
          <span>
            <FaAngleDown />
          </span>
        </button>

        {show && (
          <div className="absolute top-48 flex flex-col bg-white items-start rounded shadow-md overflow-hidden w-[500px] p-0">
            {cards.map(
              (card) =>
                card !== "Bank" && (
                  <Option
                    setCurrent={setCurrent}
                    setShow={setShow}
                    card={card}
                    key={card.id + "a"}
                  />
                )
            )}
            <Option setCurrent={setCurrent} setShow={setShow} bank />
          </div>
        )}

        <div className="flex flex-col gap-2 mt-8">
          <label className="flex flex-row gap-4 items-center" htmlFor="amount">
            Amount
            {current !== "Bank" && current.balance < Number(amount) && (
              <span className="text-rose-500">
                Not enough money on the card
              </span>
            )}
          </label>
          <input
            type="text"
            name="amount"
            onChange={(e) =>
              setAmount((prev) =>
                /^\d+$/.test(e.target.value) === true || e.target.value === ""
                  ? e.target.value
                  : prev
              )
            }
            value={amount}
            className={`w-[500px] rounded shadow-md px-4 py-2 focus:outline-offset-1 focus:outline focus:outline-stone-950 ${current !== "Bank" && current.balance < Number(amount) ? "border-rose-500 border" : ""}`}
          />
        </div>

        <button
          type="submit"
          className="mt-8 text-stone-800 hover:text-sky-500 t3"
        >
          Transfer
        </button>
      </form>
    </Modal>
  );
}

export default Transfer;
