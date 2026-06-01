import { render } from "@testing-library/react-native"

import { Forecast } from "./Forecast"

describe("Weather > Forecast", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: async () => ({
        daily: {
          time: ["2026-06-01"],
          temperature_2m_max: [24.5],
          temperature_2m_min: [15.2],
          weather_code: [0],
        },
      }),
    } as Response)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("works", async () => {
    const { findByText } = render(
      <Forecast
        location={{
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        }}
      />,
    )

    expect(await findByText("24.5 C")).toBeTruthy()
    expect(await findByText("Clear")).toBeTruthy()
  })
})
