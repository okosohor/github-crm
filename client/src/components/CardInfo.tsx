interface Props {
  text: string;
  value: string | number;
}

export default function CardInfo({ text, value }: Props) {
  return (
    <div className="border rounded-lg border-gray-400 bg-gray-100 font-semibold p-1 text-xs md:px-2 md:py-1 md:text-sm text-gray-700 items-center fle gap-2">
      {text}
      {value}
    </div>
  );
}
