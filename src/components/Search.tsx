interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({ value, onChange }: SearchProps) {
  return (
    <div className="mb-2">
      <input
        type="search"
        placeholder="검색 내용을 입력해 주세요."
        className="border border-gray-300 rounded-md text-white px-3 py-2 w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
