import React from 'react'
import { connect } from "react-redux"

@connect((store) => {
	return {
		config: store.config.config,
	}
})

export default class SVG extends React.Component {
	propTypes: {
		className: React.PropTypes.string,
		glyph: React.PropTypes.string.isRequired,
		width: React.PropTypes.number,
		height: React.PropTypes.number
	}
	render() {
		let { glyph, width, height, className, config } = this.props
		
		glyph = config.baseUrl+'admin/images/icons.svg#'+glyph
		className = 's-icon '+className
		width = width+'px'
		height = height+'px'

		return (
			<span className={className} style={{
				height: height, 
				width: width
			}}>
				<svg width={width} height={height}>
					<use xlinkHref={glyph} />
				</svg>
			</span>
		)
	}
}

SVG.defaultProps = {
	width: 32,
	height: 32,
	className: ''
}