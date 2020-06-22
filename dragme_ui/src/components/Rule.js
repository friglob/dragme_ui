import React,{useState, useEffect} from "react";
import _ from 'lodash';
import { rules } from './../components/Config';

//import './../rules/thirds.svg';

function Rule(props){

	const [rule, 	setRule] 	= useState('');

	// get rule from state/config
	useEffect(() => {
		if( props.rule ){
			let ruleObj = rules[ _.findKey(rules, {key: props.rule } )];
			setRule(
				`dragme_ui/rules/${ruleObj.key}_${props.format}.svg`
			);
		}
	}, [props]);

	return (

		<div className="rule">

			{ rule && 
				<img alt="rule" src={rule} /> 
			}
			
		</div>

	);
}

export default Rule;
