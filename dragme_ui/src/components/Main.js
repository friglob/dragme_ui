import React, { useState,useEffect } from "react";

import Header from 		'./../components/Header';
import Footer from 		'./../components/Footer';
import Drag from 		'./../components/Drag';

import { rules, centers, stateInitial, localStorageKey } from './../components/Config';
import { formatByRatio } from './../components/Helpers';
import _ from "lodash";

function Main(){

	const [swipeState, 		setSwipeState] 		= useState({state:stateInitial});
	const [headerState, 	setHeaderState] 	= useState(true);
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
		}else{
			localStorage.removeItem(localStorageKey);
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

	return (

		<div className="main">
			
			{ headerState && 
				<Header 	state={swipeState.state} 
							imageData={imageData}
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
					<h1>Applied <label>Composition</label></h1>
					<p>
						Use the top <label>+</label> button to load an image from the gallery or by taking a photo.
						Swiping <label>up/down</label> changes the crop of the picture.
						Swiping <label>left/right</label> changes the grid rule applied to the image.
						Clicking on the <label>centering icon</label> changes the center of the image focus.
						<br /><br />
						As usual, do not forget to <label>have fun</label> while using this tool.
						<br /><br />
						<small className="gray">* Images are not uploaded to a server, they are stored on your device.</small>
					</p>
					<img className="hello__img" src={`dragme_ui/rules/homepage.svg`} alt="" />
				</div> 
			}
			
			{ footerState && <Footer /> }

		</div>

	);
}

export default Main;
