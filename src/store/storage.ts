export default function loadState<T>(key: string): T | undefined {
	try {
		const state = localStorage.getItem(key);
		if (!state) {
			return undefined;
		}
		return JSON.parse(state);
	} catch (err) {
		console.error(err);
		return undefined;
	}
}

export function saveState<T>(state: T, key: string) {
	const savedState = JSON.stringify(state);
	localStorage.setItem(key, savedState);
}
