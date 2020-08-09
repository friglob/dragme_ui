import React, { useState,useEffect } from "react";
import _ from 'lodash';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { baseUrl, formats, rules, centers, orientations } from './../components/Config';
import { saveAs } from './../components/Helpers';
import SVG from 'react-inlinesvg';


function Sidebar(props){

	//const [rule, 			setRule] 				= useState('');

	// get format and rule from state/config
	useEffect(() => {
		console.log( props );
	}, [props]);


	// upload new file in LS
	const doUpload = (e) =>{

		//setLoading(true);

		const data = new FormData() 
		data.append('file', e.target.files[0]);
		axios.post(`${baseUrl}imgTo64.php`, data, {})
		.then(res => {
			props.setImage(res.data);
			props.setSidebar();
			//setLoading(false);
		})
	}

	// show panel
	const showSidebar = () => {
		
	}

	return (

		<aside className="sidebar clearfix">

			{ props.state && 
				<div>
					<p>Select pexel photo</p>
					<p>Select your photo</p>
					<div className={`upload-btn-wrapper`} >
						<button className="btn btn--accent btn--large">+</button>
						<input type="file" name="file" accept="image/*" onChange={(e) => doUpload(e) } />
					</div>
				</div> 
			}

		</aside>

	);
}

export default Sidebar;
