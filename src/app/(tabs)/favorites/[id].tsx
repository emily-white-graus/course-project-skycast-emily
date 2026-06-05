import { Stack, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { StyleSheet, View } from "react-native"

import Icon from "#design/elements/Icon"
import Typography from "#design/elements/Typography"
import { colors } from "#design/foundations"
import { FavoriteEditForm, useFavorite } from "#features/favorites"
import { CurrentWeather, Forecast } from "#shared/weather"

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [editing, setEditing] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const location = useFavorite(id, refreshKey)

  return (
    <>
      <Stack.Screen options={{ title: location?.name ?? `Favorite ${id}` }} />

      <View style={styles.container}>
        {location ? (
          <>
            <CurrentWeather location={location} />
            <Forecast location={location} />

            <Icon
              color={colors.background}
              name="save"
              onPress={() => setEditing(true)}
              size={28}
              style={styles.fab}
            />

            <FavoriteEditForm
              favoriteId={id}
              visible={editing}
              onClose={() => setEditing(false)}
              onSave={() => setRefreshKey((key) => key + 1)}
            />
          </>
        ) : (
          <Typography>Favorite not found</Typography>
        )}
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
