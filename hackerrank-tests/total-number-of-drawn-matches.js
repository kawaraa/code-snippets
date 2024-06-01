// async function getNumDraws(year) {
//   let page = 1;
//   let totalPages = 1;
//   let drawnMatches = 0;

//   while (page <= totalPages) {
//     const { total_pages, data } = await fetch(
//       `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&page=${page}`
//     ).then((res) => res.json());

//     if (totalPages != total_pages) totalPages = total_pages;
//     page++;

//     data.forEach((match) => +match.team1goals === +match.team2goals && (drawnMatches += 1));
//   }

//   return drawnMatches;
// }

// async function getNumDraws(year, page = 1, totalPages = 1, drawnMatches = 0) {
//   if (page > totalPages) return drawnMatches;

//   const { total_pages, data } = await fetch(
//     `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&page=${page}`
//   ).then((res) => res.json());

//   data.forEach((match) => +match.team1goals === +match.team2goals && (drawnMatches += 1));

//   return getNumDraws(year, (page += 1), total_pages, drawnMatches);
// }

async function getNumDraws(year) {
  let drawnMatches = 0;
  const requests = [];

  const get = (page) =>
    fetch(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&page=${page}`).then((res) =>
      res.json()
    );

  const { total_pages } = await get(1);

  for (let i = 0; i < total_pages; i++) {
    requests.push(get(i + 1));
  }
  const results = await Promise.all(requests);

  results.forEach(({ data }) =>
    data.forEach((match) => +match.team1goals === +match.team2goals && (drawnMatches += 1))
  );

  return drawnMatches;
}

getNumDraws("2011").then(console.log);
