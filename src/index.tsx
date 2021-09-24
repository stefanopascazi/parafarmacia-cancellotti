import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const Render: React.FC = (): JSX.Element => {

	const [show, setShow] = React.useState<boolean>(false)
	React.useEffect(() => {
		let body:HTMLElement = document.body;
		body.classList.add("bg-secondary")

		setShow(true);
	}, [])

	return show && <App />
}

ReactDOM.render(
	<HashRouter>
		<Render />
	</HashRouter>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
