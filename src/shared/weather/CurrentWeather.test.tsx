import { render } from "@testing-library/react-native"

import { CurrentWeather } from "./CurrentWeather"

describe("Weather > CurrentWeather", () => {
  beforeEach(() => {
    jest.spyOn(globalThis, "fetch").mockResolvedValue({
      json: async () => ({
        current: {
          weather_code: 0,
          temperature_2m: 20,
          wind_speed_10m: 12,
          relative_humidity_2m: 60,
          uv_index: 3,
        },
      }),
    } as Response)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("works", async () => {
    const { findByText } = render(
      <CurrentWeather
        location={{
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        }}
      />,
    )

    expect(await findByText("Barcelona")).toBeTruthy()
    expect(await findByText("Clear")).toBeTruthy()
  })
})
