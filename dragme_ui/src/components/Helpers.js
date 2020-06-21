import { formats } from './../components/Config';
import "lodash";

export const formatByRatio = (ratio) => {
	
	for( let key in formats ){
		if( formats[key].ratio.from <= ratio && ratio <= formats[key].ratio.to ){
			return formats[key].key;
		}
	}
}