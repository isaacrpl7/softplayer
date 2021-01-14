import React from 'react'
import { PauseButton, PlayButton, Background, Container, Title, Artist, Meta, Buttons, PrevButton, NextButton } from './styles/player';

export default function Player({ children, ...restProps }){
    return (
        <>
            <Background />
            <Container {...restProps}>{children}</Container>
        </>
    );
}

Player.Buttons = function buttons({ children, ...restProps }){
    return <Buttons {...restProps}>{children}</Buttons>
}

Player.Title = function title({ children, ...restProps }){
    return <Title {...restProps}>{children}</Title>
}

Player.Artist = function artist({ children, ...restProps }){
    return <Artist {...restProps}>{children}</Artist>
}

Player.Meta = function meta({ children, ...restProps }){
    return <Meta {...restProps}>{children}</Meta>
}

Player.PlayButton = function playButton({...restProps}){
    return (
        <PlayButton {...restProps} >
            <img src="components/player/play.png" alt="play" />
        </PlayButton>
    )
}

Player.PauseButton = function pauseButton({...restProps}){
    return (
        <PauseButton {...restProps} >
            <img src="components/player/pause.png" alt="pause" />
        </PauseButton>
    )
}

Player.NextButton = function nextButton({...restProps}){
    return (
        <NextButton {...restProps} >
            <img src="components/player/next.png" alt="next" />
        </NextButton>
    )
}

Player.PrevButton = function prevButton({...restProps}){
    return (
        <PrevButton {...restProps} >
            <img src="components/player/prev.png" alt="previous" />
        </PrevButton>
    )
}