import React, { useEffect, useState } from 'react'
import Player from '../../components/player/index'
import requestUserData from '../../requests/requestUserData'
import requestPausePlayback from '../../requests/requestPausePlayback'
import requestResume from '../../requests/requestResume'

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

//Pegar o hash da URL
const getHash = () => { //improve this part later TODO
    return window.location.hash.substring(1).split('&').reduce((accumulator, currentValue) => {
        const atrValue = currentValue.split('='); //Separa o atributo do valor em um array de dois elementos
        accumulator[atrValue[0]] = decodeURIComponent(atrValue[1]);
        return accumulator;
    }, {});
}

export default function Frame({children, ...restProps}){
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState({});
    const [songData, setSongData] = useState({});

    const connectToSpotify = (token) => {
        let player = new window.Spotify.Player({
            name: 'wavesound',
            getOAuthToken: callback => {
                callback(token);
            },
            volume: 0.5
        });
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });
    
        // Playback status updates
        player.addListener('player_state_changed', state => {
            player.getCurrentState().then(state => {
                if(!state) {
                    console.log("User is not playing music through the web playback sdk");
                } else {
                    setSongData(state.track_window);
                }
            });
            console.log(state);
        });
    
        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });
    
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
    
        // Connect to the player!
        player.connect();
    }
    
    function loadSpotifyPlayer(token) {
        if(!window.onSpotifyPlaybackSDKReady){
            window.onSpotifyPlaybackSDKReady = connectToSpotify;
            connectToSpotify(token);
        } else {
            connectToSpotify(token);
        }
    }

    useEffect(() => {
        setToken(getHash().access_token);
    }, [token]);

    useEffect(() => {
        requestUserData(token).then(userData => {
            setUserData(userData);
            loadSpotifyPlayer(token);
        }).catch(e => {
            console.log(e);
            setUserData({});
        });
    }, [token]);

    return (
        <>
            <a
                href={`${authURI}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}&response_type=token&state=${state}`}
            >{token ? null : "Login"}</a>
            {token ? console.log(userData) : null}
            <p>{songData.current_track ? songData.current_track.name : null}</p>
            <button onClick={()=>{requestPausePlayback(token)}}>Pause</button>
            <button onClick={() => {
                requestResume(token);
            }}>Play</button>
        </>
    );
}