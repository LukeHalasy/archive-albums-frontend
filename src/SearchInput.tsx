import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { getAlbumResults } from './useAPI';

import './SearchInput.css';

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

interface Props {
  addAlbum: any
}

interface Album {
  artist: string
  name: string
  image: string
}

export const SearchInput: React.FC<Props> = ({ addAlbum }) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Album[]>();

  const debouncedSave = useCallback(
    debounce((newValue) => getSuggestions(newValue), 380),
    []
  );

  const updateValue = async (newValue: string) => {
    setInputValue(newValue);
    debouncedSave(newValue);
  };

  const getSuggestions = async (title: string) => {
    //TODO UNDO
    

    const random_albums = [];
    for (var i  = 0; i < 6; i++) {
      const randomTitle: string = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals]
      });
      
      const randomArtist: string = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals]
      });

      random_albums.push({
        name: randomTitle,
        artist: randomArtist,
        image: ''
      })
    }

    setOptions(random_albums);

    /*
    if (title) {
      setLoading(true);
      let response = await getAlbumResults(title);
      console.log(response);
      setOptions(response);
      setLoading(false);
    } else {
      setOptions([]);
    }
    */
  };

  return (
    <div className="searchContainer">
      <div className="results">
        {loading && <li>Loading...</li>}
        {(options && options.length > 0) &&
           !loading &&
            options?.map((value: Album, index: number) => (
              <div key={`${index}`} className="searchResult" onClick={() => addAlbum(value)}>{`${value.artist} - ${value.name}`}</div>
        ))}
      </div>
      <input
        value={inputValue}
        placeholder="Search for album.."
        onChange={(input) => updateValue(input.target.value)}
      />
    </div>
  )
}
