import React, { useState,useEffect } from "react";
import _ from 'lodash';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { formats, rules, centers, orientations } from './../components/Config';
import { saveAs } from './../components/Helpers';



function Orientation(props){

	const [items, 			setItems] 				= useState([]);

	useEffect(() => {
		const itemList = (
			<React.Fragment>
				{centers.map( (center,idx) => {
					let itemClass = ( center.key === props.current ) ? 'active' : '';
					return (
						<span key={idx} className={`orientation__${center.key} ${itemClass}`}>{center.title}</span>
					)
				})}
			</React.Fragment>
		);
		setItems(itemList);
	}, [props]);

	return (
		<React.Fragment>
			{items}
		</React.Fragment>
	)
}



function Header(props){

	const [rule, 			setRule] 				= useState('');
	const [format, 			setFormat] 				= useState('');
	const [orientation, 	setOrientation] 		= useState('');
	const [centering, 		setCenter] 				= useState('');
	const [loading, 		setLoading] 			= useState(false);

	// get format and rule from state/config
	useEffect(() => {
		if( props.state.format && props.state.rule ){
			setRule(rules[ _.findKey(rules, {key: props.state.rule } )]['title'] );
			setFormat(formats[ _.findKey(formats, {key: props.state.format } )]['title'] );
		}
		if( props.state.center ){
			setCenter(centers[ _.findKey(centers, {key: props.state.center } )] );
		}
		if( props.imageData && props.imageData.orientation ){
			setOrientation(orientations[ _.findKey(orientations, {key: props.imageData.orientation } )]['title'] );
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

	// save file
	const doSave = (params) => {
		html2canvas(
			document.querySelector(".drag"),{
				ignoreElements: function(el) {  
					return (params.rules) 
						? false
						: el.classList.contains('rule') 
				},
				scale: 1
			}
		).then(canvas => {
			let now = new Date();
			var date = now.getDate();
			var month = now.getMonth();
			var year = now.getFullYear();
			let filename = `composition_${props.state.rule}_${props.state.format}_${date}${month}${year}.png`;
			saveAs(canvas.toDataURL(), filename);
		});
	}

	// recenter
	const doCentering = () => {
		props.setCenter();
	}

	return (

		<header className="header clearfix">
			
			<div className="left">

				{ props.imageData &&
					<React.Fragment>
						<label>
							{ format }
						</label>
						&nbsp;
						<label>
							{rule}
						</label>
						{<label>
							<button className="btn orientations" onClick={(e) => doCentering()}>
								<Orientation current={centering.key} />
							</button>
						</label>}
					</React.Fragment>
				}
			</div>

			<div className="right">

				<strong>
				{ loading && 
					<span>loading...</span> }

				{ !props.imageData && 
					<div className="upload-btn-wrapper">
						<button className="btn btn--accent">+</button>
						<input type="file" name="file"  onChange={(e) => doUpload(e)} />
					</div>
				}

				{ props.imageData && 
					<React.Fragment>
						{/* 
						<button className="btn" onClick={(e) => doSave({rules: true})}>get rules</button>
						&nbsp;
						*/}
						<button className="btn btn--ui" onClick={(e) => doSave({rules: false})}>Download</button>
						&nbsp;
						<button className="btn btn--accent" onClick={(e) => doReset()}>New</button> 
					</React.Fragment>
				}
				</strong>
			</div>

		</header>

	);
}

export default Header;
