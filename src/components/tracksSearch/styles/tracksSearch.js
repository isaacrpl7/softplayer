import styled from 'styled-components/macro'

export const Container = styled.div`
    text-align: start;
    max-height: 550px;
    overflow: auto;
    /* width */
    &::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #b8b3ac;
        border-radius: 1rem;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #938e89;
    }
    margin-bottom: 1rem;
`;

export const TrackContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
`;

export const TrackImg = styled.img`
    width: 100px;
    height: 100px;
    margin-left: 1rem;
`;

export const TrackMeta = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 2rem;
`;

export const TrackTitle = styled.h1`
    font-size: 18px;
`;

export const TrackSubtitle = styled.p`
    font-size: 16px;
`;