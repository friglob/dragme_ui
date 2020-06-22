import React,{useState, useEffect} from "react";
//import _ from 'lodash';
import { baseUrl,rules } from './../components/Config';
import SVG from 'react-inlinesvg';

function Rule(props){

	const [rule, 	setRule] 	= useState('');

	// get rule from state/config
	useEffect(() => {
		if( props.rule && props.format ){
			//let ruleObj = rules[ _.findKey(rules, {key: props.rule } )];
			let rulePath = `${baseUrl}rules/${props.format}_${props.rule}.svg`;
			setRule( rulePath );
		}
	}, [props]);

	return (

		<div className="rule">

			{ rule && 
				<SVG 	className="rule__svg" 
						loader={<span className="rule__loading"></span>}
						src={rule} />
			}
			
		</div>

	);
}

export default Rule;
