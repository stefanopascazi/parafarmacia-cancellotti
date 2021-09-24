import React from 'react';
/**layout and part of */
import Home from './pages/index'
import { Container, Row, Col } from 'react-bootstrap';
import ToastNotification from './components/ToastNotification';
import Bar from './components/Bar';
import Sidebar from './components/Sidebar';

const { ipcRenderer }: any = window.require("electron");

const App: React.FC = (): JSX.Element => {

	React.useEffect(() => {
		ipcRenderer.send("app_version")
		ipcRenderer.on("app_version", (event, args) => {
			ipcRenderer.removeAllListeners("app_version")
			document.title = `Easy Amazon Order Exporter v${args.version}`
		})
	}, [])

	return (
		<>
			<ToastNotification />
			<Sidebar />
			<Container fluid>
				<Row>
					<Col id={"content"}>
						<Row className={"m-3 bg-white border-bottom border-light border-4 rounded-3"}>
							<Bar />
						</Row>
						<Home />
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default App;
