import styled, {createGlobalStyle} from 'styled-components/macro'

export const Background = createGlobalStyle`
    body {
        background-color: #f7f7f7;
        color: #161616;
        font-family: "Circular Std Book", sans-serif;
    }
`;

export const Meta = styled.div`
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 1rem;
`;

export const Artist = styled.p`
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    margin-bottom: 1.5rem;
`;

export const Container = styled.div`
    margin-top: 40rem;
`;

export const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PlayButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: 0;
    padding: 0;
    outline: none;

    img {
        width: 60px;
    }
`;

export const PauseButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: 0;
    padding: 0;
    outline: none;

    img {
        width: 60px;
    }
`;

export const NextButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: 0;
    margin-left: 2.5rem;
    padding: 0;
    outline: none;

    img {
        width: 30px;
    }
`;

export const PrevButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: 0;
    margin-right: 2.5rem;
    padding: 0;
    outline: none;

    img {
        width: 30px;
    }
`;