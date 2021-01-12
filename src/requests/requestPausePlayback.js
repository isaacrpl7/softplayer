export default async function requestPausePlayback(token){
    return fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
}