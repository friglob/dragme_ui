import React, { useState, useEffect, useRef } from "react";
import {Swipe} from "react-swipe-component"
import Rule from './../components/Rule';
import { stateInitial,rules,formats } from './../components/Config';
import _ from 'lodash';

let swipeDeltaX = 0;
let swipeDeltaY = 0;

const Drag = (props) => {

	const refDrag = useRef(null);

	const [swipeState, 		setSwipeState] 		= useState(stateInitial);

	// update state from props 
	useEffect(() => {
		if( props.state ){
			setSwipeState(props.state);
		}
	}, [props.state]);
	
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
			// rule prev
			case "right":
				state.rule = (currentRule > 0) ? rules[currentRule-1].key : rules[rules.length-1].key;
				break;
			// rule next
			case "left":
				state.rule = (rules.length-1 > currentRule) ? rules[currentRule+1].key : rules[0].key;
				break;
			// format prev
			case "top":
				state.format = (currentFormat > 0) ? formats[currentFormat-1].key : formats[formats.length-1].key;
				break;
			// format next
			case "bottom":
				state.format = (formats.length-1 > currentFormat) ? formats[currentFormat+1].key : formats[0].key;
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
			
			<figure className="drag-container" data-orientation={props.imageData.orientation} ref={refDrag}>
				<Swipe
					nodeName="div"
					className={`drag drag--rule-${swipeState.rule} drag--format-${swipeState.format} drag--center-${swipeState.center}`}
					style={{backgroundImage: `url(${props.imageData.base64})`}}
					onSwipe={ (e)=>{ onSwipe(e) } }
					onSwipeEnd={ (e) => { onSwipeEnd(e) } }
					detectMouse={true}
					detectTouch={true} 
					preventDefault={true}
					stopPropagation={true}>	
					
					<Rule rule={swipeState.rule} orientation={props.imageData.orientation} />

				</Swipe>
				
			</figure>

		</React.Fragment>

	);
}

export default Drag;
