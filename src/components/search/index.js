import React, {useState} from 'react'
import { Background, Container, Close, Open, Input, Submit, Form } from './styles/search'

export default function Search({children, ...restProps}){
    return (
        <>
            <Background {...restProps}/> 
            <Container {...restProps}>{children}</Container>
        </>
    )
}

Search.Close = function SearchClose({...restProps}){
    return <Close {...restProps} src="components/search/close.svg" alt="close" />
}

Search.Open = function SearchOpen({...restProps}){
    return <Open {...restProps} src="components/search/search.svg" alt="open search" />
}

Search.Input = function SearchInput({token, requestSearch, searchTerm, setSearchTerm, setSearchResults, ...restProps}){
    const [foundSongs, setFoundSongs] = useState(true);

    return (
    <>
        <Form>
            <Submit src="components/search/search.svg" alt="submit" onClick={() => {requestSearch(token,searchTerm).then(data => console.log(data))}} />
            <Input 
                value={searchTerm}
                onChange={({target}) => setSearchTerm(target.value)}
                placeholder="Search a song"
                onKeyDown={({key})=>{if(key==="Enter") requestSearch(token, searchTerm).then(data => setSearchResults(data))}}
                tabIndex="0"
                {...restProps} 
            />
        </Form>
    </>
    )
}