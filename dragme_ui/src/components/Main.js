import React, { useState,useEffect } from "react";

import Header from 		'./../components/Header';
import Footer from 		'./../components/Footer';
import Drag from 		'./../components/Drag';

import { formats, centers, stateInitial, localStorageKey } from './../components/Config';
import { formatByRatio } from './../components/Helpers';
import _, { unset } from "lodash";

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
			console.log( imgFormat );
			// set ratio
			setSwipeState({state: {	format: imgFormat,
									rule: 	stateInitial['rule'],
									center: stateInitial['center']}
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
									center: swipeState.state.center }
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
					<h1>Check your image.</h1>
					<p>Ipsum cillum ipsum qui veniam sit labore qui. Esse minim do nulla consectetur.</p>
				</div> 
			}
			

			{ footerState && <Footer /> }

		</div>

	);
}

export default Main;
