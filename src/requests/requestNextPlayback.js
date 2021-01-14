export default async function requestNextPlayback(token){
    return fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
}