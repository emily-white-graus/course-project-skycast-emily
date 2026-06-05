import { useCallback, useEffect, useState } from "react"

import {
  getFavorite,
  getFavorites,
  insertFavorite,
  updateFavorite,
} from "./favorites"
import { type Favorite } from "./types"

export function useFavorites(refreshKey = 0): Favorite[] {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    void (async () => {
      setFavorites(await getFavorites())
    })()
  }, [refreshKey])

  return favorites
}

export function useFavorite(id?: string, refreshKey = 0): Favorite | undefined {
  const [favorite, setFavorite] = useState<Favorite>()

  useEffect(() => {
    void (async () => {
      if (!id) return

      setFavorite(await getFavorite(id))
    })()
  }, [id, refreshKey])

  return favorite
}

export function useFavoriteMutations(
  id?: string,
): [Favorite | undefined, (favorite: Omit<Favorite, "id">) => Promise<void>] {
  const [favorite, setFavorite] = useState<Favorite>()

  useEffect(() => {
    void (async () => {
      if (!id) return

      setFavorite(await getFavorite(id))
    })()
  }, [id])

  const upsert = useCallback(
    async (favorite: Omit<Favorite, "id">) => {
      if (id === undefined) {
        await insertFavorite(favorite)
      } else {
        await updateFavorite({ id, ...favorite })
      }
    },
    [id],
  )

  return [favorite, upsert]
}
