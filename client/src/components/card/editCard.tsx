import { useState } from "react";
import { Card } from "../../../type";
import Input from "./biginput";
import Modal from "./../modal";

function EditCard({ close, card }: { close: () => void; card: Card }) {
  const [owner, setOwner] = useState(card.owner);
  const [name, setName] = useState(card.nickname);

  async function update() {
    const res = await fetch(`http://localhost:3000/cards/${card.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...card,
        owner,
        nickname: name,
        balance: card.balance,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Could not update data");
    return res.json();
  }

  const submit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    update();
    close();
  };

  return (
    <Modal close={close}>
      <h1 className="text-2xl flex items-center gap-2 font-bold">
        Edit card <span className="text-rose-500 font-semibold"> {name}</span>
        <span className="text-xl text-stone-500 font-semibold">#{card.id}</span>
      </h1>

      <form method="PUT" className="mt-8 flex flex-col gap-4" onSubmit={submit}>
        <Input
          name="owner"
          placeholder={owner}
          value={owner}
          setValue={setOwner}
        />
        <Input name="name" placeholder={name} value={name} setValue={setName} />
        <button className="mt-2 bg-sky-700 hover:bg-sky-600 t3 text-stone-200 rounded py-2">
          Save
        </button>
      </form>
    </Modal>
  );
}

export default EditCard;
