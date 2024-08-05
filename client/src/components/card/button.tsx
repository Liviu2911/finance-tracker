import { IconType } from "react-icons";

interface Props {
  Icon: IconType;
  text: string;
  hover: string;
  func: () => void;
}

function Option({ Icon, text, hover, func }: Props) {
  return (
    <button
      className={`flex items-center text-stone-200 gap-2 hover:text-${hover}-500 t3`}
      onClick={func}
    >
      <h1>{text}</h1>
      <span>
        <Icon />
      </span>
    </button>
  );
}

export default Option;
