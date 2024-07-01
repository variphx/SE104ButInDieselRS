export interface NewSession {
	id: string;
	username: string;
}

export interface Session {
	id: string;
	username: string;
}

export const get_session = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/session/get?${params}`);

	if (!response.ok) {
		throw new Error(await response.text());
	}

	return response.json() as Promise<Session>;
};
