export default async function requestPlayer(token){
    let res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });

    if(res.ok){
        return await res.json();
    } else {
        throw new Error(`Error, status: ${res.status}`);
    }
}