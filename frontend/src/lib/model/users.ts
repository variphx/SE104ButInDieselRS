export interface Users {
	username: string;
	hash_pwd: string;
}

export interface NewUsers {
	username: string;
	hash_pwd: string;
}

export const get_user = async (username: string) => {
	const response = await fetch(
		`http://localhost:8080/api/users/get?${new URLSearchParams({ username: username })}`
	);

	if (!response.ok) {
		throw new Error(await response.text());
	}

	return response.json() as Promise<Users>;
};

export const post_user = async (value: NewUsers) => {
	const response = await fetch('http://localhost:8080/api/users/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(value)
	});

	if (!response.ok) {
		throw new Error(await response.text());
	}
};
