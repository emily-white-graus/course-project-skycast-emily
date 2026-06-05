import Storage from "@react-native-async-storage/async-storage"

import { type Favorite } from "./types"

const STORAGE_KEY = "favorites"

const defaultFavorites: Favorite[] = [
  { id: "reno", name: "Reno", latitude: 39.5299, longitude: 119.8143 },
  {
    id: "barcelona",
    name: "Barcelona",
    latitude: 41.385063,
    longitude: 2.173404,
  },
]

export async function getFavorites(): Promise<Favorite[]> {
  const cached = await Storage.getItem(STORAGE_KEY)
  if (!cached) {
    await setFavorites(defaultFavorites)
    return defaultFavorites
  }

  const favorites = withIds(JSON.parse(cached) as Array<Partial<Favorite>>)
  await setFavorites(favorites)

  return favorites
}

export async function getFavorite(id: string): Promise<Favorite | undefined> {
  const favorites = await getFavorites()

  return favorites.find((favorite) => favorite.id === id)
}

export async function insertFavorite(
  favorite: Omit<Favorite, "id">,
): Promise<Favorite> {
  const favorites = await getFavorites()
  const fullFavorite = { id: makeId(favorite.name), ...favorite }

  await setFavorites([...favorites, fullFavorite])

  return fullFavorite
}

export async function updateFavorite(favorite: Favorite): Promise<Favorite> {
  const favorites = await getFavorites()

  await setFavorites(
    favorites.map((current) =>
      current.id === favorite.id ? favorite : current,
    ),
  )

  return favorite
}

async function setFavorites(favorites: Favorite[]) {
  await Storage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

function withIds(favorites: Array<Partial<Favorite>>): Favorite[] {
  return favorites
    .filter(
      (favorite): favorite is Omit<Favorite, "id"> & { id?: string } =>
        typeof favorite.name === "string" &&
        typeof favorite.latitude === "number" &&
        typeof favorite.longitude === "number",
    )
    .map((favorite) => ({
      ...favorite,
      id: favorite.id ?? makeId(favorite.name),
    }))
}

function makeId(name: string): string {
  return `${name.toLowerCase().replace(/\W+/g, "-")}-${Math.random()
    .toString(16)
    .slice(2, 8)}`
}
