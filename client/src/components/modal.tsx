import { IoClose } from "react-icons/io5";

interface Props {
  children?: React.ReactNode;
  close: () => void;
}

function Modal({ children, close }: Props) {
  return (
    <div className="bg-stone-200 rounded-xl relative px-12 py-12 max-w-max">
      <button
        type="button"
        onClick={close}
        className="absolute top-6 right-8 text-3xl text-red-500 opacity-70 hover:opacity-100 t3"
      >
        <IoClose />
      </button>
      {children}
    </div>
  );
}

export default Modal;
