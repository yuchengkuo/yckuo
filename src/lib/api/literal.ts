import { LITERAL_ACCESS_TOKEN as access_token } from '$env/static/private'

const LITERAL_ENDPOINT = 'https://literal.club/graphql/'
const PROFILE_ID = 'ckrpp84x1569051euw32t0sw4t'

export type LiteralBook = {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  language: string
  pageCount: string
  publishedDate: string
  cover: string
  authors: {
    id: string
    name: string
  }[]
  gradientColors: string[]
}

export type ReadingProgress = {
  bookId: string
  capacity: number
  createdAt: string
  id: string
  profileId: string
  progress: number
  unit: string
  completed: boolean
}

export type ReadingGoal = {
  id: string
  profileId: string
  progress: number
  profile: {
    id: string
    handle: string
    name: string
  }
  goal: {
    id: string
    name: string
    slug: string
    target: number
    startDate: Date
    endDate: Date
  }
}

export type BookInGoal = {
  id: string
  participantId: string
  createdAt: string
  bookId: string
  book: LiteralBook
}

type ReadingStatus = 'WANTS_TO_READ' | 'IS_READING' | 'FINISHED' | 'DROPPED' | 'NONE'

export async function getBooksByReadingState({
  limit = 8,
  offset = 0,
  profileId = PROFILE_ID,
  readingStatus = 'IS_READING'
}: {
  limit?: number
  offset?: number
  profileId?: string
  readingStatus?: ReadingStatus
}) {
  const res = await fetch(LITERAL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query reading(
          $limit: Int!
          $offset: Int!
          $readingStatus: ReadingStatus!
          $profileId: String!
        ) {
          booksByReadingStateAndProfile(
            limit: $limit
            offset: $offset
            readingStatus: $readingStatus
            profileId: $profileId
          ) {
            ...BookParts
          }
        }
        fragment BookParts on Book {
          id
          slug
          title
          subtitle
          description
          language
          pageCount
          publishedDate
          cover
          authors {
            id
            name
          }
          gradientColors
        }`,
      variables: {
        limit,
        offset,
        readingStatus,
        profileId
      }
    })
  })
  const {
    data: { booksByReadingStateAndProfile: books }
  }: { data: { booksByReadingStateAndProfile: LiteralBook[] } } = await res.json()

  return books
}

export function getCurrentlyReading(limit = 8, offset = 0, profileId = PROFILE_ID) {
  return getBooksByReadingState({
    limit,
    offset,
    profileId,
    readingStatus: 'IS_READING'
  })
}

export async function getReadingProgress(bookIds: string[]) {
  const res = await fetch(LITERAL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query readingProgresses($bookIds: [String!]!) {
          readingProgresses(bookIds: $bookIds, active: true) {
            ...ReadingProgressParts
          }
        }
        fragment ReadingProgressParts on ReadingProgress {
          bookId
          capacity
          createdAt
          id
          profileId
          progress
          unit
          completed
        }`,
      variables: {
        bookIds
      }
    })
  })
  const {
    data: { readingProgresses: progress }
  }: { data: { readingProgresses: ReadingProgress[] } } = await res.json()

  return progress
}

export async function getReadingGoals(handle = 'yuchengkuo', limit = 20, offset = 0) {
  const res = await fetch(LITERAL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query goalParticipationsByHandle(
          $handle: String!
          $earliestEndDate: String
          $latestEndDate: String
          $limit: Int!
          $offset: Int!
        ) {
          goalParticipations(
            handle: $handle
            earliestEndDate: $earliestEndDate
            latestEndDate: $latestEndDate
            limit: $limit
            offset: $offset
          ) {
            ...GoalParticipantParts,
            goal {
              ...GoalParts
            }
          }
        }
        fragment GoalParticipantParts on GoalParticipant {
          id
          profileId
          progress
          profile {
            ...ProfileParts
          }
          goalId
        }
        fragment ProfileParts on Profile {
          id
          handle
          name
        }
        fragment GoalParts on Goal {
          id
          name
          slug
          target
          startDate
          endDate
        }`,
      variables: {
        handle,
        earliestEndDate: new Date(Date.now()).toISOString(),
        limit,
        offset
      }
    })
  })
  const {
    data: { goalParticipations: goals }
  }: { data: { goalParticipations: ReadingGoal[] } } = await res.json()

  return goals
}

export async function getBooksInGoal(participantId: string, limit = 50, offset = 0) {
  const res = await fetch(LITERAL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
      query booksInGoal(
        $participantId: String!
        $limit: Int!
        $offset: Int!
      ) {
        booksInGoal(
          participantId: $participantId
          limit: $limit
          offset: $offset
        ) {
          ...BookInGoalParts
        }
      }
      fragment BookInGoalParts on BookInGoal {
        id
        participantId
        createdAt
        bookId
        book {
          ...BookParts
        }
      }
      fragment BookParts on Book {
        id
        slug
        title
        subtitle
        description
        language
        pageCount
        publishedDate
        cover
        authors {
          id
          name
        }
        gradientColors
      }
      `,
      variables: {
        participantId,
        limit,
        offset
      }
    })
  })
  const {
    data: { booksInGoal }
  }: { data: { booksInGoal: BookInGoal[] } } = await res.json()

  return booksInGoal
}
