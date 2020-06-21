import React, { useState,useEffect } from "react";

import Header from 		'./../components/Header';
import Footer from 		'./../components/Footer';
import Drag from 		'./../components/Drag';

import { localStorageKey } from './../components/Config';
import { unset } from "lodash";

function Main(){

	const [swipeState, 		setSwipeState] 		= useState({state: ""});
	const [headerState, 	setHeaderState] 	= useState(true);
	const [footerState, 	setFooterState] 	= useState(true);
	const [imageData, 		setImageData] 		= useState({});

	// check local storage for image
	useEffect(() => {
		let imgData = localStorage.getItem(localStorageKey);
		setImageData( JSON.parse( imgData ) );
	}, []);

	// on drag event
	useEffect(() => {
		switch ( swipeState.direction ) {
			// initial state from Drag component
			case 'init':
				setHeaderState( true );
				setFooterState( false );
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
	const setImage = (imgParams) => {
		if( imgParams !== null ){
			let imgW = imgParams[0];
			let imgH = imgParams[1];
			// get orientation
			if( imgW === imgH ){
				imgParams.orientation = 'square';
				imgParams.ratio = 1;
			}
			else if( imgW > imgH ){
				imgParams.orientation = 'landscape';
				imgParams.ratio = ( imgW/imgH ).toFixed(2);
			}else{
				imgParams.orientation = 'portrait';
				imgParams.ratio = ( imgH/imgW ).toFixed(2);
			}
			// get rid of unnecesary data
			delete( imgParams[0] );
			delete( imgParams[1] );
			delete( imgParams[2] );
			delete( imgParams[3] );
			localStorage.setItem(localStorageKey, JSON.stringify( imgParams ) );
		}else{
			localStorage.removeItem(localStorageKey);
		}
		console.log(imgParams)
		setImageData( imgParams );
	}

	return (

		<div className="main">
			
			{ headerState && <Header state={swipeState.state} setImage={setImage} imageData={imageData} /> }

			{ imageData && <Drag onSwipe={onSwipe} imageData={imageData} /> }

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
