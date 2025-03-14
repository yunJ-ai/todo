interface ChipsProps {
  onClick: () => void;
  label: string;
}

const Chip: React.FC<ChipsProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="border rounded-2xl px-2 m-1 hover:bg-midblue"
    >
      {label}
    </button>
  );
};

export default Chip;
