interface Props {
  text: string;
  type?: "light" | "solid";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  text,
  type,
  onClick,
  className,
  disabled,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} ${
        type === "light"
          ? "text-sm font-medium text-fuchsia-700 hover:underline"
          : "mx-auto mt-2 block rounded-lg bg-fuchsia-700 py-2 px-5 text-white hover:bg-fuchsia-900"
      }`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
