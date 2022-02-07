import axios from 'axios';

export const getAlbumResults = async (title: string) => {
  const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/albums/searchAlbums/${title}`,  {
    headers: {
     'Content-Type': 'application/json'
    },
    withCredentials: true
  }) 

  if (result.data.albums) {
    return result.data.albums;
  } else {
    return [];
  }
};
