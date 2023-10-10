import { Draggable, Droppable } from "react-beautiful-dnd";
import style from "./Dropzone.module.scss";
import FormElement from "../FormElement/FormElement";
import { useContext } from "react";
import { Context } from "../../Context";

const Dropzone = () => {
  const context = useContext(Context)
  return (
    <div className={style.form}>
      <Droppable droppableId="form">
        {(provided) => (
          <div className={style.formContent} ref={provided.innerRef}>
            {context.items.length ? context.items.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <FormElement provided={provided} item={item} />
                  )}
                </Draggable>
              );
            }) : <div className={style.placeholder}><h2>Drop Here...</h2></div>}
            {provided.placeholder}
          </div>
          
        )}
      </Droppable>
    </div>
  );
};

export default Dropzone;
