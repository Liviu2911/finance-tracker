import { useState } from "react";
import { AddCardError, Card, Method } from "../../type";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Input from "./input";

const schema = z.object({
  owner: z
    .string()
    .min(3, { message: "Must be at least 3 characters long" })
    .max(20, { message: "Can not be longer than 20 characters" }),
  name: z
    .string()
    .min(3, { message: "Must be at least 3 characters long" })
    .max(20, { message: "Can not be longer than 20 characters" }),
  balance: z.number(),
});

function CardForm({
  method,
  classname,
}: {
  method: Method;
  classname?: string;
}) {
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState<AddCardError>();

  const post = async (): Promise<Card> => {
    const res = await fetch("http://localhost:3000/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ owner, name, balance }),
    });
    if (!res.ok) throw new Error("Couldn't add the data");

    return res.json();
  };

  const postMutation = useMutation({
    mutationFn: post,
    mutationKey: ["post card"],
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = schema.safeParse({
      owner,
      name,
      balance: parseInt(balance),
    });
    if (error) {
      setError({
        to: error.errors[0].path[0].toString(),
        message: error.errors[0].message,
      });
      console.log(error);
    } else {
      postMutation.mutate();
      setTimeout(() => {
        setName("");
        setOwner("");
        setBalance("");
      }, 500);
    }
  };

  return (
    <form
      action={method}
      className={classname + "max-w-min mt-4 flex flex-col gap-4"}
      onSubmit={(e) => submit(e)}
    >
      <Input
        name="owner"
        placeholder="Owner of the card..."
        value={owner}
        setValue={setOwner}
        classname={`border-2 ${error?.to === "owner" ? "border-rose-500" : "border-sky-500"}`}
      />
      <Input
        name="name"
        placeholder="Name of the card..."
        value={name}
        setValue={setName}
        classname={`border-2 ${error?.to === "name" ? "border-rose-500" : "border-sky-500"}`}
      />
      <Input
        name="balance"
        placeholder="Balance of the card..."
        value={balance}
        setValue={setBalance}
        classname={`border-2 ${error?.to === "balance" ? "border-rose-500" : "border-sky-500"}`}
      />

      <button
        type="submit"
        className="text-stone-200 hover:text-rose-500 t3 text-sm"
      >
        Add Card
      </button>
    </form>
  );
}

export default CardForm;
