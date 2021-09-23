import { ListGroup } from "react-bootstrap"

const Sidebar: React.FC = (): JSX.Element => {
    return (
        <ListGroup as="ul" className={"rounded-0"}>
            <ListGroup.Item as="li" active>
                Cras justo odio
            </ListGroup.Item>
            <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item as="li">
                Morbi leo risus
            </ListGroup.Item>
            <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
        </ListGroup>
    )
}

export default Sidebar