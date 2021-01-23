import styled, {createGlobalStyle} from 'styled-components/macro'

export const Color = createGlobalStyle`
    body {
        background-color: #f7f7f7;
    }
`;

export const Container = styled.div`
    font-family: "Circular Std Book", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const Title = styled.h1`
    font-size: 10rem;
    text-align: center;
    margin: 0;
    @media(max-width: 780px){
        font-size: 4rem;
    }
`;

export const Button = styled.a`
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    text-align: center;
    font-family: "Circular Std Book", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 2rem;
    background-color: #1DB954;
    color: #FFFFFF;
    border: 0;
    cursor: pointer;
    width: 25rem;
    height: 5rem;
    border-radius: 5rem;
    outline: none;
    margin-top: 2rem;

    @media(max-width: 780px){
        width: 15rem;
        height: 4rem;
        font-size: 1.5rem;
    }
`;