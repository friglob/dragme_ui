import React, { useState,useEffect } from "react";
import _ from 'lodash';
import axios from 'axios';
import { formats, rules } from './../components/Config';


function Header(props){

	const [rule, 	setRule] 		= useState('');
	const [format, 	setFormat] 		= useState('');
	const [loading, setLoading] 	= useState(false);

	// get format and rule from state/config
	useEffect(() => {
		if( props.state.format && props.state.rule ){
			setRule(rules[ _.findKey(rules, {key: props.state.rule } )]['title'] );
			setFormat(formats[ _.findKey(formats, {key: props.state.format } )]['title'] );
		}
	}, [props]);

	// upload new file in LS
	const doUpload = (e) =>{

		setLoading(true);

		const data = new FormData() 
		data.append('file', e.target.files[0]);
		axios.post("http://localhost/dragme_ui/imgTo64.php", data, {})
		.then(res => {
			props.setImage(res.data);
			setLoading(false);
		})
	}

	// reset file in LS
	const doReset = () => {
		props.setImage(null)
	}

	return (

		<header className="header clearfix">
			
			<div className="left">

				{ props.imageData &&
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
						<label>
							{props.imageData.orientation}:
							{props.imageData.ratio}
						</label>
					</strong>
				}
			</div>

			<div className="right">

				{ loading && 
					<span>loading...</span> }

				{ !props.imageData && 
					<div className="upload-btn-wrapper">
						<button className="btn">Upload a file</button>
						<input type="file" name="file"  onChange={(e) => doUpload(e)} />
					</div>
				}

				{ props.imageData && 
					<button className="btn" onClick={(e) => doReset()}>Clear Image</button> }
			</div>

		</header>

	);
}

export default Header;
