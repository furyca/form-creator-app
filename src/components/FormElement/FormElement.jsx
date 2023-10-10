import { useContext } from "react";
import style from "./FormElement.module.scss";
import { Context } from "../../Context";

const FormElement = ({ item, provided }) => {
  const context = useContext(Context);

  const handleDelete = () => {
    const filteredItems = context.items.filter(
      (element) => element.id !== item.id
    );
    context.setItems(filteredItems);
  };

  const openEditMode = () => {
    context.setConvertedContent(item.label);
    context.setItemID(item.id);
    context.setDrawer(true);
  };

  return (
    <div
      className={style.formElement}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div className={style.head}>
        <span>{item.type}</span>
        <div className={style.actions}>
          <button onClick={openEditMode}>E</button>
          <button onClick={handleDelete}>D</button>
          <div className={style.handle} {...provided.dragHandleProps}>
            M
          </div>
        </div>
      </div>
      <div>
        <span>{item.label}</span>
        {item.type === "Dropdown" ? (
          <select>
            <option value="Placeholder">Placeholder Option</option>
          </select>
        ) : item.type === "Text Area" ? (
          <textarea />
        ) : (
          <input />
        )}
      </div>
    </div>
  );
};

export default FormElement;
