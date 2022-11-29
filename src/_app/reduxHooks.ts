import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {RootState, AppDispatch} from './store';

// custom hook for redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
