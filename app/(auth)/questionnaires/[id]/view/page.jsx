"use client";

import { useState } from "react";

const QuestionnaireDetailPage = ({ params }) => {
  const { id } = params;
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const [isPrescriptionsOpen, setIsPrescriptionsOpen] = useState(true);
  const [isNotesOpen, setIsNotesOpen] = useState(true);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isImagesOpen, setIsImagesOpen] = useState(true);

  // Mock data - in real app this would come from API
  const questionnaire = {
    id: id,
    entryId: "1821072916813763",
    type: "Hair Questionnaire",
    status: "Full",
    placedDate: "January 12, 2025 14:34",
    consultedBy: "--",
    approvedBy: "Corey Wideman",
    approvedDate: "13 Jan, 2025 13:20:58",
    user: {
      name: "Gabriel Moraes",
      email: "gabtmor@gmail.com",
      phone: "(647) 721-7767",
      dateOfBirth: "June 11, 1999",
      province: "Ontario",
    },
    questions: [
      {
        question: "What is your biological sex (assigned sex at birth)?",
        answer: "Male",
        type: "radio",
      },
      {
        question: "What best describes your hair?",
        answer: "Receding hairline",
        type: "radio",
      },
      {
        question: "What sort of results are you looking for?",
        answer: "Regrowing my hair",
        type: "radio",
      },
      {
        question: "Have you ever been diagnosed with liver problems?",
        answer: "No",
        type: "radio",
      },
      {
        question: "Have you ever been diagnosed with Breast Cancer?",
        answer: "No",
        type: "radio",
      },
      {
        question: "Have you ever been diagnosed with prostate cancer?",
        answer: "No",
        type: "radio",
      },
      {
        question: "Pustules or crusting",
        answer: "No, none of these",
        type: "checkbox",
      },
      {
        question: "Do you have any of the following conditions?",
        answer: "Eczema of the scalp, Alopecia areata",
        type: "checkbox",
      },
      {
        question: "Is it currently active?",
        answer: "No, my scalp is clear",
        type: "radio",
      },
      {
        question: "Premature ejaculation",
        answer: "Premature ejaculation",
        type: "condition",
      },
      {
        question:
          "Have you been diagnosed or currently experiencing any of the following medical conditions?",
        answer: "None of the above",
        type: "checkbox",
      },
      {
        question: "Do you currently take any medications?",
        answer: "No",
        type: "radio",
      },
      {
        question: "Do you have any other medical conditions?",
        answer: "No",
        type: "radio",
      },
      {
        question: "Do you have any known allergies?",
        answer: "No",
        type: "radio",
      },
      {
        question: "Hair Medication Acknowledgement",
        answer: "About your medication",
        type: "acknowledgement",
      },
    ],
    prescriptions: [
      {
        medication: "Finasteride 1mg",
        prescribedBy: "Corey Wideman",
        date: "13 Jan, 2025 13:21:26",
      },
    ],
    notes: [
      {
        author: "Corey Wideman",
        content: "Questionnaire approved and prescription issued",
        date: "13 Jan, 2025 13:20:58",
      },
      {
        author: "Marienne Eunice",
        content: "Assigned to Doctor Corey Wideman",
        date: "12 Jan, 2025 14:35:00",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Type here to search a questionnaire by its Entry ID, User Name, or email address..."
              className="w-full px-4 py-3 pl-10 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Approval Banner */}
        <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <p className="text-green-800 font-medium">
            Questionnaire Approved By {questionnaire.approvedBy} on{" "}
            {questionnaire.approvedDate}
          </p>
          <button className="text-green-800 hover:text-green-900">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Questionnaire Header */}
            <div className="bg-white rounded-lg border border-secondary-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900">
                      Entry ID #{questionnaire.entryId}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 text-secondary-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <p className="text-secondary-600">{questionnaire.type}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {questionnaire.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-secondary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-secondary-500">
                      Questionnaire placed {questionnaire.placedDate}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-secondary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-sm text-secondary-500">
                      Consulted By {questionnaire.consultedBy}
                    </span>
                  </div>

                  <div className="relative">
                    <button className="px-4 py-2 border border-secondary-200 rounded-lg text-secondary-700 hover:bg-primary-100 hover:text-secondary-900 flex items-center space-x-1">
                      <span>Actions</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="bg-white rounded-lg border border-secondary-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Patient Demographics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-secondary-500">Name</p>
                  <p className="font-medium text-secondary-900">
                    {questionnaire.user.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Email</p>
                  <p className="font-medium text-secondary-900">
                    {questionnaire.user.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Phone</p>
                  <p className="font-medium text-secondary-900">
                    {questionnaire.user.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Date of Birth</p>
                  <p className="font-medium text-secondary-900">
                    {questionnaire.user.dateOfBirth}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Province</p>
                  <p className="font-medium text-secondary-900">
                    {questionnaire.user.province}
                  </p>
                </div>
              </div>
            </div>

            {/* Questions and Answers */}
            <div className="bg-white rounded-lg border border-secondary-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Questions & Answers
              </h3>
              <div className="space-y-6">
                {questionnaire.questions.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-secondary-100 pb-4 last:border-b-0"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-secondary-700">
                        {item.question}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border border-secondary-300 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        </div>
                        <p className="text-sm text-secondary-900">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Patient Images */}
            <div className="bg-white rounded-lg border border-secondary-200 shadow-sm">
              <button
                onClick={() => setIsImagesOpen(!isImagesOpen)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-primary-100"
              >
                <h3 className="text-lg font-semibold text-secondary-900">
                  Patient Images
                </h3>
                <svg
                  className={`w-5 h-5 text-secondary-400 transform transition-transform ${
                    isImagesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isImagesOpen && (
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-square bg-secondary-100 rounded-lg flex items-center justify-center">
                      <span className="text-secondary-400 text-sm">
                        ID Card Photo
                      </span>
                    </div>
                    <div className="aspect-square bg-secondary-100 rounded-lg flex items-center justify-center">
                      <span className="text-secondary-400 text-sm">
                        Before Photo
                      </span>
                    </div>
                    <div className="col-span-2 aspect-square bg-secondary-100 rounded-lg flex items-center justify-center">
                      <span className="text-secondary-400 text-sm">
                        After Photo
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg border border-secondary-200 shadow-sm">
              <button
                onClick={() => setIsDocumentsOpen(!isDocumentsOpen)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-primary-100"
              >
                <h3 className="text-lg font-semibold text-secondary-900">
                  Documents
                </h3>
                <svg
                  className={`w-5 h-5 text-secondary-400 transform transition-transform ${
                    isDocumentsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDocumentsOpen && (
                <div className="px-4 pb-4">
                  <p className="text-secondary-500 text-sm">
                    No documents uploaded
                  </p>
                </div>
              )}
            </div>

            {/* Prescriptions */}
            <div className="bg-white rounded-lg border border-secondary-200 shadow-sm">
              <button
                onClick={() => setIsPrescriptionsOpen(!isPrescriptionsOpen)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-primary-100"
              >
                <h3 className="text-lg font-semibold text-secondary-900">
                  Prescriptions
                </h3>
                <svg
                  className={`w-5 h-5 text-secondary-400 transform transition-transform ${
                    isPrescriptionsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isPrescriptionsOpen && (
                <div className="px-4 pb-4 space-y-3">
                  {questionnaire.prescriptions.map((prescription, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-primary-200 pl-3"
                    >
                      <p className="font-medium text-secondary-900">
                        {prescription.medication}
                      </p>
                      <p className="text-sm text-secondary-600">
                        Prescribed by {prescription.prescribedBy}
                      </p>
                      <p className="text-sm text-secondary-500">
                        {prescription.date}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg border border-secondary-200 shadow-sm">
              <button
                onClick={() => setIsNotesOpen(!isNotesOpen)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-primary-100"
              >
                <h3 className="text-lg font-semibold text-secondary-900">
                  Notes
                </h3>
                <svg
                  className={`w-5 h-5 text-secondary-400 transform transition-transform ${
                    isNotesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isNotesOpen && (
                <div className="px-4 pb-4 space-y-3">
                  {questionnaire.notes.map((note, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-primary-200 pl-3"
                    >
                      <p className="font-medium text-secondary-900">
                        {note.author}
                      </p>
                      <p className="text-sm text-secondary-700">
                        {note.content}
                      </p>
                      <p className="text-sm text-secondary-500">{note.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Manage Tags */}
            <div className="bg-white rounded-lg border border-secondary-200 shadow-sm">
              <button
                onClick={() => setIsTagsOpen(!isTagsOpen)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-primary-100"
              >
                <h3 className="text-lg font-semibold text-secondary-900">
                  Manage Tags
                </h3>
                <svg
                  className={`w-5 h-5 text-secondary-400 transform transition-transform ${
                    isTagsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isTagsOpen && (
                <div className="px-4 pb-4">
                  <p className="text-secondary-500 text-sm">No tags assigned</p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg border border-secondary-200 shadow-sm">
              <button
                onClick={() => setIsTimelineOpen(!isTimelineOpen)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-primary-100"
              >
                <h3 className="text-lg font-semibold text-secondary-900">
                  Timeline (Global/Consultation)
                </h3>
                <svg
                  className={`w-5 h-5 text-secondary-400 transform transition-transform ${
                    isTimelineOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isTimelineOpen && (
                <div className="px-4 pb-4">
                  <p className="text-secondary-500 text-sm">
                    No timeline events
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireDetailPage;
