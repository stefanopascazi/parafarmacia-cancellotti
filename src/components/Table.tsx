import {Table as TableB, Row, Col} from 'react-bootstrap'
import React from 'react'

const Thead = ({rows}) => {
    return <thead>
        <tr>
            {rows[0].map((row: string,i: number) => <th key={i}>{row}</th> )}
        </tr>
    </thead>
}

const Tbody = ({rows}) => {
    return <tbody>
        { rows.slice(1).map((row: Array<string>,i: number) => {
            return <tr key={i}>
                {row.map((line: string, a: number) => { return <td key={a}>{line}</td>})}
            </tr>
        })}
    </tbody>
}

export const Table: Function = ({rows}) => {

    return <Row>
            <Col>
                <TableB bordered striped hover>
                    <Thead rows={rows}/>
                    <Tbody rows={rows} />
                </TableB>
            </Col>
        </Row>

}