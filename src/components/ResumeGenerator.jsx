import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResumeGenerator({ studentData = {}, onClose = () => {} }) {
	const resumeRef = useRef();

	const pickEducation = (history = []) => {
		const primary = history.find(h => /bachelor|graduat|degree|b\.tech|btech|b\.tech/i.test((h.degree || '').toLowerCase()));
		const intermediate = history.find(h => /intermediate|12th|higher secondary|hsc/i.test((h.degree || '').toLowerCase()));
		const list = [];
		if (primary) list.push(primary);
		if (intermediate) list.push(intermediate);
		return list;
	};

	const handleDownload = async () => {
		const input = resumeRef.current;
		if (!input) return;
		const scale = 2; // increase resolution
		const inputRect = input.getBoundingClientRect();
		const canvas = await html2canvas(input, { scale, useCORS: true, backgroundColor: '#ffffff' });
		const imgData = canvas.toDataURL('image/png');
		const pdf = new jsPDF('p', 'pt', 'a4');
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
		pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

		// Add clickable links annotations for any `.resume-link` anchors inside the resume
		const links = input.querySelectorAll && input.querySelectorAll('.resume-link');
		if (links && links.length) {
			const factor = pdfWidth / inputRect.width; // maps DOM px -> PDF pts
			links.forEach(link => {
				try {
					const rect = link.getBoundingClientRect();
					const x = (rect.left - inputRect.left) * factor;
					const y = (rect.top - inputRect.top) * factor;
					const w = rect.width * factor;
					const h = rect.height * factor;
					const url = link.href;
					if (url) pdf.link(x, y, w, h, { url });
				} catch (e) {
					// ignore per-link errors
				}
			});
		}

		const name = (studentData.fullName || 'resume').replace(/\s+/g, '_');
		pdf.save(`${name}.pdf`);
	};

	// convert image URL to data URL (falls back to original URL on error)
	const imageToDataURL = async (url) => {
		if (!url) return url;
		if (url.startsWith('data:')) return url;
		try {
			const res = await fetch(url);
			const blob = await res.blob();
			return await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result);
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});
		} catch (e) {
			return url; // fall back
		}
	};

	// Open a printable HTML view (user can Save as PDF from browser print dialog)
	const handlePrint = async () => {
		const input = resumeRef.current;
		if (!input) return;
		const clone = input.cloneNode(true);

		// inline images to avoid CORS issues when printing
		const imgs = clone.querySelectorAll('img');
		for (let img of imgs) {
			try {
				const data = await imageToDataURL(img.src);
				img.src = data;
			} catch (e) {
				// ignore
			}
		}

		// ensure profile links open externally and are preserved
		const links = clone.querySelectorAll('a');
		links.forEach(a => { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener noreferrer'); });

		// simple print stylesheet to preserve layout and pale headings
		const printStyles = `
			@page{size:A4;margin:20mm}
			body{font-family:Arial,Helvetica,sans-serif;color:#111}
			.container{max-width:794px;margin:0 auto}
			.section-title{background:#f7eefb;padding:6px 10px;border-radius:6px}
			.skill{display:inline-block;padding:6px 10px;background:#f3f0fb;border-radius:18px;margin:4px;font-size:12px;color:#2b0b3a}
			.profile-link{display:inline-block;padding:6px 10px;background:#eef6ff;border-radius:6px;color:#0b4a8f;text-decoration:none;margin:4px}
			img{max-width:100%;height:auto}
		`;

		const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${
				'<style>' + printStyles + '</style>'
			}</head><body><div class="container">${clone.innerHTML}</div></body></html>`;

		const w = window.open('', '_blank');
		if (!w) return;
		w.document.open();
		w.document.write(html);
		w.document.close();
		w.focus();
		// give browser a moment to layout images
		setTimeout(() => { w.print(); }, 500);
	};

	const education = pickEducation(studentData.academicHistory || []);

	// normalize profiles: accept object {LinkedIn: url} or array [{tag, url}]
	const profiles = (() => {
		if (!studentData.profiles) return [];
		if (Array.isArray(studentData.profiles)) return studentData.profiles;
		return Object.entries(studentData.profiles).map(([tag, url]) => ({ tag, url }));
	})();

	return (
		<div style={overlayStyle}>
			<div style={modalStyle}>
				<div style={headerStyle}>
					<h3 style={{ margin: 0 }}>Generate Resume</h3>
					<button onClick={onClose} style={iconBtnStyle}><X size={16} /></button>
				</div>

				<div style={{ display: 'flex', gap: 18 }}>
					<div ref={resumeRef} style={resumeStyle}>
						<div style={resumeHeader}>
							<div style={{ maxWidth: '70%' }}>
								<h1 style={{ margin: 0, fontSize: 24, letterSpacing: 0.2 }}>{studentData.fullName}</h1>
								<p style={{ margin: '6px 0 0', color: '#666', fontSize: 12 }}>{studentData.department} • Batch {studentData.batchYear}</p>
								<p style={{ margin: '8px 0 0', color: '#333', fontSize: 13 }}>{studentData.email} • {studentData.phoneNumber}</p>
							</div>
							<div style={photoWrapper}>
								{studentData.photoUrl && (
									<img src={studentData.photoUrl} alt="photo" style={photoStyle} crossOrigin="anonymous" />
								)}
							</div>
						</div>

						{/* Profiles (LinkedIn / GitHub etc.) */}
						{profiles && profiles.length > 0 && (
							<section style={sectionStyle}>
								<h4 style={sectionTitle}>Profiles</h4>
								<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
									{profiles.map((p, i) => (
										<a
											key={i}
											className="resume-link"
											href={p.url}
											target="_blank"
											rel="noopener noreferrer"
											style={profileLinkStyle}
										>
											{p.tag}
										</a>
									))}
								</div>
							</section>
						)}

						{/* Objective (optional) */}
						{studentData.objective && (
							<section style={sectionStyle}>
								<h4 style={sectionTitle}>Objective</h4>
								<p style={sectionText}>{studentData.objective}</p>
							</section>
						)}

						{/* Education */}
						{education.length > 0 && (
							<section style={sectionStyle}>
								<h4 style={sectionTitle}>Education</h4>
								{education.map((ed, i) => (
									<div key={i} style={{ marginBottom: 10 }}>
										<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
											<strong style={{ fontSize: 13 }}>{ed.degree}</strong>
											<span style={{ color: '#666', fontSize: 12 }}>{ed.yearOfCompletion || ed.year || ''}</span>
										</div>
										<div style={{ color: '#444', fontSize: 12 }}>{ed.institution} {ed.grade ? `• ${ed.grade}` : ''}</div>
									</div>
								))}
							</section>
						)}

						{/* Skills */}
						{studentData.skills && studentData.skills.length > 0 && (
							<section style={sectionStyle}>
								<h4 style={sectionTitle}>Skills</h4>
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
									{studentData.skills.map((s, i) => (
										<span key={i} style={skillChip}>{s}</span>
									))}
								</div>
							</section>
						)}

						{/* Projects */}
						{studentData.projects && studentData.projects.length > 0 && (
							<section style={sectionStyle}>
								<h4 style={sectionTitle}>Projects</h4>
								{studentData.projects.map((p, i) => (
									<div key={i} style={{ marginBottom: 8 }}>
										<div style={{ display: 'flex', justifyContent: 'space-between' }}>
											<strong>{p.title}</strong>
											<span style={{ color: '#666' }}>{p.year || ''}</span>
										</div>
										<div style={{ color: '#444' }}>{p.description}</div>
									</div>
								))}
							</section>
						)}

						{/* Certifications / Achievements */}
						{(studentData.certifications && studentData.certifications.length > 0) || (studentData.achievements && studentData.achievements.length > 0) ? (
							<section style={sectionStyle}>
								<h4 style={sectionTitle}>Certifications & Achievements</h4>
								{studentData.certifications && studentData.certifications.map((c, i) => (
									<div key={`c-${i}`} style={{ marginBottom: 6 }}><strong>{c.name}</strong> <span style={{ color:'#666' }}>{c.issuer ? `• ${c.issuer}` : ''}</span></div>
								))}
								{studentData.achievements && studentData.achievements.map((a, i) => (
									<div key={`a-${i}`} style={{ marginBottom: 6 }}>{a}</div>
								))}
							</section>
						) : null}

					</div>

					<div style={{ width: 200, display: 'flex', flexDirection: 'column', gap: 10 }}>
						<button onClick={handlePrint} style={secondaryBtn}>Print to PDF</button>
						<button onClick={handleDownload} style={primaryBtn}>Download PDF</button>
						<button onClick={onClose} style={ghostBtn}>Close</button>
						<div style={{ fontSize: 12, color: '#666' }}>
							- Includes contact, education (graduation & intermediate), skills, projects, and certifications.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/* Styles */
const overlayStyle = {
	position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60,
};
const modalStyle = { background: '#fff', padding: 18, borderRadius: 12, width: '95%', maxWidth: 1200, boxShadow: '0 10px 40px rgba(0,0,0,0.4)' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 };
const iconBtnStyle = { background: 'transparent', border: 'none', cursor: 'pointer', color: '#333' };
const resumeStyle = { background: '#fff', padding: 26, width: 612, boxShadow: '0 8px 20px rgba(0,0,0,0.08)', borderRadius: 8, color: '#111', fontFamily: 'Arial, Helvetica, sans-serif' };
const resumeHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 };
const photoWrapper = { width: 96, height: 96, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: '2px solid #f3e8ff' };
const photoStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
const sectionStyle = { marginTop: 12 };
const sectionTitle = { margin: '0 0 8px 0', fontSize: 13, color: '#222', backgroundColor: '#f7eefb', padding: '6px 10px', borderRadius: 6 };
const sectionText = { margin: 0, color: '#333', lineHeight: 1.45 };
const skillChip = { padding: '6px 10px', background: '#f3f0fb', borderRadius: 18, fontSize: 12, color: '#2b0b3a' };
const profileLinkStyle = { display: 'inline-block', padding: '6px 10px', background: '#eef6ff', borderRadius: 6, color: '#0b4a8f', textDecoration: 'none', fontSize: 12 };
const primaryBtn = { padding: '10px 12px', background: '#8A2E88', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' };
const ghostBtn = { padding: '10px 12px', background: 'transparent', color: '#333', border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer' };
const secondaryBtn = { padding: '10px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' };
