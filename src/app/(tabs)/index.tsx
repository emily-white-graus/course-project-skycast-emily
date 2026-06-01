import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { useSettings } from "#shared/settings"
import { CurrentWeather, Forecast, useCurrentLocation } from "#shared/weather"

const App: React.FC = () => {
  const location = useCurrentLocation()
  const settings = useSettings()

  return (
    <>
      <View style={styles.container}>
        <Typography variant="title">{settings.home.name}</Typography>

        {location ? (
          <>
            <CurrentWeather location={location} />
            <Forecast location={location} />
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}

        <Typography href="/temp">Go to Temporary</Typography>
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
})
