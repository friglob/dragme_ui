import React, { useState,useEffect } from "react";

import Sidebar from 	'./../components/Sidebar';
import Header from 		'./../components/Header';
import Footer from 		'./../components/Footer';
import Drag from 		'./../components/Drag';

import { baseUrl, rules, centers, stateInitial, localStorageKey } from './../components/Config';
import { formatByRatio } from './../components/Helpers';
import _ from "lodash";
import SVG from 'react-inlinesvg';

function Main(){

	const [swipeState, 		setSwipeState] 		= useState({state:stateInitial});
	const [headerState, 	setHeaderState] 	= useState(true);
	const [sidebarState, 	setSidebarState] 	= useState(false);
	const [footerState, 	setFooterState] 	= useState(true);
	const [imageData, 		setImageData] 		= useState(null);

	// check local storage for image
	useEffect(() => {
		let lsData = localStorage.getItem(localStorageKey);
		if( lsData ){
			let imgData = JSON.parse( lsData );
			// get img format from ratio
			let imgFormat = formatByRatio(imgData.ratio);
			// set ratio
			setSwipeState({state: {	format: 		imgFormat,
									orientation: 	imgData['orientation'],
									rule: 			stateInitial['rule'],
									center: 		stateInitial['center']
									}
						});
			setImageData( imgData );
		}

	}, []);

	// on drag event
	useEffect(() => {
		switch ( swipeState.direction ) {
			// initial state from Drag component
			case 'init':
				setHeaderState( true );
				setFooterState( true );
				break;
			default: 
				setHeaderState( true );
				setFooterState( true );
		}
	}, [swipeState]);

	// update swipe state
	const onSwipe = (state) => {
		setSwipeState(state);
	}

	// set new image or reset existing one
	const setImage = (imgData) => {
		if( imgData !== null ){
			// update format
			let imgFormat = formatByRatio( imgData.ratio );
			setSwipeState({state: {	format: imgFormat, 
									rule: 	swipeState.state.rule,
									center: swipeState.state.center,
									orientation: 	swipeState.state.orientation }
						});
			// save LS
			localStorage.setItem(localStorageKey, JSON.stringify( imgData ) );
			// set title
			window.document.title = imgData.filename;
		}else{
			localStorage.removeItem(localStorageKey);
			window.document.title = 'Compositions & Formats';
		}
		setImageData( imgData );
	}

	// centering the image
	const setCenter = () => {
		let state = {...swipeState.state};
		let currentCenter = parseInt( _.findKey(centers, {key: state.center }) );
		let nextCenter = ( centers.length -1 > currentCenter ) ? centers[currentCenter+1] : centers[0];
		state.center = nextCenter.key;
		setSwipeState({	state: state});
	}

	// toggle sidebar state
	const setSidebar = () => {
		setSidebarState( !sidebarState );
	}

	return (

		<div className="main">
			
			<Sidebar 		state={sidebarState}
							setSidebar={setSidebar}
							setImage={setImage} /> 

			{ headerState && 
				<Header 	state={swipeState.state} 
							imageData={imageData}
							setSidebar={setSidebar}
							setImage={setImage}
							setCenter={setCenter} /> 
			}

			{ imageData && 
				<Drag 		state={swipeState.state}
							imageData={imageData}
							onSwipe={onSwipe} /> 
			}

			{ imageData === null && 
				<div className="hello">
					<SVG 	className="hello__svg" 
							loader={<span className="hello__loading"></span>}
							src={`${baseUrl}svg/homepage.svg`} />
					<h1 className="hello__title">
						Compositions<br />
						<label>& Formats</label>
					</h1>
					<h2 className="hello__subtitle">Use the top <label>+</label> button to load or take an image.</h2>
					<p className="hello__description">
						Swipe <label>up / down</label> to change the crop format of the loaded image.
						&nbsp; Swipe <label>left / right</label> to change the composition rule applied to the image.
						&nbsp; Tap/click on the <label>grid dots</label> to point to the important part of image.
						<br /><br />
						<small className="gray">* Images are not stored on any server.</small>
					</p>
				</div> 
			}
			
			{ footerState && <Footer setImage={setImage} imageData={imageData} /> }

		</div>

	);
}

export default Main;
