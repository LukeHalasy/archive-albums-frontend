import axios from 'axios';

const getAlbumResults = async (title: string) => {
  try {
    const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/albums/searchAlbums/${title}`,  {
      headers: {
       'Content-Type': 'application/json'
      },
      withCredentials: true
    }) 

    console.log(result);
    if (result.data.albums) {
      return result.data.albums;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getAlbumResults;
