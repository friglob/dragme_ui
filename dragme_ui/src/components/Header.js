import React, { useState,useEffect } from "react";
import axios from 'axios';

const formats = 	{	"4-3": 	"Standard 4:3" , 
						"3-2": 	"Classic 3:2", 
						"16-9": "Wide 16:9", 
						"1-1": 	"Square 1:1"
};

const rules = 	{		"thirds": 	"Rule of thirds", 
						"fibonaci": "Fibonaci spiral", 
						"fourths": 	"Rule of fourths", 
						"golden": 	"Golden ratio"
};



function Header(props){

	let format = '';

	useEffect(() => {
		format = props.state.vertical;
	}, [props]);

	const doUpload = (e) =>{

		const data = new FormData() 
		data.append('file', e.target.files[0]);
		axios.post("http://localhost/dragme_ui/imgTo64.php", data, {})
		.then(res => {
			props.setImage(res.data)
		})

	}

	return (

		<header className="header clearfix">
			
			<div className="left">
				<strong>
					<label>
						<small>&uarr; &nbsp;</small>
						{formats[props.state.vertical]}
						<small>&darr;</small>
					</label>
					<label>
						<small>&larr; &nbsp;</small>
						{rules[props.state.horizontal]}
						<small>&rarr;</small>
					</label>
				</strong>
			</div>

			<div className="right">
				<input className="btn" type="file" name="file" onChange={(e) => doUpload(e)}/>
			</div>

		</header>

	);
}

export default Header;
