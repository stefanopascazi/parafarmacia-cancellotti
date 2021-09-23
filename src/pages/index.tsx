import React, { ReactNode } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap'
import { Table } from '../components/Table'


const { ipcRenderer } = window.require("electron");

interface IHomeDataInterface {
    searchText?: string,
    children?: ReactNode
}

const Home: React.FC<IHomeDataInterface> = ({ searchText, children }: IHomeDataInterface): JSX.Element => {

    const [rows, setRows] = React.useState<Array<Array<string>>>([[]])

    const importedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        console.log(e.target.files[0]);

        const array = ipcRenderer.sendSync("loadFile", (file as any).path)

        setRows(array)
        console.log(array)

    }

    const save = () => {        
        const csv = rows.slice(1).map((row) => {
            const lines = `${row[17]},${row[17]},${row[18]},${row[23]},${row[21]},${row[22]},ITA,${row[9]},,${row[9]},`
            return lines
        })
        
        const result = ipcRenderer.sendSync("saveFile", csv.join("\n"))
        return true;
    }

    return <>
        <Row className={"py-3"}>
            <Col>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Carica un file</Form.Label>
                        <Form.Control type="file" placeholder="carica il file ordini" onChangeCapture={importedFile} />
                    </Form.Group>
                </Form>
            </Col>
        </Row>
        {rows.length > 0 && <Row className={"py-3"}>
            <Col>
                <Button variant={"primary"} type={"button"} onClick={save}>Scarica formato per SDA Crono</Button>
            </Col>
        </Row>}
        <Table rows={rows} />
    </>
}

export default Home