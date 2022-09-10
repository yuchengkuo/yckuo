export const contextKey = Symbol('motion')
export const presenceKey = Symbol('motion-presence')

export interface PresenceState {
  initial?: boolean | undefined
}
