import React,{useState, useEffect} from "react";
import _ from 'lodash';
import { rules } from './../components/Config';

function Rule(props){

	const [rule, 	setRule] 	= useState('');

	// get rule from state/config
	useEffect(() => {
		if( props.rule ){
			setRule(rules[ _.findKey(rules, {key: props.rule } )]['title'] );
		}
	}, [props]);

	return (

		<div className="rule">

			Attach SVG <label>{rule}</label>

		</div>

	);
}

export default Rule;
