import { getNowPlaying, getRecentlyPlayed } from '../lib/spotify'
import { Filter } from 'bad-words'
var filter = new Filter()

export default defineEventHandler(async (event) => {
	// Set headers to prevent caching
	setHeaders(event, {
		'Cache-Control': 'no-cache, no-store, must-revalidate',
		'Pragma': 'no-cache',
		'Expires': '0'
	})

	if (process.env.ENABLE_SPOTIFY == 'true') {
		const response = await getNowPlaying()

		if (response.status === 204 || response.status > 400) {
			// Fetch recently played if not currently playing
			try {
				const recentResponse = await getRecentlyPlayed()
				const recent = recentResponse?.items[0]

				if (recent) {
					const lastPlayed = new Date(recent.played_at)
					const timeAgo = getTimeAgo(lastPlayed)

					return {
						isPlaying: false,
						lastPlayed: timeAgo,
						album: recent.track.album.name,
						albumImageUrl: recent.track.album.images[0]?.url || '',
						artist: recent.track.artists.map((_artist) => _artist.name).join(', '),
						songUrl: recent.track.external_urls.spotify,
						title: filter.clean(recent.track.name) || recent.track.name,
						cleanTitle: filter.clean(recent.track.name) || recent.track.name
					}
				} else {
					return { isPlaying: false, message: 'No recent song data available' }
				}
			} catch (error) {
				console.error('Error fetching recently played:', error)
				return { isPlaying: false, message: 'Error fetching recently played tracks' }
			}
		}

		var albumImageUrl = ''
		var songUrl = ''
		const song = await response.json()
		const isPlaying = song?.is_playing
		const title = song?.item.name
		const artist = song?.item.artists.map((_artist) => _artist.name).join(', ')
		const album = song?.item.album.name
		const cleanTitle = filter.clean(song?.item.name || '')
		if (song?.item.album.images.length > 0) {
			albumImageUrl = song?.item?.album?.images[0]?.url
		}
		if (song?.item.external_urls) {
			songUrl = song?.item?.external_urls?.spotify
		}

		if (isPlaying) {
			return {
				album,
				albumImageUrl,
				artist,
				isPlaying,
				songUrl,
				title,
				cleanTitle
			}
		} else {
			return {
				isPlaying,
				message: 'No song playing currently'
			}
		}
	} else {
		return {
			isPlaying: false,
			message:
				'Spotify feature is disabled (check the `ENABLE_SPOTIFY` environment variable)'
		}
	}
})

// Helper function to format time ago
function getTimeAgo(date) {
	const now = new Date()
	const diffMs = now - date
	const diffMins = Math.floor(diffMs / 60000)
	const diffHours = Math.floor(diffMins / 60)
	const diffDays = Math.floor(diffHours / 24)

	if (diffMins < 1) return 'Just now'
	if (diffMins === 1) return '1 minute ago'
	if (diffMins < 60) return `${diffMins} minutes ago`
	if (diffHours === 1) return '1 hour ago'
	if (diffHours < 24) return `${diffHours} hours ago`
	if (diffDays === 1) return 'Yesterday'
	if (diffDays < 7) return `${diffDays} days ago`
	
	return date.toLocaleDateString()
}
