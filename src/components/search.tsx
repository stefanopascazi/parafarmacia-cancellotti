import React from 'react'
import { Form, FormControl, InputGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

interface ISearch {
    getOnChange?: Function
}

const SearchBar: React.FC<ISearch> = ({getOnChange}: ISearch): JSX.Element => {
    
    return(
        <Form>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text className={"bg-light"}><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type="text" size={"lg"} placeholder="Ricerca" className="mr-sm-2 bg-light" onChange={(e) => getOnChange(e.target.value)} />
            </InputGroup>
        </Form>
    )
}

export default SearchBar