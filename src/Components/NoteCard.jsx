// src/Components/NoteCard.jsx
import React from 'react';
import { RiUnpinFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { RiPushpinFill } from "react-icons/ri";

const NoteCard = ({ note, onPinToggle, onEdit, onDelete }) => {
    const colors = [
        'bg-yellow-300', // Yellow
        'bg-pink-300',   // Pink
        'bg-red-300',    // Red
        'bg-blue-300',   // Blue
        'bg-green-300',  // Green
        'bg-purple-300', // Purple
        'bg-indigo-300', // Indigo
        'bg-teal-300',   // Teal
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return (
        <div
            onClick={onEdit}
            className={`relative p-6 rounded-lg cursor-pointer transform transition-transform hover:scale-105 ${randomColor}`}
        >
            <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{note.tagline}</p>
            <p className="text-gray-600 mt-4">{note.body.length > 100 ? `${note.body.slice(0, 100)}...` : note.body}</p>

            {/* Pin Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onPinToggle(note.id); }}
                className={`absolute top-4 right-20 ${note.pinned ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
            >
                {note.pinned ? (
                    <RiUnpinFill size={30} className="text-yellow-500" />
                ) : (
                    <RiPushpinFill size={30} className="text-blue-500" />
                )}
            </button>

            {/* Edit Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="absolute top-4 right-12 text-gray-600 hover:text-blue-500"
            >
                ✏️
            </button>

            {/* Delete Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
                <MdDelete size={24} />
            </button>
        </div>

    );
};

export default NoteCard;
