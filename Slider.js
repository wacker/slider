import React     from 'react';
import PropTypes from 'prop-types';

import './slider.css';

export default class Slider extends React.Component {

	constructor (props) {
		super(props);
		this.state = { value: props.value || 0 };
		this.range = props.maxValue - props.minValue;

		this.startDragging = this.startDragging.bind(this);
		this.stopDragging  = this.stopDragging .bind(this);
		this.drag          = this.drag         .bind(this);
	}

	componentWillUnmount () {
		this.stopDragging();
	}

	render () {
		return (
			<div
				ref={(el) => { this.barEl = el; }}
				className={this.props.vertical ? 'slider vertical' : 'slider horizontal'}
				style={this.props.style}
			>
				<div
					className="handle"
					style={{
						[this.props.vertical ? 'top' : 'left']: Math.max(Math.min((
							(this.state.value - this.props.minValue) / this.range
						), 1), 0) * 100 + '%'
					}}
					onMouseDown={(e) => {
						const mouseup = (e) => {
							document.removeEventListener('mouseup', mouseup);
							document.removeEventListener('mousemove', mousemove);
							this.stopDragging();
						};
						const mousemove = this.drag;
						document.addEventListener('mouseup', mouseup);
						document.addEventListener('mousemove', mousemove);
						this.startDragging();
					}}
					onTouchStart={(e) => {
						e.preventDefault();
						const touchend = (e) => {
							document.removeEventListener('touchend', touchend);
							document.removeEventListener('touchmove', touchmove);
							this.stopDragging();
						};
						const touchmove = (e) => { this.drag(e.touches[0]) };
						document.addEventListener('touchend', touchend);
						document.addEventListener('touchmove', touchmove);
						this.startDragging();
					}}
				>
				</div>
			</div>
		);
	}

	startDragging () {
		this.rect = this.barEl.getBoundingClientRect();
		this.previousCursor = document.documentElement.style.cursor;
		document.documentElement.style.cursor = 'pointer';
	}

	stopDragging () {
		document.documentElement.style.cursor = this.previousCursor;
	}

	drag (e) {
		let offset = Math.max(Math.min((
			this.props.vertical
			? (e.clientY - this.rect.top)  / this.barEl.clientHeight
			: (e.clientX - this.rect.left) / this.barEl.clientWidth
		), 1), 0) * this.range;
		if (this.props.step !== null) {
			offset = Math.round(offset / this.props.step) * this.props.step;
		}
		let value = offset + this.props.minValue;
		if (value !== this.state.value) {
			this.setState({ value });
		}
	}

}

Slider.propTypes = {
	value:    PropTypes.number,
	minValue: PropTypes.number,
	maxValue: PropTypes.number,
	step:     PropTypes.number,
	style:    PropTypes.object
};

Slider.defaultProps = {
	value:    0,
	minValue: 0,
	maxValue: 100,
	step:     null
};
