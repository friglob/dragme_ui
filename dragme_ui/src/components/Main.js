import React, { useState,useEffect } from "react";
import Drag from './../components/Drag';

function Main(){

	const [swipeState, 		setSwipeState] 		= useState({});
	const [headerState, 	setHeaderState] 	= useState(true);
	const [footerState, 	setFooterState] 	= useState(true);

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

	return (

		<div className="main">
			
			{ headerState && <header>header</header> }

			<Drag onSwipe={onSwipe} />

			{ footerState && <footer>footer</footer> }

		</div>

	);
}

export default Main;
