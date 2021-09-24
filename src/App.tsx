import React from 'react';
/**layout and part of */
import Home from './pages/index'
import { Container, Row, Col } from 'react-bootstrap';
import ToastNotification from './components/ToastNotification';

const { ipcRenderer } = window.require("electron");

const App: React.FC = (): JSX.Element => {

	React.useEffect(() => {
		ipcRenderer.send("app_version")
		ipcRenderer.on("app_version", (event, args) => {
			ipcRenderer.removeAllListeners("app_version")
			document.title = `Version ${args.version}`
		})
	}, [])

	return (
		<Container fluid>
			<ToastNotification />
			<Row>
				<Col>
					<Home />
				</Col>
			</Row>
		</Container>
	)
}

export default App;
