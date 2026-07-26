import React from 'react';
import { BookOpen, Calendar, MapPin, Award } from 'lucide-react';
import CredentialCategoryLayout from './CredentialCategoryLayout';

export default function ConferencePaper({ items = [] }) {
  return (
    <CredentialCategoryLayout
      title="Conference Papers"
      items={items}
      certificateKey="conferenceCertificate"
      badgeText={(item) => item.scope || 'National'}
      renderCardContent={(item) => (
        <>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-50 rounded-xl text-blue-600">
              <BookOpen size={20} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{item.titleOfThePaper || item.title || "Paper Title"}</h3>
              <p className="text-sm font-semibold text-slate-500">{item.nameOfTheConference || item.conference || "Conference Name"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 pt-2 border-t border-slate-50">
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Organized By & Venue</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <MapPin size={14} className="text-slate-400" />
                {item.organizedBy || "N/A"} {item.venue ? `(${item.venue}, ${item.modeOfConference || ''})` : ''}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Date</span>
              <span className="text-slate-700 font-semibold flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" />
                {item.fromDate} {item.toDate ? `to ${item.toDate}` : ''}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">ISBN & DOI</span>
              <span className="text-slate-700 font-semibold">
                ISBN: {item.isbnNumber || "N/A"} {item.doi ? `• DOI: ${item.doi}` : ''}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Proceedings & Publisher</span>
              <span className="text-slate-700 font-semibold">
                {item.conferenceProceedingsTitle || "N/A"} • {item.publisherName || "N/A"}
              </span>
            </div>
            <div className="text-sm sm:col-span-2">
              <span className="text-slate-400 font-medium block text-xs uppercase tracking-wider">Authors & Affiliations</span>
              <span className="text-slate-700 font-semibold">
                List: {item.authorsList || "N/A"} ({item.noOfAuthors || "1"} authors) • Affiliation: {item.affiliationOfAuthors || "N/A"}
              </span>
            </div>
            {item.bestPaperAwardCertificateIfGot && (
              <div className="text-sm sm:col-span-2 flex items-center gap-1.5 text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-100">
                <Award size={14} />
                <span className="font-bold">Won Best Paper Award!</span>
              </div>
            )}
          </div>
        </>
      )}
    />
  );
}
