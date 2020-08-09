import React from "react";
import { baseUrl } from './../components/Config';
import SVG from 'react-inlinesvg';

function Footer(props){

	// reset file in LS
	const doReset = () => {
		props.setImage(null)
	}

	return (

		<footer className="footer clearfix">
			
			<div className="footer__cta">
				{ props.imageData && 
					<span  onClick={(e) => doReset()}>Clear photo</span>
				}
			</div> 

			<div className="footer__info">
				{ props.imageData && 
					<a href="mailto:boris.vidosevic@gmail.com?subject=compositions">I need more formats/rules.</a>
				}
				{ !props.imageData && 
					<span>
						Made with
						<SVG 	className="footer__svg" 
								loader={<span className="footer__loading"></span>}
								src={`${baseUrl}svg/heart.svg`} />
					</span>
				}
			</div>

		</footer>

	);
}

export default Footer;
