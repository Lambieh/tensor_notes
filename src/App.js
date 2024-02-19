import "./App.css";
import NotesList from "./Components/NotesList.js";
import Note from "./Components/Note.js";
import { useState, useEffect, useMemo } from "react";
import Dropdown from "./Components/Dropdowns.js";
import Button from "./Components/Button.js";

function App() {
  const [isEdit, setIsEdit] = useState(true);
  const [search, setSearch] = useState("");
  const [changeInput, setChangeInput] = useState(true);
  const [saveNewNote, setSaveNewNote] = useState(true);
  const [buttonChange, setButtonChange] = useState(false);
  const [buttonSaveChange, setButtonSaveChange] = useState(false);
  const [sort, setSort] = useState(1);

  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [note, setNote] = useState({
    title: "",
    body: "",
    id: "",
    date: "",
  });
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const sortDateAscending = (arr) => {
    return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
  }; // По возрастанию

  const sortDateDescending = (arr) => {
    return arr.sort((a, b) => new Date(a.date) - new Date(b.date));
  }; // По убыванию

  const sortOrder = (notes, selectedSort) => {
    if (selectedSort == 1) {
      return sortDateDescending(notes);
    } else {
      return sortDateAscending(notes);
    }
  };

  const searchByTitle = (notes, search) => {
    return notes.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const sortNotes = useMemo(() => {
    if (search) {
      const matchByTitle = searchByTitle(notes, search);
      return sortOrder(matchByTitle, sort);
    }
    return sortOrder(notes, sort);
  }, [notes, sort, search]);

  const handleCurrentNote = (item) => {
    setNote(item);
    setButtonChange(true);
    setChangeInput(false);
    setSaveNewNote(false);
    setButtonSaveChange(false);
    setIsEdit(true);
  };

  const handleSaveNote = (note) => {
    let newNotes = notes.filter((item) => item.id != note.id);
    if (note.title || note.body) {
      setNotes([...newNotes, note]);
    } else {
      onDelete();
    }
  };

  const handleUpdate = () => {
    const updatedNotes = notes.map((item) => {
      if (item.id === note.id) {
        return { ...item, ...note };
      }
      return item;
    });
    setNotes(updatedNotes);
  };

  const onDelete = (id) => {
    let newNotes = notes.filter((item) => {
      if (typeof id == "string") {
        return item.id !== id;
      }
      return item.id !== note.id;
    });
    if (id) {
      if (id == note.id) {
        setNote({ title: "", body: "" });
        setIsEdit(false);
      }
    } else {
      setNote({ title: "", body: "" });
      setIsEdit(false);
    }

    setNotes(newNotes);
  };

  const onSaveNewNote = () => {
    setSaveNewNote(true);
    setChangeInput(true);
    setIsEdit(true);
    setButtonChange(false);
    setButtonSaveChange(false);
    setNote({ title: "", body: "" });
  };

  const onUpdateAllow = () => {
    setChangeInput(true);
    setButtonChange(false);
    setButtonSaveChange(true);
  };

  const onUpdateNote = () => {
    if (note.title || note.body) {
      handleUpdate({ ...note, title: note.title, body: note.body });
      setNote(note);
      setButtonChange(true);
      setButtonSaveChange(false);
      setChangeInput(false);
    } else {
      onDelete(note.id);
    }
  };
  return (
    <div className="page">
      <div className="page_noteslist">
        <Button onFunction={onSaveNewNote} name={"+ Заметка"} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search..."
          className="page_search"
        />

      

        <div className="page_sort">
          Сортировать по
          <Dropdown
            items={[
              { title: "возрастанию", id: "1" },
              { title: "убыванию", id: "2" },
            ]}
            onSelectedSortChange={setSort}
            classNameButton={"general_button_styles"}
          />
        </div>
        <NotesList
          notes={sortNotes}
          handleCurrentNote={handleCurrentNote}
          note={note}
          onDelete={onDelete}
        />
      </div>
      {isEdit && (
        <Note
          className={"page_create_edit_note"}
          classNameButton={"general_button_styles"}
          buttonSaveChange={buttonSaveChange}
          buttonChange={buttonChange}
          saveNewNote={saveNewNote}
          onDelete={onDelete}
          handleSaveNote={handleSaveNote}
          onUpdate={handleUpdate}
          changeInput={changeInput}
          onUpdateAllow={onUpdateAllow}
          onUpdateNote={onUpdateNote}
          note={note}
          setNote={setNote}
        />
      )}
    </div>
  );
}

export default App;
