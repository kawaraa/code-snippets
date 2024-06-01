async function getTotalGoalsByTeam(team, teamNumber, year) {
  let page = 1;
  let totalPages = 1;
  let totalGoals = 0;

  while (page <= totalPages) {
    const { total_pages, data } = await fetch(
      `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team${teamNumber}=${team}&page=${page}`
    ).then((res) => res.json());

    if (totalPages != total_pages) totalPages = total_pages;
    page++;

    data.forEach((match) => {
      if (teamNumber === 1) totalGoals += +match.team1goals;
      else totalGoals += +match.team2goals;
    });
  }

  return totalGoals;
}

// async function getTotalGoalsByTeam(team, teamNumber, year, page = 1, totalPages = 1, totalGoals = 0) {
//   if (page > totalPages) return totalGoals;

//   const { total_pages, data } = await fetch(
//     `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team${teamNumber}=${team}&page=${page}`
//   ).then((res) => res.json());

//   data.forEach((match) => {
//     if (teamNumber === 1) totalGoals += +match.team1goals;
//     else totalGoals += +match.team2goals;
//   });

//   return getTotalGoalsByTeam(team, teamNumber, year, (page += 1), total_pages, totalGoals);
// }

// async function getTotalGoalsByTeam(team, teamNumber, year, page = 1, totalPages = 1, totalGoals = 0) {
//   if (page > totalPages) return totalGoals;

//   return fetch(
//     `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team${teamNumber}=${team}&page=${page}`
//   )
//     .then((res) => res.json())
//     .then(({ total_pages, data }) => {
//       data.forEach((match) => {
//         if (teamNumber === 1) totalGoals += +match.team1goals;
//         else totalGoals += +match.team2goals;
//       });
//       return getTotalGoalsByTeam(team, teamNumber, year, (page += 1), total_pages, totalGoals);
//     });
// }

async function getTeams(team, year) {
  const [res1, res2] = await Promise.all([
    getTotalGoalsByTeam(team, 1, year),
    getTotalGoalsByTeam(team, 2, year),
  ]);

  return res1 + res2;
}

getTeams("Barcelona", "2011").then(console.log);
