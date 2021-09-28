import {Col, Row} from 'react-bootstrap'

const Sidebar: React.FC = (): JSX.Element => {
    return <Col id={"sidebar"} className={"bg-dark bg-gradient text-light pb-5"}>
        <Row className={"mx-0 justify-content-center"}>
            <Col className={"p-3 text-center bg-white"}>
            <img
					src="./logo192.png"
					width="100"
					height="100"
					alt="React Bootstrap logo"
				/>
            </Col>
        </Row>
    </Col>
}

export default Sidebar