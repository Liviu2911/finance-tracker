interface Props {
  placeholder?: string;
  name: string;
  classname?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function Input({ placeholder, name, classname, value, setValue }: Props) {
  return (
    <div className="flex flex-col gap-2 text-stone-200">
      <label htmlFor={name} className="capitalize text-sm">
        {name}
      </label>
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        value={value}
        placeholder={placeholder}
        name={name}
        className={`${classname} outline-none opacity-80 focus:outline-none focus:opacity-100 t3 rounded px-3 py-1 placeholder:italic placeholder:opacity-70 max-w-max text-sm text-rose-500`}
      />
    </div>
  );
}

export default Input;
