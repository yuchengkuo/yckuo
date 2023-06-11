import { GITHUB_PERSONAL_ACCESS_TOKEN } from '$env/static/private'

export async function getSiteRepo() {
  return await fetch('https://api.github.com/repos/yuchengkuo/yckuo', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }).then((res) => res.json())
}
