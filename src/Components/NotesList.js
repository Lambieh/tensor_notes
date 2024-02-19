import { useState } from "react";
import Note from "./Note.js";
import "./NotesList.css";
function List(props) {
  return (
    <div className="list_notes">
      {props.notes.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => props.handleCurrentNote(item)}
            className={
              props.note.id == item.id ? "active list_note" : "list_note"
            }
          >
            <div>
              <div className="list_note_title"> {item.title}</div>
              <div className="list_note_body">{item.body}</div>
            </div>
            <button
              className="button_delete_note_in_noteslist"
              onMouseDown={() => props.onDelete(item.id)}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default List;
