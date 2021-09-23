import React from 'react';
/**layout and part of */
import Home from './pages/index'
import { Container, Row, Col } from 'react-bootstrap';

const App: React.FC = (): JSX.Element => {
	
	return (
		<Container fluid>
			<Row>
				<Col>
					<Home />
				</Col>
			</Row>
		</Container>
	)
}

export default App;
