import { Stack } from "expo-router"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <View style={styles.container}>
        <Typography variant="title">Favorites</Typography>

        <Typography href="/favorites/one">a</Typography>
        <Typography href="/favorites/two">b</Typography>
        <Typography href="/favorites/three">c</Typography>
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