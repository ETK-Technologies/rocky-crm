import React, { useState } from "react";

const initialNotes = [
    {
        id: 1,
        author: "Ahmed",
        date: "July 31, 2025 at 9:13 am",
        type: "Private Note",
        text: "Dummy text"
    },
    {
        id: 2,
        author: "Ahmed",
        date: "July 31, 2025 at 9:13 am",
        type: "Private Note",
        text: "Dummy text 2"
    },
    {
        id: 3,
        author: "Ahmed",
        date: "July 31, 2025 at 9:13 am",
        type: "Private Note",
        text: "Dummy text 3"
    }
];

const noteTypes = ["Private Note", "Customer Note"];

function OrderNotesCard() {
    const [notes, setNotes] = useState(initialNotes);
    const [comment, setComment] = useState("");
    const [noteType, setNoteType] = useState(noteTypes[0]);

    const handleAddNote = () => {
        if (!comment.trim()) return;
        const newNote = {
            id: notes.length + 1,
            author: "You",
            date: new Date().toLocaleString(),
            type: noteType,
            text: comment
        };
        setNotes([newNote, ...notes]);
        setComment("");
    };

    return (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-4 max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg">Order Notes</span>
                <button
                    className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
                    onClick={() => setNotes(initialNotes)}
                    title="Reload Notes"
                >
                    Reload Notes <span className="material-icons text-base">refresh</span>
                </button>
            </div>
            <div className="overflow-y-auto max-h-64 mb-4 pr-2">
                {notes.map(note => (
                    <div key={note.id} className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-icons text-gray-400">person</span>
                            <span className="font-semibold text-sm">{note.author}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                            added a note at {note.date}
                        </div>
                        <div className="bg-teal-100 rounded p-2 text-sm mb-1">{note.text}</div>
                    </div>
                ))}
            </div>
            <div className="border-t pt-3">
                <div className="flex items-start gap-2 mb-2">
                    <span className="material-icons text-gray-400 mt-2">person</span>
                    <textarea
                        className="border rounded px-3 py-2 w-full resize-none"
                        rows={2}
                        placeholder="Add your comment..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <select
                        className="border rounded px-2 py-1 text-sm"
                        value={noteType}
                        onChange={e => setNoteType(e.target.value)}
                    >
                        {noteTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <button
                        className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                        onClick={handleAddNote}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderNotesCard;
