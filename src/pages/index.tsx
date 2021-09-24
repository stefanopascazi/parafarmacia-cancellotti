import React, { ReactNode } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap'
import { Table } from '../components/Table'

interface Provincia {
    text:string,
    value:string,
    regione: string;
}

const { ipcRenderer } = window.require("electron");
const province: Provincia[] = require('../components/data.json')
interface IHomeDataInterface {
    children?: ReactNode
}

const Home: React.FC<IHomeDataInterface> = ({ children }: IHomeDataInterface): JSX.Element => {

    const [rows, setRows] = React.useState<string[][] | false>(false)

    const importedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        console.log(e.target.files[0]);

        const array: string[][] = ipcRenderer.sendSync("loadFile", (file as any).path)

        setRows(array)
        e.target.value = ""

    }

    const save = (): void => {

        const csv: string[] = rows && rows.slice(1).map( (row: string[]) => {
            
            const value: Provincia | false = province.find( (element: Provincia) => element.text === row[22] ? element : false )

            const lines: string = `${row[17]},${row[17]},${row[18]},${row[23]},${row[21]},${value ? value.value : row[22]},ITA,${row[9]},,${row[9]},`
            return lines
        })

        const content: string = csv.join("\n");        
        ipcRenderer.sendSync("saveFile", content)
    }

    const clean = ():void => {
        setRows(false)
    }

    return <>
        <Row className={"m-3 pt-3 bg-white border-bottom border-light border-4 rounded-3 align-items-center"}>
            <Col xs={"4"} className="me-auto">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="file" placeholder="carica il file ordini" onChangeCapture={importedFile} />
                    </Form.Group>
                </Form>
            </Col>
            {rows && <Col xs={"6"}>
                <Button variant={"primary"} type={"button"} onClick={save}>Scarica formato per SDA Cronos</Button> <Button variant={"warning"} type={"button"} onClick={clean}>Rimuovi</Button>
            </Col>}
        </Row>
        
        {rows && <Table rows={rows} />}
        {children && children}
    </>
}

export default Home