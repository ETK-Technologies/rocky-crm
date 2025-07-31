import React, { useState } from "react";

const initialNotes = [
    {
        id: 1,
        author: "Joshua Belanger",
        userId: 80291,
        date: "2025-07-31 12:48 pm",
        context: "User",
        text: "weight 158-160lbs. would like to get to 140-145lbs. plan to initiate ozempic 0.25mgx 4 weeks, then 0.5mg x 2 weeks"
    },
    {
        id: 2,
        author: "Joshua Belanger",
        questionnaireId: 1809656510339484,
        date: "2024-12-07 4:02 pm",
        context: "Questionnaire",
        text: "weight 158lbs. tolerating well. plan to continue on 1mg, and change to ozempic given shortage of semaglutide"
    },
    {
        id: 3,
        author: "Joshua Belanger",
        questionnaireId: 1809656510339484,
        date: "2024-11-04 4:27 pm",
        context: "Questionnaire",
        text: "162 lbs, slight nausea but tolerating, advised to increase to semaglutide 1mg x 4 weeks"
    }
];

function MedicalNotesCard() {
    const [notes, setNotes] = useState(initialNotes);
    const [comment, setComment] = useState("");

    const handleAddNote = () => {
        if (!comment.trim()) return;
        const newNote = {
            id: notes.length + 1,
            author: "Joshua Belanger",
            date: new Date().toLocaleString(),
            context: "User",
            text: comment
        };
        setNotes([newNote, ...notes]);
        setComment("");
    };

    return (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-4 max-w-lg mx-auto">
            <div className="overflow-y-auto max-h-64 mb-4 pr-2">
                {notes.map(note => (
                    <div key={note.id} className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">{note.author}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                            added a Medical Note on {note.context} {note.userId ? <a href={`#${note.userId}`} className="text-blue-600 underline">#{note.userId}</a> : null}
                            {note.questionnaireId ? <> on Questionnaire <a href={`#${note.questionnaireId}`} className="text-blue-600 underline">#{note.questionnaireId}</a></> : null}
                            {" "}at {note.date}
                        </div>
                        <div className="bg-orange-100 rounded p-2 text-sm mb-1">{note.text}</div>
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
                <button
                    className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                    onClick={handleAddNote}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default MedicalNotesCard;