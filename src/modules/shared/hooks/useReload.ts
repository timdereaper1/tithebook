import { DependencyList, EffectCallback, useEffect } from 'react';
import { EVENTS, subscribe, unsubscribe } from '../services/eventService';

function useReload(callback: EffectCallback, deps: DependencyList) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(callback, deps);

	useEffect(() => {
		const eventId = subscribe(EVENTS.RELOAD, callback);
		return () => unsubscribe(EVENTS.RELOAD, eventId);
	}, [callback]);
}

export default useReload;
