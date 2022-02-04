import { ChangeEvent, useState } from 'react';

export const useFormState = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);

  const onFormElementChange = ({target}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return [state, onFormElementChange] as [T, (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void];
};
