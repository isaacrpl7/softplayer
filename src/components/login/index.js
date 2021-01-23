import React from 'react'
import { Container, Button, Title, Color } from './styles/login'

export default function Login({children, ...restProps}){
    return (
        <>
        <Color/>
        <Container {...restProps}>
            <Title>Welcome!</Title>
            {children}
        </Container>
        </>
    )
}

Login.Button = function LoginButton({...restProps}){
    return <Button {...restProps}/>
}
