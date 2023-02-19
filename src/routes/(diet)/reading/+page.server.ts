import {
  getBooksByReadingState,
  getBooksInGoal,
  getCurrentlyReading,
  getReadingGoals,
  getReadingProgress,
} from '$lib/api/literal'
import { error } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'

export const prerender = false

export const load: PageServerLoad = async function ({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200' })
  try {
    const reading = await getCurrentlyReading()
    const progress = await getReadingProgress(reading.map((r) => r.id))
    const recent = await getBooksByReadingState({ limit: 5, readingStatus: 'FINISHED' })
    const goals = await getReadingGoals()
    const booksInGoal = await getBooksInGoal(goals[0].id)

    return { reading, progress, recent, goals, booksInGoal }
  } catch (err) {
    console.error('Error: ', err)
    throw error(500, 'Error while getting reading books.')
  }
}
