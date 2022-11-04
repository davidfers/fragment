interface Props {
  text: string;
  type?: "light";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ text, type, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        type === "light"
          ? "text-sm font-medium text-fuchsia-700 hover:underline"
          : "mt-2 rounded-lg bg-fuchsia-700 p-3 text-white hover:bg-fuchsia-900"
      }
    >
      {text}
    </button>
  );
}
