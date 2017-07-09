import React    from 'react';
import ReactDOM from 'react-dom';

import Slider   from './Slider';

ReactDOM.render(
	<div>
		<Slider vertical minValue={100} maxValue={0} value={10}/>
		<Slider step={20}/>
	</div>,
	document.getElementById('root')
);
