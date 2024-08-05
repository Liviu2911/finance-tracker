import { Card } from "../../../type";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: React.Dispatch<React.SetStateAction<Card | "Bank">>;
  card?: Card;
  bank?: true;
}

function Option({ setShow, setCurrent, card, bank }: Props) {
  return (
    <button
      type="button"
      className="t3 hover:bg-stone-200 w-[500px] py-2 px-4 bg-white text-left"
      onClick={() => {
        setShow(false);
        setCurrent(bank ? "Bank" : card!);
      }}
    >
      {bank ? "Bank" : card?.nickname}
    </button>
  );
}

export default Option;
