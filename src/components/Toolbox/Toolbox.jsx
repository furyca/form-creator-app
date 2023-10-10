import { Draggable, Droppable } from "react-beautiful-dnd";
import style from "./Toolbox.module.scss";
import { tools } from "../../ItemTypes";

const Toolbox = () => {
  return (
    <Droppable droppableId="tools" isDropDisabled={true}>
      {(provided, snapshot) => (
        <div
          className={style.items}
          ref={provided.innerRef}
        >
          {tools.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <>
                  <div
                    className={style.item}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.type}
                  </div>
                  {snapshot.isDragging ? <div className={style.clone}>{item.type}</div> : null}
                </>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Toolbox;
