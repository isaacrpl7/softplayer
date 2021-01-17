import React, { useEffect, useState } from 'react'
import {Player, Search, TracksSearch} from '../components'
import { TrackContainer } from '../components/tracksSearch/styles/tracksSearch';
import {requestUserData, requestPausePlayback, requestResume, requestPrevPlayback, requestNextPlayback, requestSong, requestSearch} from '../requests'

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

let tracks = null;

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
    const [deviceID, setDeviceID] = useState("");
    const [userData, setUserData] = useState({});
    const [songData, setSongData] = useState({});
    const [paused, setPaused] = useState(true);
    const [searchActive, setSearchActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState({});

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
                    setPaused(state.paused);
                }
            });
            console.log(state);
        });
    
        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            setDeviceID(device_id);
        });
    
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
    
        // Connect to the player!
        player.connect();
    }

    useEffect(() => {
        setToken(getHash().access_token);
    }, [token]);

    useEffect(() => {
        if(token) {
            requestUserData(token).then(userData => {
                setUserData(userData);
                if(!window.onSpotifyPlaybackSDKReady){
                    window.onSpotifyPlaybackSDKReady = connectToSpotify;
                    connectToSpotify(token);
                } else {
                    connectToSpotify(token);
                }
            }).catch(e => {
                console.log(e);
                setUserData({});
            });
        }
    }, [token]);

    return (
        <>
            <a
                href={`${authURI}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}&response_type=token&state=${state}`}
            >{token ? null : "Login to spotify"}</a>
            <Search.Open onClick={() => {setSearchActive(true)}} />
            <Search active={searchActive}>
                <Search.Close onClick={() => {setSearchActive(false)}} />
                <Search.Input 
                    token={token} 
                    requestSearch={requestSearch} 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                    setSearchResults={setSearchResults}
                />
                <TracksSearch>
                    {searchResults.tracks?.items ? 
                        searchResults.tracks.items.map(track => (
                            <TrackContainer onClick={() => {requestSong(token, deviceID, track.uri)}} key={track.uri}>
                                <TracksSearch.Track 
                                    track={track}
                                />
                            </TrackContainer>
                        ))
                    :
                    null}
                </TracksSearch>
            </Search>
            <Player>
                <Player.Meta>
                    <Player.Title>{songData.current_track ? songData?.current_track.name.toUpperCase() : null}</Player.Title>
                    <Player.Artist>{songData.current_track ? songData?.current_track.artists[0].name.toUpperCase() : null}</Player.Artist>
                </Player.Meta>
                <Player.Buttons>
                    <Player.PrevButton onClick={() => {requestPrevPlayback(token)}} />
                    {paused ? 
                        <Player.PlayButton 
                            onClick={() => {requestResume(token);}} 
                        /> : 
                        <Player.PauseButton 
                            onClick={()=>{requestPausePlayback(token)}}
                    />}
                    <Player.NextButton onClick={() => {requestNextPlayback(token)}} />
                </Player.Buttons>
            </Player>
            
        </>
    );
}