type EventHandler = (data?: unknown) => void;

export const EVENTS = {
	RELOAD: '@event/reload'
};

const events: Record<string, Array<{ id: string; callback: EventHandler }>> = {};

export function subscribe(event: string, callback: EventHandler) {
	if (!events[event]) events[event] = [];
	const id = Math.ceil(Math.random() * 1000).toString(36);
	events[event].push({ id, callback });
	return id;
}

export function unsubscribe(event: string, id: string) {
	if (!events[event]) return;
	events[event] = events[event].filter((handler) => id !== handler.id);
}

export function emitEvent<T>(event: string, data?: T) {
	if (!events[event]) return;
	events[event].forEach((handler) => handler.callback(data));
}

export function emitReload() {
	emitEvent(EVENTS.RELOAD);
}
