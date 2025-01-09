const params = new URLSearchParams()

const {
	SPOTIFY_CLIENT_ID: client_id,
	SPOTIFY_CLIENT_SECRET: client_secret,
	SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const PLAYER_ENDPOINT = `https://api.spotify.com/v1/me/player`
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`

params.append('grant_type', 'refresh_token')
params.append('refresh_token', refresh_token)

const getAccessToken = async () => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params.toString()
	})

	return response.json()
}

export const getNowPlaying = async () => {
	const { access_token } = await getAccessToken()

	return fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	})
}

export const getRecentlyPlayed = async () => {
	const { access_token } = await getAccessToken()
	
	return fetch(RECENTLY_PLAYED_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	}).then(res => res.json())
}

export const controlPlayback = async (action) => {
	const { access_token } = await getAccessToken()
	
	let endpoint = PLAYER_ENDPOINT
	let method = 'PUT'

	switch (action) {
		case 'play':
			endpoint = `${PLAYER_ENDPOINT}/play`
			break
		case 'pause':
			endpoint = `${PLAYER_ENDPOINT}/pause`
			break
		case 'next':
			endpoint = `${PLAYER_ENDPOINT}/next`
			method = 'POST'
			break
		case 'previous':
			endpoint = `${PLAYER_ENDPOINT}/previous`
			method = 'POST'
			break
		default:
			throw new Error('Invalid action')
	}

	return fetch(endpoint, {
		method,
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	})
}
