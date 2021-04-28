import React, { useState, useEffect } from 'react'
import MainPageLayout from '../Components/MainPageLayout'
import { useShows } from '../Misc/custom-hooks'
import { apiGet } from '../Misc/config'
import ShowGrid from '../Components/Show/ShowGrid'

const Starred = () => {

    const [starred] = useShows();

    const [shows, setShows] = useState(null);
    const [isLoading, setIsLoading]= useState(true);
    const [error, setError]= useState(null);

    useEffect(() => {
        if(starred && starred.length > 0){
            const promises = starred.map(showId => apiGet(`/shows/${showId}`));
            Promise.all(promises)
            .then(apiData=>apiData.map(show=>({show})))
            .then(results=>{
                setShows(results);
                setIsLoading(false);
            }).catch(err=>{
                setError(err.message);
                setIsLoading(false);
            })
        } else {
            setIsLoading(false);
        }
    }, [starred])
    return (
        <MainPageLayout>
            {isLoading && <div>Shows are still loading</div>} 
            {error && <div>Error Occurred: {error}</div>}
            {!isLoading && !shows && <div>No shows were added</div>}
            {!isLoading && !error && shows && <ShowGrid data={shows}/>}
        </MainPageLayout>
    )
}

export default Starred
