import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonsProps {
  onClick: () => void;
  label: string;
  icon?: IconDefinition;
}

const Button: React.FC<ButtonsProps> = ({ onClick, label, icon }) => {
  return (
    <button
      onClick={onClick}
      className="border border-gray-300 hover:bg-gray-950 rounded-md px-4 py-2 ml-2"
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {label}
    </button>
  );
};

export default Button;
