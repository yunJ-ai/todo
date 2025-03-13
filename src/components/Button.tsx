interface ButtonsProps {
  onClick: () => void;
  label: string;
}

const Button: React.FC<ButtonsProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="border border-gray-300 hover:bg-gray-950 rounded-md px-4 py-2 ml-2"
    >
      {label}
    </button>
  );
};

export default Button;
