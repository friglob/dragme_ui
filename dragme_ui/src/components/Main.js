import React, { useState, useEffect, useRef } from "react";
import Drag from './../components/Drag';

let showHeader = true;
let showFooter = true;

function Main(){

	const [swipeState, 		setSwipeState] 		= useState();

	const onSwipe = (state) => {
		setSwipeState(state);
		console.log('MAIN set state:', state);

		switch ( state.direction ) {
			case 'init':
				showHeader = (state.state.v == 's') ? false : true;
				break;
			case 'top':
				showHeader = (state.state.v == 's') ? false : true;
				showFooter = true;
				break;
			case 'bottom':
				showHeader = true;
				showFooter = false;
				break;
			default: 
				//
		}
	}

	return (

		<div className="main">
			
			{ showHeader && <header>header</header> }

			<Drag onSwipe={onSwipe} />

			{ showFooter && <footer>footer</footer> }

		</div>

	);
}

export default Main;
