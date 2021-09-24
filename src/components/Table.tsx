import {Table as TableB, Row, Col} from 'react-bootstrap'
import React from 'react'

interface Rows {
    rows: string[][]
}
const Thead = ({rows}: Rows): JSX.Element => {
    return <thead>
        <tr>
            {rows[0].map((row: string,i: number) => <th key={i}>{row}</th> )}
        </tr>
    </thead>
}

const Tbody = ({rows}: Rows): JSX.Element => {
    return <tbody>
        { rows.slice(1).map((row: Array<string>,i: number) => {
            return row.length > 1 && <tr key={i}>
                {row.map((line: string, a: number) => { return <td key={a}>{line}</td>})}
            </tr>
        })}
    </tbody>
}

export const Table: Function = ({rows}: Rows): JSX.Element => {

    return <Row className={"m-3 bg-white border-bottom border-light border-4 rounded-3 pt-3"}>
            <Col xs={"6"}>
                <TableB bordered striped hover className={"bg-white"}>
                    <Thead rows={rows}/>
                    <Tbody rows={rows} />
                </TableB>
            </Col>
        </Row>

}