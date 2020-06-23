import React,{useState, useEffect} from "react";
import _ from 'lodash';
import { baseUrl, formats } from './../components/Config';

function ListFormats(props){

	const [display, 		setDisplay] 		= useState('');

	useEffect(() => {
		console.log( props );
		setDisplay('active');
		setTimeout( ()=>setDisplay(''), 1500);
	}, [props]);

	const displayList = formats.map( format => {
		const itemClass = (format.key === props.format ) ? 'active' : '';
		return (
			<div className={`list-formats__item ${itemClass}`} >{format.title}</div>
		)
	});

	return (

		<div className={`list-formats ${display}`}>

			{displayList}
			
		</div>

	);
}

export default ListFormats;
