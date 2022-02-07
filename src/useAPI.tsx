import axios from 'axios';

const url = axios.create({
  baseURL: 'localhost:4000/api/v1/albums/searchAlbums',
});

export const getAlbumResults = async (title: string) => {
  const result = await axios.get(`http://localhost:4000/api/v1/albums/searchAlbums/${title}`,  {
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
