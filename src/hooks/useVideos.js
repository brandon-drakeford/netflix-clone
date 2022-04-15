import { useState, useEffect } from 'react'
import youtube from '../youtube'

const useVideos = (defaultSearchTerm) => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        searchVideos(defaultSearchTerm)
    }, [defaultSearchTerm])

    const searchVideos = async (term) => {
        if (term !== '') {
            const response = await youtube.get('/search', {
                params: {
                    q: term
                }
            })
    
            setVideos(response.data.items)
        }
        
    }

    return [ videos, searchVideos ]
}

export default useVideos