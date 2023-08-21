export default class TMDBService {
  _apiBase = 'https://api.themoviedb.org/3/'

  async getMovies(searchQuery, page) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`,
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
}
