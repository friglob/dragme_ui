import { formats } from './../components/Config';
import "lodash";

export const formatByRatio = (ratio) => {
	
	for( let key in formats ){
		if( formats[key].ratio.from <= ratio && ratio <= formats[key].ratio.to ){
			return formats[key].key;
		}
	}
}

export const saveAs = (uri, filename) => {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);

    } else {

        window.open(uri);

	}
}