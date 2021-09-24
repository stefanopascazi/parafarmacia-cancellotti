import {Col, Row} from 'react-bootstrap'

const Sidebar: React.FC = (): JSX.Element => {
    return <Col id={"sidebar"} className={"bg-dark bg-gradient text-light pb-5"}>
        <Row>
            <Col xs={"12"} className={"pt-3"}>
            <img
					src="/logo192.png"
					width="50"
					height="50"
					alt="React Bootstrap logo"
				/><p>Parafarmacia<br />Cancellotti</p>
            </Col>
        </Row>
    </Col>
}

export default Sidebar