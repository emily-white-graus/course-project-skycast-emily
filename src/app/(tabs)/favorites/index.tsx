import { Stack } from "expo-router"
import { useState } from "react"
import { StyleSheet, View } from "react-native"

import Icon from "#design/elements/Icon"
import Typography from "#design/elements/Typography"
import { colors } from "#design/foundations"
import { FavoriteEditForm, useFavorites } from "#features/favorites"

const App: React.FC = () => {
  const [editing, setEditing] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const favorites = useFavorites(refreshKey)

  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <View style={styles.container}>
        <Typography variant="title">Favorites</Typography>

        {favorites.map((favorite) => (
          <Typography key={favorite.id} href={`/favorites/${favorite.id}`}>
            {favorite.name}
          </Typography>
        ))}

        <Icon
          color={colors.background}
          name="add"
          onPress={() => setEditing(true)}
          size={32}
          style={styles.fab}
        />

        <FavoriteEditForm
          visible={editing}
          onClose={() => setEditing(false)}
          onSave={() => setRefreshKey((key) => key + 1)}
        />
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    padding: 16,
    borderRadius: 32,
    backgroundColor: colors.brand,
  },
})
