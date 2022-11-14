import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {RootState, AppDispatch} from './store';

// custome hook for redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
