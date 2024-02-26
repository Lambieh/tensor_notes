import { useRef, useLayoutEffect } from "react";
import "./Note.css";
import Button from "./Button";

function Note(props) {

   const ref = useRef();
   
  useLayoutEffect(() => {
    if (props.changeInput) {
      ref.current.focus();
    }
  }, [props.changeInput]);
   
  const onSubmit = () => {
    props.handleSaveNote({
      ...props.note,
      date: new Date(),
      id: crypto.randomUUID(),
    });
    props.setNote({ title: "", body: "" });
  };

  return (
    <div className={props.className + " note_page_all"}>
      <div className="note_page_button">
        {props.saveNewNote && (
          <Button
            onFunction={onSubmit}
            name={"Сохранить"}
            className={" note_page_button"}
          />
        )}
        {props.buttonChange && (
          <Button
            onFunction={props.onUpdateAllow}
            name={"Редактировать"}
            className={" note_page_button"}
          />
        )}
        {props.buttonSaveChange && (
          <Button
            onFunction={props.onUpdateNote}
            name={"Сохранить"}
            className={" note_page_button"}
          />
        )}
        <Button
          onFunction={() => props.onDelete()}
          name={"Удалить"}
          className={" note_page_button"}
        />
      </div>
      <input
        ref={ref}
        value={props.note.title}
        onChange={(event) =>
          props.setNote({ ...props.note, title: event.target.value })
        }
        placeholder="Заголовок"
        disabled={!props.changeInput}
        className="note_page_title"
      />
      <textarea
        className="note_page_body"
        value={props.note.body}
        onChange={(event) =>
          props.setNote({ ...props.note, body: event.target.value })
        }
        placeholder="Текст"
        disabled={!props.changeInput}
      />
    </div>
  );
}

export default Note;
