import { createContext, useState } from "react";
import { EditorState } from "draft-js";
import DOMPurify from "dompurify";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [itemID, setItemID] = useState('');
  const [drawer, setDrawer] = useState(false);
  const [preview, setPreview] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  const values = {
    items,
    setItems,
    itemID,
    setItemID,
    drawer,
    setDrawer,
    preview,
    setPreview,
    editorState,
    setEditorState,
    convertedContent,
    setConvertedContent,
    createMarkup
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
