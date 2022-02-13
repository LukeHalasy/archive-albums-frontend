import React, { useRef, useState, useCallback, useEffect } from 'react';
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
  const [indexKeySelected, setIndexKeySelected] = useState<number>(0);

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const keyRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const blankRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const debouncedSave = useCallback(
    debounce((newValue) => getSuggestions(newValue), 380),
    []
  );

  const updateValue = async (newValue: string) => {
    setInputValue(newValue);
    debouncedSave(newValue);
  };

  useEffect(() => {
    inputRef.current.focus();
  })

  const getSuggestions = async (title: string) => {
    /*
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
    */

    if (title) {
      setLoading(true);
      let response = await getAlbumResults(title);
      console.log(response);

      setOptions(response);
      setLoading(false);
      if (options && options.length > 0) {
        keyRef.current.focus();
      }
    } else {
      setLoading(false);
      setOptions([]);
    }
  };


  const handleAddAlbum = async (value: Album) => {
    await addAlbum(value);
    setInputValue('');
    setOptions([]);
    setIndexKeySelected(0);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndexKeySelected((options && indexKeySelected <= 0) ? options.length - 1 : indexKeySelected - 1)
    } else if (e.key == 'ArrowDown') {
      e.preventDefault();
      setIndexKeySelected((!options || indexKeySelected >= options.length - 1) ? 0 : indexKeySelected + 1);
    } else if (e.key == 'Enter') {
      e.preventDefault();
      if (options && options.length > 0 && indexKeySelected != -1) {
        handleAddAlbum(options[indexKeySelected])
      }
    }
  }

  return (
    <div className="searchContainer">
      <div className="results">
        {loading && <div className="searchResult">Loading..</div>}
        {(options && options.length > 0) &&
           !loading &&
            options?.map((value: Album, index: number) => (
              (index == indexKeySelected) ?
                <div ref={(index == 0) ? keyRef : blankRef} key={`${index}`} style={{'backgroundColor': 'var(--color-white-main)', 'color': 'var(--album-box-bg)'}} className="searchResult" onClick={() => {handleAddAlbum(value)}}>{`${value.artist} - ${value.name}`}</div>
              :
                <div ref={(index == 0) ? keyRef : blankRef} key={`${index}`} className="searchResult" onClick={() => {handleAddAlbum(value)}}>{`${value.artist} - ${value.name}`}</div>
        ))}
      </div>
      <input
        value={inputValue}
        ref={inputRef}
        onKeyDown={handleKeyPress}
        placeholder="Search for album.."
        onChange={(input) => updateValue(input.target.value)}
      />
    </div>
  )
}
