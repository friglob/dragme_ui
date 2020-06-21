import React, { useState,useEffect } from "react";
import axios from 'axios';
import { formats, rules } from './../components/Config';



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

	const doReset = () => {
		props.setImage('')
	}

	return (

		<header className="header clearfix">
			
			<div className="left">
				{ props.image64 &&
					<strong>
						<label>
							{ props.state && <small>&uarr; &nbsp;</small> }
							{formats[props.state.vertical]}
							{ props.state && <small>&darr;</small> }
						</label>
						<label>
							{ props.state && <small>&larr; &nbsp;</small> }
							{rules[props.state.horizontal]}
							{ props.state &&  <small>&rarr;</small> }
						</label>
					</strong>
				}
				{ !props.image64 &&
					<strong>Upload image <small>&rarr;</small> </strong>
				}
			</div>

			<div className="right">
				{ !props.image64 && <input className="btn" type="file" name="file" onChange={(e) => doUpload(e)}/> }
				{ props.image64 && <button className="btn" onClick={(e) => doReset()}>New Image</button> }
			</div>

		</header>

	);
}

export default Header;
