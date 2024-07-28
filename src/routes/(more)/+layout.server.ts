export async function load({ parent }) {
  const { navigation } = await parent()

  return {
    navigation
  }
}
