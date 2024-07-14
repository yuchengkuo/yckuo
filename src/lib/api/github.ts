import { GITHUB_PERSONAL_ACCESS_TOKEN } from '$env/static/private'

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
}

export async function getSiteRepo() {
  return await fetch('https://api.github.com/repos/yuchengkuo/yckuo', {
    headers,
  }).then((res) => res.json())
}

export async function getSiteLastCommit() {
  return await fetch('https://api.github.com/repos/yuchengkuo/yckuo/commits?per_page=1', {
    headers,
  }).then((res) => res.json().then((commits) => commits[0]))
}
