import React, { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

const NoteModal = ({ isOpen, onClose, note, onSave }) => {
    const [updatedNote, setUpdatedNote] = useState(note);

    const handleSave = () => {
        if (updatedNote.title === note.title && updatedNote.tagline === note.tagline && updatedNote.body === note.body) {
            return;  // Avoid saving if no changes
        }
        onSave(updatedNote);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="p-4 bg-white">
            <input
                type="text"
                value={updatedNote.title}
                onChange={(e) => setUpdatedNote({ ...updatedNote, title: e.target.value })}
                className="w-full p-2 mb-2 border rounded"
            />
            <input
                type="text"
                value={updatedNote.tagline}
                onChange={(e) => setUpdatedNote({ ...updatedNote, tagline: e.target.value })}
                className="w-full p-2 mb-2 border rounded"
            />
            <textarea
                value={updatedNote.body}
                onChange={(e) => setUpdatedNote({ ...updatedNote, body: e.target.value })}
                className="w-full p-2 mb-2 border rounded resize-none"
            ></textarea>
            <button onClick={handleSave} className="px-4 py-2 text-white bg-blue-500 rounded">
                Save
            </button>
        </Modal>
    );
};

// Prop validation
NoteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    note: PropTypes.shape({
        title: PropTypes.string,
        tagline: PropTypes.string,
        body: PropTypes.string,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
};

export default NoteModal;
