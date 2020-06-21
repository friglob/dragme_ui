import React, { useState,useEffect } from "react";

import Header from 		'./../components/Header';
import Footer from 		'./../components/Footer';
import Drag from 		'./../components/Drag';

function Main(){

	const [swipeState, 		setSwipeState] 		= useState({state: ""});
	const [headerState, 	setHeaderState] 	= useState(true);
	const [footerState, 	setFooterState] 	= useState(true);
	const [image64, 		setImage64] 		= useState('');

	useEffect(() => {
		// swipe events > layout states
		let img64 = localStorage.getItem('img64');
		if( img64 ){
			setImage64( img64 );
		}
	}, []);

	useEffect(() => {
		// swipe events > layout states
		switch ( swipeState.direction ) {
			// initial state from Drag component
			case 'init':
				setHeaderState( (swipeState.state.vertical === 's') ? false : true );
				setFooterState( (swipeState.state.vertical === 's') ? false : true );
				break;
			case 'top':
				setHeaderState( (swipeState.state.vertical === 's') ? false : true );
				setFooterState( (swipeState.state.vertical === 's') ? false : true );
				break;
			case 'bottom':
				setHeaderState( (swipeState.state.vertical === 'xl') ? false : true );
				setFooterState( (swipeState.state.vertical === 'xl') ? false : true );
				break;
			default: 
				//
		}
	}, [swipeState]);

	const onSwipe = (state) => {
		setSwipeState(state);
	}

	const setImage = (img64) => {
		localStorage.setItem('img64', img64 );
		setImage64( img64 );
	}

	return (

		<div className="main">
			
			{ headerState && <Header state={swipeState.state} setImage={setImage} image64={image64} /> }

			{ image64 && <Drag onSwipe={onSwipe} image64={image64} /> }

			{ !image64 && 
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
