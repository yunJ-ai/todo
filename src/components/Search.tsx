interface SearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// 엔터 클릭 시, 입력가능하게 추후 변경 onKeyDown={handleKeyDown}
export default function Search({ value, onChange }: SearchProps) {
  return (
    <input
      type="search"
      placeholder="검색 내용을 입력해 주세요."
      className="border border-gray-300 rounded-md px-3 py-2 w-fit"
      value={value}
      onChange={onChange}
    />
  );
}
