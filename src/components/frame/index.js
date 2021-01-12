import React, { useEffect, useState } from 'react'
import Player from '../../components/player/index'
import request from '../../hooks/request'

const clientID = "";
const authURI = "https://accounts.spotify.com/authorize";
const redirectURI = "http://localhost:3000";
const state = "123";
const scopes = [
    "user-read-currently-playing",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-private",
    "user-read-email",
    "streaming"
];

const getHash = () => { //improve this part later TODO
    return window.location.hash.substring(1).split('&').reduce((accumulator, currentValue) => {
        const atrValue = currentValue.split('='); //Separa o atributo do valor em um array de dois elementos
        accumulator[atrValue[0]] = decodeURIComponent(atrValue[1]);
        return accumulator;
    }, {});
}

export default function Frame({children, ...restProps}){
    const [token, setToken] = useState("");
    const [data, setData] = useState({});

    useEffect(() => {
        setToken(getHash().access_token);
    }, [token]);

    useEffect(() => {
        request(token).then(data => {
            setData(data);
        }).catch(e => {
            console.log(e);
            setData({});
        });
    }, [token]);

    return (
        <>
            <a
                href={`${authURI}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}&response_type=token&state=${state}`}
            >{token ? null : "Login"}</a>
            {token ? <Player 
                token={token}
                syncExternalDevice={true}
            /> : null}
            
        </>
    );
}