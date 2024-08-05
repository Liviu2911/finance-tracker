import { Link as LinkTo } from "@tanstack/react-router";

interface Props {
  to: string;
  text: string;
  active: boolean;
}

function Link({ to, text, active }: Props) {
  return (
    <LinkTo
      to={to}
      className={`t3 rounded text-lg ${active ? "text-green-500" : "text-stone-200"} hover:text-green-500 font-semibold`}
    >
      {text}
    </LinkTo>
  );
}

export default Link;
