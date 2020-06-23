import React,{useState, useEffect} from "react";
import _ from 'lodash';
import { baseUrl, rules } from './../components/Config';

function ListRules(props){

	useEffect(() => {
		console.log( props );
	}, [props]);

	return (

		<div className="list-rules">

			rules
			
		</div>

	);
}

export default ListRules;
