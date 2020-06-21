import React, { useState, useEffect, useRef } from "react";
import {Swipe} from "react-swipe-component"
import { stateInitial,rules,formats } from './../components/Config';
import _ from 'lodash';
;

let swipeDeltaX = 0;
let swipeDeltaY = 0;

const Drag = (props) => {

	const refDrag = useRef(null);

	const [swipeState, 		setSwipeState] 		= useState(stateInitial);

	// onload 
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
		let currentRule = parseInt( _.findKey(rules, {key: state.rule} ) );
		let currentFormat = parseInt( _.findKey(formats, {key: state.format} ) );
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
				state.rule = (currentRule > 0) ? rules[currentRule-1].key : rules[currentRule].key;
				break;
			case "right":
				state.rule = (rules.length-1 > currentRule) ? rules[currentRule+1].key : rules[currentRule].key;
				break;
			case "top":
				state.format = (currentFormat > 0) ? formats[currentFormat-1].key : formats[currentFormat].key;
				break;
			case "bottom":
				state.format = (formats.length-1 > currentFormat) ? formats[currentFormat+1].key : formats[currentFormat].key;
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
					className={`drag drag--rule-${swipeState.rule} drag--format-${swipeState.format}`}
					style={{backgroundImage: `url(${props.image64})`}}
					onSwipe={ (e)=>{ onSwipe(e) } }
					onSwipeEnd={ (e) => { onSwipeEnd(e) } }
					detectMouse={true}
					detectTouch={true} 
					preventDefault={true}
					stopPropagation={true}
				>	
					{/*
					<span>horizontal: {swipeState.h}</span>
					<span>vertical: {swipeState.v}</span>
					*/}
				</Swipe>
			</div>

		</React.Fragment>

	);
}

export default Drag;
