import styled, {createGlobalStyle} from 'styled-components/macro'
import * as Player from '../../player/styles/player'


export const Container = styled.div`
    @keyframes open {
        from   {top: 0; display: none;}
        to  {top: 2rem; display:block;}
    }
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2;
    width: 500px;
    background-color: #E7E7E7;
    border-radius: 20px;
    display: ${({ active }) => (active ? 'block' : 'none')};
    top: ${({ active }) => (active ? '2rem' : '0')};
    animation-name: open;
    animation-duration: 1s;
    animation-iteration-count: 1;
`;

export const Close = styled.img`
    width: 20px;
    position: absolute;
    cursor: pointer;
    top: 1rem;
    right: 1rem;
`;

export const Open = styled.img`
    display: block;
    width: 50px;
    cursor: pointer;
    text-align: center;
    margin: auto;
    margin-top: 3rem;
`;

export const Form = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
`;

export const Input = styled.input`
    background-color: #E7E7E7;
    font-family: "Circular Std Book", sans-serif;
    font-size: 16px;
    padding: 0 0.5rem;
    border: none;
    border-bottom: 2px solid #b8b3ac;
    margin-left: 1rem;
    width: 400px;
    outline: none;
`;

export const Submit = styled.img`
    width: 30px;
    cursor: pointer;
`;


export const Background = createGlobalStyle`
   ${Player.Container}, ${Open} {
        filter: ${({ active }) => (active ? 'blur(0.3rem)' : 'none')};
    }
`;