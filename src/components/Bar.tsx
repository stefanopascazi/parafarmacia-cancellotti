import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Bar: React.FC = (): JSX.Element => {

	return (
		<Navbar>
			<Navbar.Brand>
				<img
					src="/logo192.png"
					width="24"
					height="24"
					className="d-inline-block align-top"
					alt="React Bootstrap logo"
				/> Parafarmacia Cancellotti
			</Navbar.Brand>
		</Navbar>
	)
}

export default Bar;
