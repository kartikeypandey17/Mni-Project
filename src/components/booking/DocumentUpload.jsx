import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, FileCheck, Upload, Trash2, ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react'

// Helper to format raw byte sizes to human-readable strings
const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '1.8 MB'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

// Step 4: Document Upload UI Component
function DocumentUpload({ documents, setDocuments, onNext, onBack }) {
  const [errorMsg, setErrorMsg] = useState(null)

  // Document requirement definitions
  const documentTypes = [
    {
      id: 'idProof',
      title: 'Identity Proof',
      required: true,
      description: 'Government photo ID (Aadhaar Card, Passport, or Voter ID)'
    },
    {
      id: 'addressProof',
      title: 'Address Proof',
      required: true,
      description: 'Proof of residence (Utility Bill, Rental Agreement, or Govt ID)'
    },
    {
      id: 'licenseCert',
      title: 'Drone License / Certification',
      required: false,
      description: 'Optional DGCA RPC License or FAA Part 107 Certification'
    }
  ]

  // File change handler
  const handleFileChange = (docId, file) => {
    if (!file) return

    // Allowed file formats check (PDF, JPG, PNG)
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png']
    const fileExt = file.name.split('.').pop().toLowerCase()

    if (!allowedExtensions.includes(fileExt)) {
      setErrorMsg(`Invalid file type format: .${fileExt}. Allowed formats are PDF, JPG, PNG.`)
      return
    }

    setErrorMsg(null)
    setDocuments({
      ...documents,
      [docId]: {
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        rawSize: file.size,
        fileType: fileExt.toUpperCase(),
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Uploaded'
      }
    })
  }

  // Remove document handler
  const handleRemoveDocument = (docId) => {
    const updated = { ...documents }
    delete updated[docId]
    setDocuments(updated)
  }

  // Next validation check
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!documents.idProof) {
      setErrorMsg('Please select a file for Identity Proof.')
      return
    }
    if (!documents.addressProof) {
      setErrorMsg('Please select a file for Address Proof.')
      return
    }
    setErrorMsg(null)
    onNext()
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
      
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Step 4: Digital Verification & Documents
        </h2>
        <p className="text-slate-500 text-sm">
          Please upload required identification documents to comply with drone rental security guidelines.
        </p>
      </div>

      {/* Allowed Formats Indicator Banner */}
      <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-900 font-semibold">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Encrypted Security Check</span>
        </div>
        <span className="bg-white px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-600 border border-blue-100">
          Allowed Formats: PDF, JPG, PNG
        </span>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Document Selection List */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {documentTypes.map((doc) => {
          const uploadedDoc = documents[doc.id]

          return (
            <div
              key={doc.id}
              className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                uploadedDoc
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
              }`}
            >
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {doc.title}
                    </span>
                    {doc.required ? (
                      <span className="bg-rose-100 text-rose-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                        REQUIRED
                      </span>
                    ) : (
                      <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        OPTIONAL
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{doc.description}</p>
                </div>

                {/* Upload Status Badge */}
                {uploadedDoc && (
                  <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Uploaded & Ready</span>
                  </div>
                )}
              </div>

              {/* Uploaded File Details Card vs File Selection Input */}
              {uploadedDoc ? (
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-extrabold text-[11px]">
                      {uploadedDoc.fileType}
                    </div>
                    <div className="truncate space-y-0.5">
                      <div className="font-bold text-slate-900 truncate">
                        {uploadedDoc.fileName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Size: {uploadedDoc.fileSize} • Uploaded at {uploadedDoc.uploadedAt}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveDocument(doc.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Remove Document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/50 p-4 rounded-xl cursor-pointer transition-colors text-xs font-bold text-slate-700">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>Click to select {doc.title} file</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(doc.id, e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

            </div>
          )
        })}

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md shadow-blue-500/25 hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Review & Pricing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  )
}

export default DocumentUpload
