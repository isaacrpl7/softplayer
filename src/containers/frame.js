import React, { useEffect, useRef, useState } from 'react'
import { Player, Search, TracksSearch, Login } from '../components'
import { TrackContainer } from '../components/tracksSearch/styles/tracksSearch';
import { requestUserData, requestPrevPlayback, requestNextPlayback, requestSong, requestSearch} from '../requests'

/** BRAINSTORM
 * - Adicionar estilos de acordo com as features das ultimas musicas escutadas (mais calma - fundo azul, etc etc)
 */

/** TODO
 * - Usar o localStorage para guardar o token (https://glitch.com/~spotify-audio-analysis)
 * - Melhorias no código (não esquecer de comentar mais)
 * - Tratar exceções (token inválido e track não encontrado)
 * - Adicionar a logo do spotify e links que levam a música para o player do spotify
 * - Fazer barra de play + volume
 * - Adicionar Playlist de like (reutilizar componente de busca)
 * - Pesquisar sobre API do youtube
 */

const authURI = "https://accounts.spotify.com/authorize";
//const redirectURI = "https://softplayer.vercel.app/";
const redirectURI = "http://localhost:3000/";
const state = "123";
const scopes = [
    "user-read-currently-playing",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-private",
    "user-read-email",
    "streaming"
];
var player;

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
        player = new window.Spotify.Player({
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

    //PLAYER -------------------------------------------------------
    /*const [timing, setTiming] = useState(0);
    const requestRef = useRef();
    const previousTimeRef = useRef();
    const time = timestamp => {
        if(previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;

            player && player.getCurrentState().then(state => setTiming(state && state.position));
        }
        previousTimeRef.current = timestamp;
        requestRef.current = requestAnimationFrame(time);
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(time);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);*/
    //PLAYER --------------------------------------------------------

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
        } else {
            setToken(getHash().access_token);
        }

        return player && player.disconnect();
    }, [token]);

    return (
        <>
            { token ?
            <>
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
                {songData.current_track ? 
                <Player.Image 
                    src={songData?.current_track.album.images[0].url} 
                    alt="Album Image" 
                    draggable={false}
                /> : null}
                <Player.Meta>
                    <Player.Title>{songData.current_track ? songData?.current_track.name.toUpperCase() : null}</Player.Title>
                    <Player.Artist>{songData.current_track ? songData?.current_track.artists[0].name.toUpperCase() : null}</Player.Artist>
                </Player.Meta>
                <Player.Buttons>
                    <Player.PrevButton onClick={() => {requestPrevPlayback(token)}} />
                    {paused ? 
                        <Player.PlayButton 
                            onClick={() => {player.resume();}} 
                        /> : 
                        <Player.PauseButton 
                            onClick={()=>{player.pause()}}
                    />}
                    <Player.NextButton onClick={() => {requestNextPlayback(token)}} />
                </Player.Buttons>
            </Player>
            </>

            :

            <>
            <Login>
                <Login.Button
                    href={`${authURI}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}&response_type=token&state=${state}`}
                >{token ? null : "Login to spotify"}</Login.Button>
            </Login>
            </>
            }
        </>
    );
}