interface ButtonsProps {
  action: "add" | "edit" | "delete";
  addTodo: (text: string) => void;
}
const Buttons: React.FC<ButtonsProps> = ({ action, addTodo }) => {
  const handleClick = () => {
    if (action === "add") {
      addTodo("d");
    } else if (action === "edit") {
      console.log("수정");
    } else if (action === "delete") {
      console.log("삭제");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gray-900 hover:bg-gray-950 text-white font-bold px-4 py-2 rounded-md ml-2"
    >
      추가
    </button>
  );
};

export default Buttons;
