import style from "./Preview.module.scss";
import { useContext } from "react";
import { Context } from "../../Context";
import { nanoid } from "nanoid";

const Preview = () => {
  const context = useContext(Context);

  return (
    <div className={style.preview}>
      <div className={style.wrapper}>
        <div className={style.actions}>
          <button onClick={() => context.setPreview(false)}> X </button>
        </div>
        <div className={style.formHeader}><h2>React Form</h2></div>
        {context.items.map((item) =>
          item.type === "Dropdown" ? 
          (
            <div key={nanoid()} className={style.previewElement}>
              <label dangerouslySetInnerHTML={context.createMarkup(item.html)}></label>
              <select>
                {item.options.map((option) => (
                  <option key={nanoid()}>{option.name}</option>
                ))}
              </select>
            </div>
          ) 
          : item.type === "Text Area" ? (<div key={nanoid()} className={style.previewElement}><label dangerouslySetInnerHTML={context.createMarkup(item.html)}></label> <textarea /></div>) 
          : (<div key={nanoid()} className={style.previewElement}><label dangerouslySetInnerHTML={context.createMarkup(item.html)}></label><input/></div>)
        )}
      </div>
    </div>
  );
};

export default Preview;
