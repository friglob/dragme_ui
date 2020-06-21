import React, { useState, useEffect, useRef } from "react";
import Drag from './../components/Drag';

function Main(){

	const [swipeState, 		setSwipeState] 		= useState();
	const [headerState, 	setHeaderState] 	= useState(true);
	const [footerState, 	setFooterState] 	= useState(true);

	const onSwipe = (state) => {

		setSwipeState(state);
		
		// swipe events > layout states
		switch ( state.direction ) {
			// initial state from Drag component
			case 'init':
				setHeaderState( (state.state.v == 's') ? false : true );
				setFooterState( (state.state.v == 's') ? false : true );
				break;
			case 'top':
				setHeaderState( (state.state.v == 's') ? false : true );
				setFooterState( (state.state.v == 's') ? false : true );
				break;
			case 'bottom':
				setHeaderState( (state.state.v == 'xl') ? false : true );
				setFooterState( (state.state.v == 'xl') ? false : true );
				break;
			default: 
				//
		}
	}

	return (

		<div className="main">
			
			{ headerState && <header>header</header> }

			<Drag onSwipe={onSwipe} />

			{ footerState && <footer>footer</footer> }

		</div>

	);
}

export default Main;
