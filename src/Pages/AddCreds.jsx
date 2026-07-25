import React, { useState, useEffect } from 'react';
import { fields, types, textFields, radioOptions, DocFields, selectOptions, dateFields } from '../assets/Data';
import { useLocation } from 'react-router-dom';
import { addCredential } from '../core/user';
import { NotebookPen, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react';

export default function AddCreds() {

	const location = useLocation();

	const [type, setType] = useState(location.state?.type || "")

	const [formData, setFormData] = useState({})
	const [errors, setErrors] = useState({})

	const fieldKey = (field) => field.replace(/[^\w]+/g, '_').replace(/^_+|_+$/g, '').toLowerCase()

	const isNumericField = (field) => /(amount|package|score|id|number|qty|quantity|count|year|years|percentage|percent)/i.test(field)
	const isBooleanField = (field) => /^(is\b|has\b)/i.test(field);
	const isSelectField = (field, type) => !!selectOptions?.[type]?.[field];
	const isRadioField = (field, type) => !!radioOptions?.[type]?.[field];
	const isFile = (field, type) => !!DocFields?.[type]?.includes(field) || false;
	const isDateField = (field, type) => !!dateFields?.[type]?.includes(field) || false
	const isTextField = (field, type) => !!textFields?.[type]?.includes(field) || false
	const isAcademicYearField = (field) => /academic year/i.test(field)
	const isYearField = (field) => /\byear\b/i.test(field) && !/academic year/i.test(field)
	const isStartDateField = (field) => /\bstart date\b/i.test(field) || /\(from\)$/i.test(field)
	const isEndDateField = (field) => /\bend date\b/i.test(field) || /\(to\)$/i.test(field)
	const isRequiredField = (field) => !/if any/i.test(field)

	const parseDateValue = (value) => {
		const date = new Date(value)
		return Number.isNaN(date.getTime()) ? null : date
	}

	const validateField = (field, value, data) => {
		const trimmed = value === null || value === undefined ? '' : value.toString().trim()
		const required = isRequiredField(field)

		if (!required && trimmed === '') {
			return null
		}
		if (trimmed === '') {
			return 'This field is required.'
		}

		if (isAcademicYearField(field)) {
			if (!/^\d{4}-\d{4}$/.test(trimmed)) {
				return 'Academic year must use YYYY-YYYY format.'
			}
			const [startYear, endYear] = trimmed.split('-').map(Number)
			if (endYear <= startYear) {
				return 'End year must be greater than start year.'
			}
			return null
		}

		if (isYearField(field)) {
			if (!/^\d{4}$/.test(trimmed)) {
				return 'Year must be a 4-digit value.'
			}
			const year = Number(trimmed)
			const currentYear = new Date().getFullYear()
			if (year < 1900 || year > currentYear) {
				return `Year must be between 1900 and ${currentYear}.`
			}
			return null
		}

		if (isStartDateField(field) || isEndDateField(field)) {
			const valueDate = parseDateValue(trimmed)
			if (!valueDate) {
				return 'Enter a valid date.'
			}

			const relatedField = fields[type].find((f) => {
				if (field === f) return false
				return isStartDateField(f) || isEndDateField(f)
			})
			if (relatedField) {
				const relatedKey = fieldKey(relatedField)
				const relatedValue = data?.[relatedKey]
				if (relatedValue) {
					const relatedDate = parseDateValue(relatedValue)
					if (relatedDate) {
						if (isEndDateField(field) && valueDate <= relatedDate) {
							return 'End date must be after start date.'
						}
						if (isStartDateField(field) && valueDate >= relatedDate) {
							return 'Start date must be before end date.'
						}
					}
				}
			}
		}

		return null
	}

	const validateAllFields = () => {
		const newErrors = {}
		fields[type].forEach((field) => {
			const key = fieldKey(field)
			const error = validateField(field, formData[key], formData)
			if (error) newErrors[key] = error
		})
		setErrors(newErrors)
		return newErrors
	}

	useEffect(() => {
		if (!type) {
			setFormData({})
			setErrors({})
			return
		}

		const init = {}
		fields[type].forEach((f) => {
			const k = fieldKey(f)
			if (isBooleanField(f)) init[k] = false
			else init[k] = ''
		})
		setFormData(init)
		setErrors({})
	}, [type])

	const handleChange = (e) => {
		const { name, value, type: inputType, checked } = e.target
		let val = value
		if (inputType === 'checkbox') val = checked
		else if (inputType === 'number') val = value === '' ? '' : Number(value)
		setFormData((p) => ({ ...p, [name]: val }))
	}

	const handleBlur = (field) => {
		const key = fieldKey(field)
		const newError = validateField(field, formData[key], formData)
		const relatedField = fields[type].find((f) => {
			if (field === f) return false
			return isStartDateField(f) || isEndDateField(f)
		})
		setErrors((prev) => {
			const next = { ...prev, [key]: newError }
			if (relatedField) {
				const relatedKey = fieldKey(relatedField)
				next[relatedKey] = validateField(relatedField, formData[relatedKey], formData)
			}
			return next
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userId = localStorage.getItem("userId");
		if (!userId) {
			alert("You must be logged in");
			return;
		}
		try {
			await addCredential(userId, type, formData);
			alert("Credential added successfully!");
			setFormData({});
			setType("");
		} catch (err) {
			alert(err.message);
		}
		const validationErrors = validateAllFields()
		if (Object.values(validationErrors).some((error) => error)) {
			console.log('Validation failed:', validationErrors)
			return
		}

		const payload = {
			type: type,
			formData,
		}
		console.log(payload)
	}

	return (
		<div className="sis-page-shell flex items-center justify-center px-4 py-10">
			<div className="w-full max-w-6xl overflow-hidden rounded-[32px] sis-panel grid lg:grid-cols-[1.1fr_0.9fr]">
				<div className="p-8 lg:p-10">
					<div className="mb-5 flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-white shadow-sm">
							<NotebookPen size={20} />
						</div>
						<div>
							<h1 className="text-2xl font-semibold text-[var(--primary)]">Add credentials</h1>
							<p className="text-sm text-[var(--on-surface-variant)]">Capture new academic, skill, or achievement details with confidence.</p>
						</div>
					</div>

					<div className="mb-5 flex flex-wrap items-center gap-2">
						<span className="sis-accent-pill"><Sparkles size={15} /> Guided entry</span>
						<span className="sis-accent-pill"><ShieldCheck size={15} /> Secure submission</span>
					</div>

					<div className="rounded-2xl border border-[var(--outline-variant)]/60 bg-[var(--surface-container-low)] p-5 shadow-sm">
						<div className="mb-4">
							<label className="mb-2 block text-sm font-semibold text-[var(--on-surface)]" htmlFor="type">Credential type</label>
							<select
								id="type"
								name="type"
								value={type}
								onChange={(e) => setType(e.target.value)}
								className="w-full rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
							>
								<option value="">Select type</option>
								{types.map((t) => (
									<option key={t} value={t}>
										{t.charAt(0).toUpperCase() + t.slice(1).replaceAll("_", " ")}
									</option>
								))}
							</select>
						</div>

						<form onSubmit={handleSubmit} className="mt-6 space-y-4">
							{type && (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{fields[type].map((field) => {
										const key = fieldKey(field)
										return (
											<div key={key}>
												<label className="mb-2 block text-sm font-semibold text-[var(--on-surface)]" htmlFor={key}>
													{field.charAt(0).toUpperCase() + field.slice(1)}
												</label>
												{
													// isBooleanField(field) ? (
													// 	<input
													// 		type="checkbox"
													// 		id={key}
													// 		name={key}
													// 		checked={!!formData[key]}
													// 		onChange={handleChange}
													// 		className="h-4 w-4"
													// 	/>
													// ) :
													isRadioField(field, type) ? (
														<div>
															<div className="flex flex-wrap gap-3">
																{radioOptions[type][field].map((opt) => (
																	<label key={opt} className="inline-flex items-center gap-2 text-sm text-[var(--on-surface-variant)]">
																		<input
																			type="radio"
																			name={key}
																			value={opt}
																			checked={formData[key] === opt}
																			onChange={handleChange}
																			className="h-4 w-4 accent-[var(--primary)]"
																		/>
																		<span>{opt.charAt(0).toUpperCase() + opt.slice(1).replaceAll("_", " ")}</span>
																	</label>
																))}
															</div>
															{errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>}
														</div>
													)
														:
														isSelectField(field, type) ? (
															<>
																<select
																	type="number"
																	id={key}
																	name={key}
																	value={formData[key] ?? ''}
																	onChange={handleChange}
																	onBlur={() => handleBlur(field)}
																	className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d] ${errors[key] ? 'border-red-500' : 'border-slate-300'}`}
																>
																	<option value="">Select</option>
																	{selectOptions[type][field].map((opt) => (

																		<option key={opt} value={opt}>
																			{opt.charAt(0).toUpperCase() + opt.slice(1).replaceAll("_", " ")}
																		</option>
																	))}
																</select>
																{errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>}
															</>
														) :
															isDateField(field, type) ? (
																<>
																	<input
																		type="date"
																		id={key}
																		name={key}
																		value={formData[key] ?? ''}
																		onChange={handleChange}
																		onBlur={() => handleBlur(field)}
																		className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d] ${errors[key] ? 'border-red-500' : 'border-slate-300'}`}
																	/>
																	{errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>}
																</>
															) :
																isTextField(field, type) ? (
																	<>
																		<textarea
																			id={key}
																			name={key}
																			value={formData[key] ?? ''}
																			onChange={handleChange}
																			onBlur={() => handleBlur(field)}
																			className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d] ${errors[key] ? 'border-red-500' : 'border-slate-300'}`}
																		/>
																		{errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>}
																	</>
																)
																	: isNumericField(field) ? (
																		<>
																			<input
																				type="number"
																				id={key}
																				name={key}
																				value={formData[key] ?? ''}
																				onChange={handleChange}
																				onBlur={() => handleBlur(field)}
																				className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d] ${errors[key] ? 'border-red-500' : 'border-slate-300'}`}
																			/>
																			{errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>}
																		</>
																	)
																		:
																		isFile(field, type) ? (
																			<>
																				<input
																					type="file"
																					id={key}
																					name={key}
																					onChange={handleChange}
																					className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d] ${errors[key] ? 'border-red-500' : 'border-slate-300'}`}
																				/>
																				{errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>}
																			</>
																		)
																			: (
																				<>
																					<input
																						type="text"
																						id={key}
																						name={key}
																						value={formData[key] ?? ''}
																						onChange={handleChange}
																						className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d] ${errors[key] ? 'border-red-500' : 'border-slate-300'}`}
																					/>
																					{errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>}
																				</>
																			)}
											</div>
										)
									})}
								</div>
							)}

							<div className="mt-6">
								{type ? (
									<button
										type="submit"
										className="inline-flex items-center px-4 py-2 bg-[#1a365d] text-white rounded-md hover:bg-[#002045] focus:outline-none"
									>
										Submit
									</button>
								) : (
									<p className="text-sm text-slate-500">Please select a type to add credentials.</p>
								)}
							</div>
						</form>
					</div>

					<div className="relative hidden lg:block">
						<img src="/images/academics.jpg" alt="" className="h-full w-full object-cover" />
						<div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/80 via-[var(--primary)]/30 to-transparent" />
						<div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-white/15 p-5 text-white backdrop-blur-md">
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary-fixed)]">Student portal</p>
							<h2 className="mt-2 text-2xl font-semibold">Keep every achievement in one polished profile.</h2>
							<p className="mt-2 text-sm text-[var(--primary-fixed)]">Use the same structure for internships, projects, certifications, and extracurriculars.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}