import React, { useState, useEffect, useRef } from "react";
import {Swipe} from "react-swipe-component"
import _ from 'lodash';

const statesHorizontal = 	["s", "m", "l", "xl"];
const statesVertical = 		["s", "m", "l", "xl"];
const stateInitial = 		{"h": "xl", "v": "s"};

let swipeDeltaX = 0;
let swipeDeltaY = 0;
let requiredSwipeDelta = 73;


const Drag = (props) => {

	const refDrag = useRef(null);

	const [swipeState, 		setSwipeState] 		= useState(stateInitial);

	// reset items
	useEffect(() => {
		props.onSwipe({state: swipeState, direction: 'init'});
	}, []);

	// swiper methods
	const onSwipe = (e) => {
		swipeDeltaX = e.x;
		swipeDeltaY = e.y;
		transformOnDrag(swipeDeltaX,swipeDeltaY);
	}

	const onSwipeEnd = (e) => {
		// get current keys
		let state = {...swipeState};
		let currentHkey = _.indexOf(statesHorizontal, state.h );
		let currentVkey = _.indexOf(statesVertical, state.v );
		// get swipe direction
		let direction = "";
		if( Math.abs(swipeDeltaX) > Math.abs(swipeDeltaY) ){
			direction = ( swipeDeltaX > 0 ) ? "right" : "left";
		}else{
			direction = ( swipeDeltaY > 0 ) ? "bottom" : "top";
		}
		// update keys
		switch( direction ){
			case "left":
				state.h = (currentHkey > 0) ? statesHorizontal[currentHkey-1] : statesHorizontal[currentHkey];
				break;
			case "right":
				state.h = (statesHorizontal.length-1 > currentHkey) ? statesHorizontal[currentHkey+1] : statesHorizontal[currentHkey];
				break;
			case "top":
				state.v = (currentVkey > 0) ? statesVertical[currentVkey-1] : statesVertical[currentVkey];
				break;
			case "bottom":
				state.v = (statesVertical.length-1 > currentVkey) ? statesVertical[currentVkey+1] : statesVertical[currentVkey];
				break;
			default:
				//
		}
		// set swipe direction
		setSwipeState(state)
		// set external props
		props.onSwipe({state:state, direction: direction});
		// reset transformation
		transformOnDrag(0,0);
	}

	// on swipe : transformations
	const transformOnDrag = (x,y) => {
		x = x*.2;
		y = y*.1;
		refDrag.current.style.transform = ( Math.abs(x) > Math.abs(y) ) 
			? `translate(${x}px,0px)` 
			: `translate(0px,${y}px)` 
		;
	}

	return (

		<React.Fragment>
			
			<div className="drag-container" ref={refDrag}>
				<Swipe
					nodeName="div"
					className={`drag drag--h-${swipeState.h} drag--v-${swipeState.v}`}
					onSwipe={ (e)=>{ onSwipe(e) } }
					onSwipeEnd={ (e) => { onSwipeEnd(e) } }
					detectMouse={true}
					detectTouch={true} 
				>
					<span>horizontal: {swipeState.h}</span>
					<span>vertical: {swipeState.v}</span>
				</Swipe>
			</div>

		</React.Fragment>

	);
}

export default Drag;
