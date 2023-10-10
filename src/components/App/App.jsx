import { DragDropContext } from "react-beautiful-dnd";
import Header from "../Header/Header";
import style from "./App.module.scss";
import Toolbox from "../Toolbox/Toolbox";
import Dropzone from "../Dropzone/Dropzone";
import { nanoid } from "nanoid";
import { tools } from "../../ItemTypes";
import { useContext } from "react";
import { Context } from "../../Context";
import Drawer from "../Drawer/Drawer";
import Preview from "../Preview/Preview";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  let itemToAdd = { ...item, id: nanoid(), label: item.type, html: `<p></p>`, required: false }

  if (item.type === 'Dropdown') {
    itemToAdd = { ...itemToAdd, options: [{id: nanoid(), name: 'Placeholder Option'}] }
  } 

  destClone.splice(droppableDestination.index, 0, itemToAdd);
  return destClone;
};

function App() {
  const context = useContext(Context)

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    
    if (source.droppableId === "tools" && destination.droppableId !== 'tools') {
      context.setItems(copy(tools, context.items, source, destination));
      return
    }

    if (source.droppableId && destination.droppableId === "form") {
      context.setItems(reorder(context.items, source.index, destination.index));
      return;
    }
  };

  return (
    <>
      <Header />
      <Drawer />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={style.container}>
          <Dropzone />
          <Toolbox />
        </div>
      </DragDropContext>
      {context.preview && <Preview />}
    </>
  );
}

export default App;
