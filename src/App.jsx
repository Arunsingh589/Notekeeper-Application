// src/App.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import AddNoteForm from "./Components/AddNoteForm";
import NoteCard from "./Components/NoteCard";
import NoteModal from "./Components/NoteModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Add the Toastify CSS for styling
import Pagination from "./Components/Paginatio";
import './index.css'
import { deleteDoc } from "firebase/firestore";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [modalNote, setModalNote] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch notes with error handling
  const fetchNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const fetchedNotes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(fetchedNotes);
    } catch (error) {
      toast.error("Failed to load notes. Please try again later.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Pin/unpin note with error handling and notifications
  const handlePinToggle = async (id) => {
    try {
      const noteRef = doc(db, "notes", id);
      const note = notes.find((n) => n.id === id);
      const newPinnedState = !note.pinned;

      await updateDoc(noteRef, { pinned: newPinnedState });
      if (newPinnedState) {
        toast.success("Note pinned successfully.");
      } else {
        toast.info("Note unpinned.");
      }
      fetchNotes(); // Refresh notes after pin toggle
    } catch (error) {
      toast.error("Failed to update the note. Please try again.");
    }
  };

  // Save updated note with error handling and notifications
  const handleSave = async (updatedNote) => {
    try {
      const noteRef = doc(db, "notes", updatedNote.id);
      await updateDoc(noteRef, updatedNote);
      toast.success("Note updated successfully.");
      fetchNotes(); // Refresh notes after saving
    } catch (error) {
      toast.error("Failed to save the note. Please try again.");
    }
  };


  const handleAddNote = async (newNote) => {
    let toastId;

    try {
      toastId = toast.loading("Adding note...");
      await addDoc(collection(db, "notes"), newNote);
      toast.update(toastId, { render: "Note added successfully!", type: "success", isLoading: false, autoClose: 5000 });
    } catch (error) {
      if (toastId) {
        toast.update(toastId, { render: "Failed to add note!", type: "error", isLoading: false, autoClose: 5000 });
      }
      return; // Prevent further execution
    }

    // Refresh notes in a separate try-catch
    // try {
    //   await fetchNotes();
    // } catch (error) {
    //   console.error("Error refreshing notes:", error);
    // }
  };

  const handleDeleteNote = async (id) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "notes", id));

      // Update local state by removing the deleted note
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

      // Show success toast
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note. Please try again.");
    }
  };



  const sortedNotes = notes.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const paginatedNotes = sortedNotes.slice((currentPage - 1) * 6, currentPage * 6);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Notekeeper</h1>
      <AddNoteForm refreshNotes={(newNote) => setNotes((prevNotes) => [newNote, ...prevNotes])} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {paginatedNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onPinToggle={handlePinToggle}
            onEdit={() => setModalNote(note)}
            onDelete={handleDeleteNote}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(notes.length / 6)}
        onPageChange={setCurrentPage}
      />
      {modalNote && (
        <NoteModal
          isOpen={!!modalNote}
          note={modalNote}
          onClose={() => setModalNote(null)}
          onSave={handleSave}
        />
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeButton />
    </div>
  );
};

export default App;
