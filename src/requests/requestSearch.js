export default function requestSearch(token, search) {
    let searchEncoded = encodeURI(search);

    return fetch(`https://api.spotify.com/v1/search?q=${searchEncoded}&type=track`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(data => data.json());
}