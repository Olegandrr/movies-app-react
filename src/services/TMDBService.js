export default class TMDBService {
  _apiBase = 'https://api.themoviedb.org/3/'

  async getMovies(searchQuery, page) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a58e6c9fc0e73efac9c700fd5116fa5b&query=${searchQuery}&include_adult=false&language=en-US&page=${page}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNThlNmM5ZmMwZTczZWZhYzljNzAwZmQ1MTE2ZmE1YiIsInN1YiI6IjY0ZGNiZTQxYTNiNWU2MDEzOTAwMTE0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gClT5bEmToDXP5BKWnitaVxD1BxMB5KS53iJEoEnWHM',
        },
      }
    )
    if (!res.ok) {
      throw new Error('сервер не ответил: ', res.status)
    }
    const body = await res.json()
    return body
  }

  async createGuestSession() {
    try {
      const res = await fetch(
        'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=a58e6c9fc0e73efac9c700fd5116fa5b'
      )
      if (!res.ok) {
        throw new Error('сервер не ответил: ', res.status)
      }
      const body = await res.json()
      return body.guest_session_id
    } catch {
      return new Error()
    }
  }

  async addRating(filmsId, sessionId, star) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${filmsId}/rating?api_key=a58e6c9fc0e73efac9c700fd5116fa5b&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value: star,
        }),
      }
    )
    if (!res.ok) {
      throw new Error('сервер не ответил: ', res.status)
    }
    const body = await res.json()
    return body
  }

  async getRating(sessionId) {
    console.log('вызов гетрейтинг: ', sessionId)
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=a58e6c9fc0e73efac9c700fd5116fa5b`
    )
    if (!res.ok) {
      throw new Error('сервер не ответил: ', res)
    }
    const body = await res.json()
    return body.results
  }
}
