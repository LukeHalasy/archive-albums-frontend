import fetch from 'node-fetch';

const getAlbumResults = async (title: string) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/albums/searchAlbums/${title}`, {
        method: 'get',
        headers: {
         'Content-Type': 'application/json'
        },
        // @ts-ignore
        credentials: 'include' 
      });  

    const data: any = await res.json();

    if (data.albums) {
      return data.albums;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export default getAlbumResults;
