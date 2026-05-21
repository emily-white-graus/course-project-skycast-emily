import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

import Card from "./Card"
import { type ForecastData, type Location, fetchForecast } from "./weatherApi"

const Forecast: React.FC<{
  location: Location
}> = ({ location }) => {
  const [data, setData] = useState<ForecastData>()

  useEffect(() => {
    void (async () => {
      setData(await fetchForecast(location))
    })()
  }, [location])

  return (
    <Card>
      <ScrollView horizontal style={styles.days}>
        {data?.map(({ day, temperatureMax, temperatureMin, condition }) => (
          <View key={day} style={styles.day}>
            <Text style={styles.temperatureMax}>{temperatureMax} C</Text>
            <Text style={styles.temperatureMin}>{temperatureMin} C</Text>
            <Text style={styles.condition}>{condition}</Text>
          </View>
        ))}
      </ScrollView>
    </Card>
  )
}

export default Forecast

const styles = StyleSheet.create({
  temperatureMax: { fontSize: 18 },
  temperatureMin: { fontSize: 14, color: "#888" },
  condition: { fontWeight: "bold" },
  days: { flexGrow: 0, flexDirection: "row" },
  day: { flex: 1, alignItems: "center", marginHorizontal: 16 },
})
