import {useDispatch} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import {Guitar} from '../../types/types';
import {ActionAPI} from '../../store/api-actions/api-actions';
import {isEscKeyDown} from '../../utils/common';

export const useSearch = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [foundGuitars, setFoundGuitars] = useState<Guitar[]>([]);
  const isDropdownVisible = Boolean(foundGuitars.length);

  const changeSearch = (query: string) => {
    setSearch(query);
    dispatch(ActionAPI.searchGuitars(query, setFoundGuitars));
  };

  const onDocumentEscKeydown = useCallback((evt: KeyboardEvent) => {
    if (isEscKeyDown(evt)) {
      setSearch('');
      setFoundGuitars([]);
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  }, []);

  useEffect(() => {
    search && document.addEventListener('keydown', onDocumentEscKeydown);
    return () => document.removeEventListener('keydown', onDocumentEscKeydown);
  }, [search, onDocumentEscKeydown]);

  return {search, changeSearch, isDropdownVisible, foundGuitars};
};
