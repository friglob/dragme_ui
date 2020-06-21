import React, { useState,useEffect } from "react";

import Header from 		'./../components/Header';
import Footer from 		'./../components/Footer';
import Drag from 		'./../components/Drag';

let image = 'https://images.pexels.com/photos/3841338/pexels-photo-3841338.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

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
			
			{ headerState && <Header state={swipeState.state} setImage={setImage} /> }

			{ image64 && <Drag onSwipe={onSwipe} image64={image64} /> }
			{ !image64 && <div className="msg">Upload image</div> }
			

			{ footerState && <Footer /> }

		</div>

	);
}

export default Main;
