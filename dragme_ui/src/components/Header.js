import React, { useState,useEffect } from "react";
import axios from 'axios';
import { formats, rules } from './../components/Config';
import _ from 'lodash';



function Header(props){

	const [rule, 	setRule] 	= useState('');
	const [format, 	setFormat] 	= useState('');

	// get format and rule from state/config
	useEffect(() => {
		if( props.state.format && props.state.rule ){
			setRule(rules[ _.findKey(rules, {key: props.state.rule } )]['title'] );
			setFormat(formats[ _.findKey(formats, {key: props.state.format } )]['title'] );
		}
	}, [props]);

	// upload new file in LS
	const doUpload = (e) =>{
		const data = new FormData() 
		data.append('file', e.target.files[0]);
		axios.post("http://localhost/dragme_ui/imgTo64.php", data, {})
		.then(res => {
			props.setImage(res.data)
		})
	}

	// reset file in LS
	const doReset = () => {
		props.setImage('')
	}

	return (

		<header className="header clearfix">
			
			<div className="left">
				{ props.image64 &&
					<strong>
						<label>
							<small>&uarr; &nbsp;</small>
							{ format }
							<small>&darr;</small>
						</label>
						<label>
							<small>&larr; &nbsp;</small>
							{rule}
							<small>&rarr;</small>
						</label>
					</strong>
				}
				{ !props.image64 &&
					<strong>Upload image <small>&rarr;</small> </strong>
				}
			</div>

			<div className="right">
				{ !props.image64 && 
					<div className="upload-btn-wrapper">
						<button className="btn">Upload a file</button>
						<input type="file" name="file"  onChange={(e) => doUpload(e)} />
					</div>
				}
				{ props.image64 && <button className="btn" onClick={(e) => doReset()}>New Image</button> }
			</div>

		</header>

	);
}

export default Header;
