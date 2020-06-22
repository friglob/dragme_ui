import React,{useState, useEffect} from "react";
import _ from 'lodash';
import { rules } from './../components/Config';

//import './../rules/thirds.svg';

function Rule(props){

	const [rule, 	setRule] 	= useState('');

	// get rule from state/config
	useEffect(() => {
		if( props.rule ){
			setRule(rules[ _.findKey(rules, {key: props.rule } )] );
		}
	}, [props]);

	return (

		<div className="rule">

			{ rule.svg && 
				<img className="" data-format={props.format} alt={rule.title} src={`dragme_ui/rules/${rule.svg}`} /> 
			}
			
		</div>

	);
}

export default Rule;
