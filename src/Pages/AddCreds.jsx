import React, { useState, useEffect } from 'react'
import { fields, types, textFields,radioOptions, DocFields, selectOptions, dateFields } from '../assets/Data'
import { useLocation } from 'react-router-dom'

export default function AddCreds() {

	const location = useLocation();

	const [type, setType] = useState(location.state?.type || "")

	const [formData, setFormData] = useState({})

	const fieldKey = (field) => field.replace(/[^\w]+/g, '_').replace(/^_+|_+$/g, '').toLowerCase()

	const isNumericField = (field) => /(amount|package|score|id|number|qty|quantity|count|year|years|percentage|percent)/i.test(field)
	const isBooleanField = (field) => /^(is\b|has\b)/i.test(field);
	const isSelectField = (field, type) => !!selectOptions?.[type]?.[field];
	const isRadioField = (field, type) => !!radioOptions?.[type]?.[field];
	const isFile = (field, type) => !!DocFields?.[type]?.includes(field) || false;
	const isDateField = (field, type) => !!dateFields?.[type]?.includes(field) || false
	const isTextField = (field,type) => !!textFields?.[type]?.includes(field) || false

	useEffect(() => {
		if (!type) {
			setFormData({})
			return
		}

		const init = {}
		fields[type].forEach((f) => {
			const k = fieldKey(f)
			if (isBooleanField(f)) init[k] = false
			else if (isNumericField(f)) init[k] = 0
			else init[k] = ''
		})
		setFormData(init)
	}, [type])

	const handleChange = (e) => {
		const { name, value, type: inputType, checked } = e.target
		let val = value
		if (inputType === 'checkbox') val = checked
		else if (inputType === 'number') val = value === '' ? '' : Number(value)
		setFormData((p) => ({ ...p, [name]: val }))
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = {
			type: type,
			formData,
		}
		console.log(payload)
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#f8f9ff' }}>
			<div className="w-full max-w-2xl">
				<header className="rounded-t-md p-6" style={{ background: '#002045', color: '#ffffff' }}>
					<h1 className="text-2xl font-semibold">Add Credentials</h1>
					<p className="text-sm mt-1 text-slate-200">Add details for the selected credential type</p>
				</header>

				<div className="bg-white border border-slate-300 rounded-b-md p-6 shadow-sm">
					<div className="mb-4">
						<label className="block mb-2 text-sm font-medium text-slate-700" htmlFor="type">Type</label>
						<select
							id="type"
							name="type"
							value={type}
							onChange={(e) => setType(e.target.value)}
							className="w-full p-2 border rounded-md bg-white text-slate-700 border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d]"
						>
							<option value="">Select Type</option>
							{types.map((t) => (
								<option key={t} value={t}>
									{t.charAt(0).toUpperCase() + t.slice(1).replaceAll("_", " ")}
								</option>
							))}
						</select>
					</div>

					<form onSubmit={handleSubmit}>
						{type && (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{fields[type].map((field) => {
									const key = fieldKey(field)
									return (
										<div key={key}>
											<label className="block mb-2 text-sm font-medium text-slate-700" htmlFor={key}>
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
													<div className="flex space-x-2">
														{radioOptions[type][field].map((opt) => (
															<label key={opt} className="inline-flex items-center">
																<input
																	type="radio"
																	name={key}
																	value={opt}
																	checked={formData[key] === opt}
																	onChange={handleChange}
																	className="h-4 w-4"
																/>
																<span className="ml-2 text-sm text-slate-700">{opt.charAt(0).toUpperCase() + opt.slice(1).replaceAll("_", " ")}</span>
															</label>
														))}

													</div>
												)
													:
													isSelectField(field, type) ? (
														<select
															type="number"
															id={key}
															name={key}
															value={formData[key] ?? ''}
															onChange={handleChange}
															className="w-full p-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d]"
														>
															<option value="">Select</option>
															{selectOptions[type][field].map((opt) => (

																<option key={opt} value={opt}>
																	{opt.charAt(0).toUpperCase() + opt.slice(1).replaceAll("_", " ")}
																</option>
															))}
														</select>
													) :
														isDateField(field, type) ? (
															<input
																type="date"
																id={key}
																name={key}
																value={formData[key] ?? ''}
																onChange={handleChange}
																className="w-full p-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d]"
															/>
														):
														isTextField(field,type) ? (
															<textarea
																id={key}
																name={key}
																value={formData[key] ?? ''}
																onChange={handleChange}
																className="w-full p-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d]"
															/>
														)
															: isNumericField(field) ? (
																<input
																	type="number"
																	id={key}
																	name={key}
																	value={formData[key] ?? ''}
																	onChange={handleChange}
																	className="w-full p-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d]"
																/>
															)
																:
																isFile(field, type) ? (
																	<input
																		type="file"
																		id={key}
																		name={key}
																		onChange={handleChange}
																		className="w-full p-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d]"
																	/>
																)
																	: (
																		<input
																			type="text"
																			id={key}
																			name={key}
																			value={formData[key] ?? ''}
																			onChange={handleChange}
																			className="w-full p-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d]"
																		/>
																	)}
										</div>
									)
								})}

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
							</div>)}
					</form>
				</div>
			</div>
		</div>
	)
}
