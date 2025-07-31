"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Calendar, Upload } from "lucide-react";

const TABS = [
  { key: "personal", label: "Personal Profile" },
  { key: "medical", label: "Medical Profile" },
  { key: "payment", label: "Payment Profile" },
  { key: "billing", label: "Billing and Shipping Info" },
  { key: "documents", label: "Documents" },
];

export default function EditUserPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [showActions, setShowActions] = useState(false);
  const [notesOpen, setNotesOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(true);
  const actionsRef = useRef();

  // File upload states
  const [photoFile, setPhotoFile] = useState(null);
  const [photoIdFile, setPhotoIdFile] = useState(null);
  const [insuranceFile, setInsuranceFile] = useState(null);
  const [labReqFile, setLabReqFile] = useState(null);
  const [labReportFile, setLabReportFile] = useState(null);

  // Add Card modal state
  const [showAddCard, setShowAddCard] = useState(false);
  // New: Dialog states for actions
  const [showPrescription, setShowPrescription] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  // Accordion state for subscription modal
  const [openAccordion, setOpenAccordion] = useState('existing');

  // Add New Prescription modal state
  const [medications, setMedications] = useState([]);
  const [isPreview, setIsPreview] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (actionsRef.current && !actionsRef.current.contains(e.target)) {
        setShowActions(false);
      }
    }
    if (showActions) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showActions]);

  return (
    <div className="flex gap-8 w-full">
      {/* Left: Tabbed Content */}
      <div className="flex-1 min-w-0">
        <Card className="overflow-visible">
          <div className="border-b">
            <nav className="flex space-x-2 px-6 pt-4">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-2 px-3 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? "border-primary text-primary"
                      : "border-transparent text-secondary-500 hover:text-secondary-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <CardContent className="py-8">
            {activeTab === "personal" && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold mb-4">Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">First name</label>
                    <Input type="text" defaultValue="Mitchell" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Last name</label>
                    <Input type="text" defaultValue="Bolduc" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-secondary-700">Email address</label>
                    <Input type="email" defaultValue="Mitch_bolduc_8@hotmail.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Phone Number</label>
                    <Input type="tel" defaultValue="+1 (555) 987-6543" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Gender</label>
                    <select className="w-full h-9 px-3 py-1 border border-secondary-200 rounded-md bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                      <option>Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Date Of Birth</label>
                    <div className="relative">
                      <Input type="text" defaultValue="" placeholder="mm/dd/yyyy" />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Province</label>
                    <Input type="text" defaultValue="" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-secondary-700">Photo</label>
                    <div className="flex items-center gap-4">
                      <Button type="button" variant="outline" onClick={() => document.getElementById('photo-upload').click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                      <span className="text-sm text-secondary-500">{photoFile ? photoFile.name : "No file chosen"}</span>
                      <input id="photo-upload" type="file" className="hidden" onChange={e => setPhotoFile(e.target.files[0])} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-secondary-700">Photo ID</label>
                    <div className="flex items-center gap-4">
                      <Button type="button" variant="outline" onClick={() => document.getElementById('photoid-upload').click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                      <span className="text-sm text-secondary-500">{photoIdFile ? photoIdFile.name : "No file chosen"}</span>
                      <input id="photoid-upload" type="file" className="hidden" onChange={e => setPhotoIdFile(e.target.files[0])} />
                    </div>
                    <div className="text-xs text-secondary-700 mt-1">
                      To upload PHOTO ID, select file and click on upload button. Once upload is complete click on <b>Update</b> button.
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-secondary-700">Insurance Card Image</label>
                    <div className="flex items-center gap-4">
                      <Button type="button" variant="outline" onClick={() => document.getElementById('insurance-upload').click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                      <span className="text-sm text-secondary-500">{insuranceFile ? insuranceFile.name : "No file chosen"}</span>
                      <input id="insurance-upload" type="file" className="hidden" onChange={e => setInsuranceFile(e.target.files[0])} />
                    </div>
                    <div className="text-xs text-secondary-700 mt-1">
                      To upload INSURANCE CARD IMAGE, select file and click on upload button. Once upload is complete click on <b>Update</b> button.
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">Permanent Note to Appear on Orders (for admins)</label>
                  <p className="text-sm text-secondary-600">If you want to add a note for patient to permanently appear on patients orders, please add it here.</p>
                  <textarea className="w-full min-h-[100px] p-3 border border-secondary-200 rounded-md bg-transparent text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" defaultValue="" placeholder="Enter permanent note..." />
                </div>
                {/* Button group for Profile tab */}
                <div className="flex justify-end gap-2 mt-8">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save</Button>
                </div>
              </div>
            )}
            {activeTab === "medical" && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold mb-4">Medical Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Allergies</label>
                    <Input type="text" defaultValue="None" />
                  </div>
                  <div className="flex items-end"><Button>Update</Button></div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Medication</label>
                    <Input type="text" defaultValue="None" />
                  </div>
                  <div className="flex items-end"><Button>Update</Button></div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Surgeries or Hospitalization</label>
                    <Input type="text" defaultValue="None" />
                  </div>
                  <div className="flex items-end"><Button>Update</Button></div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Medical Conditions</label>
                    <Input type="text" defaultValue="None" />
                  </div>
                  <div className="flex items-end"><Button>Update</Button></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Prescription(s)</h3>
                  <div className="border rounded-md p-4 bg-secondary-50 text-secondary-700">There are no prescriptions.</div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Order(s)</h3>
                  <div className="border rounded-md p-4 bg-secondary-50 text-secondary-700">No orders found.</div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Questionnaire(s)</h3>
                  <div className="border rounded-md p-4 bg-secondary-50 text-secondary-700">No questionnaires found.</div>
                </div>
              </div>
            )}
            {activeTab === "payment" && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold mb-4">Payment Profile</h2>
                <div className="flex gap-4 mb-4">
                  <Button variant="outline">Fetch/Sync from Bambora</Button>
                  <Button onClick={() => setShowAddCard(true)}>Add Payment Method</Button>
                </div>
                <div className="border rounded-md p-4 bg-secondary-50 text-secondary-700">No payment methods found.</div>
              </div>
            )}
            {activeTab === "billing" && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">First name</label>
                    <Input type="text" defaultValue="Mitchell" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Last name</label>
                    <Input type="text" defaultValue="Bolduc" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-secondary-700">Email address</label>
                    <Input type="email" defaultValue="Mitch_bolduc_8@hotmail.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Phone Number</label>
                    <Input type="tel" defaultValue="9054670951" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Country</label>
                    <select className="w-full h-9 px-3 py-1 border border-secondary-200 rounded-md bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                      <option>Canada</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Address Line 1</label>
                    <Input type="text" defaultValue="560 king st west" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">Address Line 2</label>
                    <Input type="text" defaultValue="425" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">City</label>
                    <Input type="text" defaultValue="Toronto" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-700">State / Province</label>
                    <Input type="text" defaultValue="ON" />
                  </div>
                </div>
                {/* Button group for Billing tab */}
                <div className="flex justify-end gap-2 mt-8">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save</Button>
                </div>
              </div>
            )}
            {activeTab === "documents" && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold mb-4">Documents</h2>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-secondary-700">Lab Test Requisition</label>
                    <div className="flex items-center gap-4 mt-2">
                      <Button type="button" variant="outline" onClick={() => document.getElementById('labreq-upload').click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                      <span className="text-sm text-secondary-500">{labReqFile ? labReqFile.name : "No file chosen"}</span>
                      <input id="labreq-upload" type="file" className="hidden" onChange={e => setLabReqFile(e.target.files[0])} />
                    </div>
                    <div className="text-xs text-secondary-700 mt-1">To upload Lab Test Requisition, select file and click on upload button.</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-secondary-700">Lab Test Report</label>
                    <div className="flex items-center gap-4 mt-2">
                      <Button type="button" variant="outline" onClick={() => document.getElementById('labreport-upload').click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                      <span className="text-sm text-secondary-500">{labReportFile ? labReportFile.name : "No file chosen"}</span>
                      <input id="labreport-upload" type="file" className="hidden" onChange={e => setLabReportFile(e.target.files[0])} />
                    </div>
                    <div className="text-xs text-secondary-700 mt-1">To upload Lab Test Report, select file and click on upload button.</div>
                  </div>
                </div>
                <div className="mt-8">
                  <table className="w-full border rounded-md">
                    <thead>
                      <tr className="bg-secondary-50 text-secondary-700">
                        <th className="p-2 text-left">NO</th>
                        <th className="p-2 text-left">Type of Document</th>
                        <th className="p-2 text-left">Document Name</th>
                        <th className="p-2 text-left">Date Uploaded</th>
                        <th className="p-2 text-left">Uploaded By</th>
                        <th className="p-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2" colSpan={6}>There are no data.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Right: Sidebar (persistent) */}
      <div className="w-[350px] flex-shrink-0 flex flex-col gap-6">
        {/* Actions Dropdown */}
        <div className="flex justify-end" ref={actionsRef}>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowActions((v) => !v)}
              className="w-40 h-12 px-6 py-2 rounded-lg  font-medium"
            >
              Actions ▾
            </Button>
            {showActions && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-secondary-50 cursor-pointer flex items-center gap-2 text-sm"
                    onClick={() => { setShowPrescription(true); setShowActions(false); }}
                  >
                    <span className="text-primary">＋</span> Add new prescription
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-secondary-50 cursor-pointer flex items-center gap-2 text-sm"
                    onClick={() => { setShowSubscription(true); setShowActions(false); }}
                  >
                    <span className="text-primary">＋</span> Create new subscription plan
                  </li>
                  <li className="px-4 py-2 hover:bg-secondary-50 cursor-pointer flex items-center gap-2 text-sm">
                    <span className="text-primary">📅</span> Schedule Appointment
                  </li>
                  <li className="px-4 py-2 text-secondary-400 flex items-center gap-2 cursor-not-allowed text-sm">
                    <span className="text-secondary-400">✉</span> Send Message
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Notes (Collapsible) */}
        <Card className='pt-0'>
          <CardHeader
            className="bg-secondary-100 rounded-t-lg cursor-pointer flex flex-row items-center justify-between"
            onClick={() => setNotesOpen((v) => !v)}
          >
            <CardTitle className="text-base py-3">Notes</CardTitle>
            <span className={`text-sm  transition-transform ${notesOpen ? "rotate-180" : ""}`}>▼</span>
          </CardHeader>
          {notesOpen && (
            <CardContent>
              <div className="text-secondary-500 mb-2">Notes not found</div>
              <textarea className="w-full min-h-[60px] p-2 border border-secondary-200 rounded-md bg-transparent text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary mb-2" defaultValue="" placeholder="Add your comment..." />
              <div className="flex gap-2">
                <select className="border border-secondary-200 rounded-md px-2 py-1 text-sm">
                  <option>Note</option>
                </select>
                <Button>Add</Button>
              </div>
            </CardContent>
          )}
        </Card>
        {/* Manage Tags (Collapsible) */}
        <Card className='pt-0'>
          <CardHeader
            className="bg-secondary-100 rounded-t-lg cursor-pointer flex flex-row items-center justify-between"
            onClick={() => setTagsOpen((v) => !v)}
          >
            <CardTitle className="text-base py-3">Manage Tags</CardTitle>
            <span className={`text-sm transition-transform ${tagsOpen ? "rotate-180" : ""}`}>▼</span>
          </CardHeader>
          {tagsOpen && (
            <CardContent>
              <div className="mb-2">
                <div className="font-medium text-sm mb-1">Assigned Tags</div>
                <div className="text-secondary-500 text-sm mb-2">No tags assigned yet.</div>
              </div>
              <div className="mb-2">
                <div className="font-medium text-sm mb-1">Assign Tags <span className="text-secondary-400" title="Assign tags to this user">&#9432;</span></div>
                <select className="w-full border border-secondary-200 rounded-md px-2 py-1 text-sm">
                  <option>Search & select tags...</option>
                </select>
              </div>
              <Button>Add Tags</Button>
            </CardContent>
          )}
        </Card>
      </div>
      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">Add Card</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddCard(false)}>✕</Button>
            </div>
            <form className="p-6 space-y-6">
              <div>
                <label className="text-sm font-medium text-secondary-700">Name</label>
                <Input type="text" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-secondary-700">Card number</label>
                <Input type="text" className="mt-1" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-secondary-700">Expiration date (MM/YY)</label>
                  <Input type="text" className="mt-1" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-secondary-700">&nbsp;</label>
                  <Input type="text" className="mt-1" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-secondary-700">CVC</label>
                  <Input type="text" className="mt-1" />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button type="submit">Add</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddCard(false)}>Decline</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Add New Prescription Modal */}
      {showPrescription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">Add New Prescription</h2>
              <Button variant="ghost" size="sm" onClick={() => { setShowPrescription(false); setIsPreview(false); }}>
                ✕
              </Button>
            </div>
            <div className="p-6">
              {!isPreview ? (
                <>
                  <div className="flex gap-4">
                    {/* Left: Prescription By, Date, User, Order */}
                    <div className="flex flex-col gap-4 w-64 bg-white rounded-lg p-4 border">
                      <div>
                        <label className="text-sm font-medium text-secondary-700">Prescription By</label>
                        <div className="mt-1 text-primary font-medium cursor-pointer">Dr. George Mankaryous ▾</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-secondary-700">Date of Creation</label>
                        <div className="mt-1 flex items-center gap-2 text-primary font-medium cursor-pointer">Jul 31 2025 <Calendar className="h-4 w-4" /></div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-secondary-700">Select User</label>
                        <div className="mt-1 text-primary font-medium cursor-pointer">Mitchell Bolduc ▾</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-secondary-700">Select Order</label>
                        <div className="mt-1 text-primary font-medium cursor-pointer">▾</div>
                      </div>
                    </div>
                    {/* Middle: Medication Forms */}
                    <div className="flex-1 bg-white rounded-lg p-4 border flex flex-col gap-4">
                      {medications.map((med, idx) => (
                        <div key={med.id} className="border rounded-md p-4 mb-4 bg-primary-50">
                          <div className="flex justify-end mb-2">
                            <Button
                              type="button"
                              variant="ghost"
                              className="text-red-600 bg-red-100 hover:bg-red-200 px-4 py-2 rounded-md font-medium"
                              onClick={() => setMedications(meds => meds.filter(m => m.id !== med.id))}
                            >
                              <span className="mr-2">&#8211;</span> Remove Medication
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Medication Name</label>
                              <Input type="text" className="mt-1" placeholder="Medication Name" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Medication Strength</label>
                              <Input type="text" className="mt-1" placeholder="Medication Strength" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Quantity</label>
                              <Input type="text" className="mt-1" placeholder="Quantity" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Duration</label>
                              <Input type="text" className="mt-1" placeholder="Duration" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-sm font-medium">Refills</label>
                              <Input type="text" className="mt-1" placeholder="Refills" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-sm font-medium">Instructions</label>
                              <Input type="text" className="mt-1" placeholder="Write Instructions here.." />
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full mt-2 flex items-center justify-center gap-2"
                        type="button"
                        onClick={() => setMedications(meds => [...meds, { id: Date.now() + Math.random() }])}
                      >
                        <span className="text-xl">＋</span> Add Medication
                      </Button>
                    </div>
                    {/* Right: Templates */}
                    <div className="w-64 bg-white rounded-lg p-4 border flex flex-col">
                      <div className="font-medium mb-2">Templates</div>
                      <div className="text-secondary-500">No result Found.</div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" className="flex-1">Save as Template</Button>
                    <Button variant="outline" className="flex-1" onClick={() => setIsPreview(true)}>Preview</Button>
                    <Button className="flex-1">Save</Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[500px]">
                  <div className="bg-white rounded-lg shadow p-8 w-full max-w-lg relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-4 left-4"
                      onClick={() => setIsPreview(false)}
                    >
                      &#8592; Back
                    </Button>
                    <div className="text-center font-bold text-lg mb-2">Dr. George Mankaryous</div>
                    <div className="text-center text-secondary-700 mb-2">5270 Solar Dr<br />Unit 15<br />+1 (833) 697-6259<br />CPSO : 125001</div>
                    <hr className="my-4" />
                    <div className="flex justify-between mb-2">
                      <div><b>Name:</b> Mitchell Bolduc</div>
                      <div><b>Age:</b> 55</div>
                    </div>
                    <div className="flex justify-between mb-2">
                      <div><b>Address:</b> 560 king st west 425, Toronto, ON</div>
                      <div><b>Date:</b> Jul 31 2025</div>
                    </div>
                    <div className="my-4">
                      <div className="font-medium text-secondary-500">Medications</div>
                      <div className="flex gap-8 mt-2">
                        {/* <div className="font-medium">Medication:</div> */}
                        <div>Dosage:</div>
                        <div>Quantity:</div>
                        <div>Duration:</div>
                        <div>Refills:</div>
                        <div>Instructions:</div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="font-medium">Signature:</div>
                      <div className="mt-2"><img src="/signature.png" alt="Signature" className="h-12" /></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10 text-7xl font-bold">COPY</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Create New Subscription Plan Modal */}
      {showSubscription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">Create New Subscription Plan</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowSubscription(false)}>✕</Button>
            </div>
            <div className="p-6 space-y-6">
              {/* Accordion: Existing Subscriptions */}
              <div className="rounded-lg border">
                <div
                  className="bg-secondary-100 rounded-t-lg p-4 font-medium flex items-center justify-between cursor-pointer"
                  onClick={() => setOpenAccordion(openAccordion === 'existing' ? null : 'existing')}
                >
                  Existing Subscriptions
                  <span className={`text-xl transition-transform ${openAccordion === 'existing' ? '' : 'rotate-180'}`}>▾</span>
                </div>
                {openAccordion === 'existing' && (
                  <div className="bg-white rounded-b-lg p-4 border-t">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="font-medium text-primary">Subscription #2458</div>
                        <div className="text-secondary-700">Mitchell Bolduc</div>
                        <div className="text-secondary-700">Order Total: CAD 180.40</div>
                        <div className="text-secondary-700">Payment Frequency: Every 1 month(s)</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Date</div>
                        <div className="text-secondary-700">Next Payment Date: Sat Feb 12 2022</div>
                        <div className="text-secondary-700">Created at: Sat Feb 12 2022</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Order Items</div>
                        <div className="text-secondary-700">Organic Hair Kit X 1</div>
                        <div className="text-secondary-700">Finasteride X 2</div>
                        <div className="text-secondary-700">Minoxidil X 1</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Billing</div>
                        <div className="text-secondary-700">Mitchell Bolduc</div>
                        <div className="text-secondary-700">560 king st west</div>
                        <div className="text-secondary-700">425</div>
                        <div className="text-secondary-700">Toronto ON M5V 0L5</div>
                        <div className="text-secondary-700">Payment Method: Credit Card</div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button className="bg-primary-800 text-white">Cancel previous subscription & Create new subscription</Button>
                    </div>
                  </div>
                )}
              </div>
              {/* Accordion: Choose Product */}
              <div className="rounded-lg border">
                <div
                  className="bg-secondary-100 rounded-t-lg p-4 font-medium flex items-center justify-between cursor-pointer"
                  onClick={() => setOpenAccordion(openAccordion === 'product' ? null : 'product')}
                >
                  Choose Product
                  <span className={`text-xl transition-transform ${openAccordion === 'product' ? '' : 'rotate-180'}`}>▾</span>
                </div>
                {openAccordion === 'product' && (
                  <div className="bg-white rounded-b-lg p-4 border-t">
                    {/* Product selection content goes here */}
                    <div className="text-secondary-500">Product selection UI here.</div>
                  </div>
                )}
              </div>
              {/* Accordion: Select Subscription Frequency */}
              <div className="rounded-lg border">
                <div
                  className="bg-secondary-100 rounded-t-lg p-4 font-medium flex items-center justify-between cursor-pointer"
                  onClick={() => setOpenAccordion(openAccordion === 'frequency' ? null : 'frequency')}
                >
                  Select Subscription Frequency
                  <span className={`text-xl transition-transform ${openAccordion === 'frequency' ? '' : 'rotate-180'}`}>▾</span>
                </div>
                {openAccordion === 'frequency' && (
                  <div className="bg-white rounded-b-lg p-4 border-t">
                    {/* Frequency selection content goes here */}
                    <div className="text-secondary-500">Frequency selection UI here.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}