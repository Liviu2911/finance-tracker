interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  name: string;
}

function Input({ name, placeholder, value, setValue }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-stone-800 capitalize">
        {name}
      </label>
      <input
        className="rounded-[6px] px-4 py-2 bg-white text-stone-950 w-[500px] focus:outline-offset-1 focus:outline focus:outline-stone-950 shadow-md"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default Input;
