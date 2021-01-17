export default function requestSong(token, device_id, song_uri) {
    return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        body: JSON.stringify({ "uris": [`${song_uri}`], "offset": {position: 0}, "position_ms": 0 }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
}