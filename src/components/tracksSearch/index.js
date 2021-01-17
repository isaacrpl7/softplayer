import React from 'react'
import { Container, TrackImg, TrackTitle, TrackSubtitle, TrackContainer, TrackMeta } from './styles/tracksSearch'

export default function TracksSearch({children, ...restProps}){
    return <Container {...restProps}>{children}</Container>
}

TracksSearch.TrackContainer = function trackContainer({ children, ...restProps }){
    <trackContainer {...restProps}>{children}</trackContainer>
}

TracksSearch.Track = function Track({track, ...restProps}){
    return (
        <>
            <TrackImg src={track.album.images[0].url} />
            <TrackMeta>
                <TrackTitle>{track.name}</TrackTitle>
                <TrackSubtitle>
                    Album: {track.album.name}<br/>
                    Release-date: {track.album.release_date}
                </TrackSubtitle>
            </TrackMeta>
        </>
    )
}