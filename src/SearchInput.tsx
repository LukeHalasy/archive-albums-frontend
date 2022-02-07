import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { getAlbumResults } from './useAPI';

import './SearchInput.css';

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
    if (title) {
      setLoading(true);
      let response = await getAlbumResults(title);
      console.log(response);
      setOptions(response);
      setLoading(false);
    } else {
      setOptions([]);
    }
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(input) => updateValue(input.target.value)}
      />
      <div className="results">
        <ul>
          {loading && <li>Loading...</li>}
          {(options && options.length > 0) &&
             !loading &&
              options?.map((value: Album, index: number) => (
                <li key={`${index}`} onClick={() => addAlbum(value)}>{`${value.artist} - ${value.name}`}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
