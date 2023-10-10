import { useContext, useEffect } from "react";
import style from "./Drawer.module.scss";
import { Context } from "../../Context";
import { nanoid } from "nanoid";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import { useState } from "react";
import { clearEditorContent } from "draftjs-utils";
import { ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";

const Drawer = () => {
  const context = useContext(Context);
  const [activeItem, setActiveItem] = useState({});
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    const item = context.items.find((item) => item.id === context.itemID);
    setActiveItem({ ...item });

    if (context.drawer && item) {
      const contentBlocks = htmlToDraft(item.html);
      const contentState = ContentState.createFromBlockArray(
        contentBlocks.contentBlocks
      );
      const initialEditorState = EditorState.createWithContent(contentState);

      context.setEditorState(initialEditorState);
    }

    // eslint-disable-next-line
  }, [context.itemID]);

  useEffect(() => {
    if (!context.drawer && !initial) {
      const element = context.items.find((item) => item.id === activeItem.id);
      const items = [...context.items];
      items.splice(items.indexOf(element), 1, activeItem);
      context.setItems(items);
      //context.setConvertedContent('')
    }

    setInitial(false);
    // eslint-disable-next-line
  }, [context.drawer]);

  const deleteOption = (id) => {
    const filteredOptions = activeItem.options.filter(
      (option) => option.id !== id
    );
    setActiveItem({ ...activeItem, options: filteredOptions });
  };

  const addOption = () => {
    const newOptions = [
      ...activeItem.options,
      { id: nanoid(), name: "Option", value: "" },
    ];
    setActiveItem({ ...activeItem, options: newOptions });
  };

  const closeDrawer = () => {
    let html = convertToHTML(context.editorState.getCurrentContent());
    //context.setConvertedContent(html);

    const newLabel = context.editorState
      .getCurrentContent()
      .getPlainText("\u0001");

    setActiveItem({ ...activeItem, label: newLabel, html: html });

    context.setDrawer(false);
    context.setItemID("");
    context.setEditorState(clearEditorContent(context.editorState));
  };

  return (
    <div className={`${style.drawer} ${context.drawer && style.edit}`}>
      <div className={style.actions}>
        <button onClick={closeDrawer}>X</button>
      </div>
      <h2>{activeItem && activeItem.type}</h2>
      <h3>Set Label</h3>
      <Editor
        editorState={context.editorState}
        onEditorStateChange={context.setEditorState}
        editorClassName={style.editor}
        wrapperClassName={style.wrapper}
        toolbarClassName={style.toolbar}
      />
      <input
        type="checkbox"
        id="isRequired"
        checked={activeItem.required || false}
        onChange={(e) =>
          setActiveItem({ ...activeItem, required: e.target.checked })
        }
      />
      <label htmlFor="isRequired">Required?</label>
      {context.drawer && activeItem.type === "Dropdown" && (
        <div className={style.options}>
          <table className={style.optionWrapper}>
            <thead>
              <tr>
                <th>Options</th>
                <th>Value</th>
                <th>Remove</th>
              </tr>
            </thead>
            {activeItem.options.map((option) => {
              return (
                <tbody key={nanoid()}>
                  <tr>
                    <td>
                      <input
                        type="text"
                        defaultValue={option.name}
                        onChange={(e) => (option.name = e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        defaultValue={option.value}
                        onChange={(e) => (option.value = e.target.value)}
                      />
                    </td>
                    <td>
                      <button onClick={() => deleteOption(option.id)}>
                        Remove Option
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <button onClick={addOption} className={style.addOptButton}>Add Option</button>
        </div>
      )}
    </div>
  );
};

export default Drawer;
