function DropDowns() {
  const menuItems = [{ completed: true }, { completed: false }];
  return (
    <div>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>{item.completed ? "Completed" : "Not Completed"}</li>
        ))}
      </ul>
    </div>
  );
}

export default DropDowns;
