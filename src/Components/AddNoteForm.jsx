// src/components/AddNoteForm.jsx
import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ToastNotification from "./ToastNotification";

const AddNoteForm = ({ refreshNotes }) => {
    const [note, setNote] = useState({ title: "", tagline: "", body: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "notes"), {
                ...note,
                pinned: false,
                createdAt: serverTimestamp(),
            });

            // Append the new note locally
            const newNoteWithId = { id: docRef.id, ...note, pinned: false, createdAt: new Date() };
            refreshNotes(newNoteWithId); // Pass the new note to the parent for updating state

            ToastNotification.success("Note added successfully!");
            setNote({ title: "", tagline: "", body: "" }); // Reset the form
        } catch (error) {
            console.error("Error adding note:", error);
            ToastNotification.error("Failed to add note!");
        }
    };



    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md">
            <input
                type="text"
                placeholder="Title"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                required
                className="w-full p-2 mb-2 border rounded"
            />
            <input
                type="text"
                placeholder="Tagline"
                value={note.tagline}
                onChange={(e) => setNote({ ...note, tagline: e.target.value })}
                required
                className="w-full p-2 mb-2 border rounded"
            />
            <textarea
                placeholder="Body"
                value={note.body}
                onChange={(e) => setNote({ ...note, body: e.target.value })}
                required
                className="w-full p-2 mb-2 border rounded resize-none"
            ></textarea>
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded">
                Add Note
            </button>
        </form>
    );
};

export default AddNoteForm;
