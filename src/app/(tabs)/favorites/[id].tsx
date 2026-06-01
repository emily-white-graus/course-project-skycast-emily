import { Stack, useLocalSearchParams } from "expo-router"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { useFavorites } from "#shared/favorites"
import { CurrentWeather, Forecast } from "#shared/weather"

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [favorites] = useFavorites()
  const location = favorites[Number(id)]

  return (
    <>
      <Stack.Screen options={{ title: location?.name ?? `Favorite ${id}` }} />

      <View style={styles.container}>
        {location ? (
          <>
            <CurrentWeather location={location} />
            <Forecast location={location} />
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
})
