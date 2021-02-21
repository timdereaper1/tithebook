import { createContext } from 'react';
import type { Tithe } from '../@types';

interface TitheContextType {
	handleEdit: (title: Tithe) => void;
	handleDelete: (tithe: Tithe) => void;
}

export const TitheContext = createContext<TitheContextType>({
	handleDelete: () => null,
	handleEdit: () => null
});

export const { Provider } = TitheContext;
