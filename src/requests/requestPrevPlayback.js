export default async function requestPrevPlayback(token){
    return fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
}