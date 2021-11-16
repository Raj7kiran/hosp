import React, { useState, useRef, useEffect } from 'react'
//import { Form } from 'react-bootstrap'
import '../drop.css'

const Dropdown = ({ options, prompt, value, onChange, id , label  }) => { 	
//value is going to be sent from outide	//onchange is used to get the value when selected
//id and label is selected cozto send diff data liek countries , states etc

	const [open, setOpen] = useState(false)//this is for open n close of dropdown
	const ref = useRef(null)//this is for DOM so when we click out side the dropdown it would close
	const [query, setQuery] = useState('')//this is for filter

	useEffect(() => {
		document.addEventListener('click', close)
		return () => document.removeEventListener('click', close)
		// if(!value || query){
		// 	value = query
		// }
	})

	function close(e) {
		// console.dir([e.target, ref.current])
		setOpen(e && e.target === ref.current)
	}

	function filter(options){
		return options.filter(
				(option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
			)
	}

	function displayValue(){
		if(query.length>0) return query;
		if(value) return value[label];
		return ''
	}

	return(
		<div className='dropdown'>
			<div className='control' onClick={() => setOpen((prev) => !prev)} >
				<div className='selected-value'>
					<input 	type='text' ref={ref}
							placeholder={value ? value[label] : prompt}
							// value = { value[label] || query } //this will thrw error as or caluse wont work so we define a function
							value = {displayValue() || query}
							onChange= { e=> { 
												setQuery(e.target.value)
												onChange(e.target.value)
											}}
							onClick={() => setOpen(prev => !prev)} />
				</div>
				<div className={`arrow ${open ? 'open' : null}`} />
			</div>
			<div className={`options ${open ? 'open' : null}`}>
				{filter(options).map(option => 
					<div key={option[id]} 
						 className={`option ${ value === option ? 'selected': null }`}//this ternary option is for showing which option was selected
						 onClick = {() => {
						 setQuery('')//so this wil show the value selected instead of the query
						 onChange(option)
						 setOpen(false)
					 }  }
				 		>{option? option[label] : query}
					</div>)}
			</div>
		</div>

		)
}

export default Dropdown