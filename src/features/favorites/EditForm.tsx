import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import TextField from "#design/elements/fields/Text"
import FormGroup from "#design/elements/FormGroup"
import Icon from "#design/elements/Icon"
import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

import { useFavoriteMutations } from "./useFavorites"

type FavoriteEditFormProps = {
  visible: boolean
  favoriteId?: string
  onClose: () => void
  onSave?: () => void
}

export const FavoriteEditForm: React.FC<FavoriteEditFormProps> = ({
  visible,
  favoriteId,
  onClose,
  onSave,
}) => {
  const router = useRouter()
  const [favorite, saveFavorite] = useFavoriteMutations(favoriteId)
  const [name, setName] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")

  useEffect(() => {
    if (!visible) return

    setName(favorite?.name ?? "")
    setLatitude(favorite?.latitude.toString() ?? "")
    setLongitude(favorite?.longitude.toString() ?? "")
  }, [favorite, visible])

  const handleSave = async () => {
    const parsedLatitude = Number.parseFloat(latitude)
    const parsedLongitude = Number.parseFloat(longitude)

    if (
      name.trim().length === 0 ||
      Number.isNaN(parsedLatitude) ||
      Number.isNaN(parsedLongitude)
    ) {
      return
    }

    await saveFavorite({
      name: name.trim(),
      latitude: parsedLatitude,
      longitude: parsedLongitude,
    })

    onClose()
    onSave?.()
    router.replace(favoriteId ? `/favorites/${favoriteId}` : "/favorites")
  }

  if (!visible) return null

  return (
    <View style={styles.sheet}>
      <Pressable
        accessibilityRole="button"
        onPress={onClose}
        style={styles.close}
      >
        <Icon name="close" size={24} color={colors.background} />
      </Pressable>

      <Typography variant="title">
        {favoriteId ? "Edit Favorite" : "New Favorite"}
      </Typography>

      <View style={styles.form}>
        <FormGroup label="Name">
          <TextField onChange={setName} value={name} />
        </FormGroup>
        <FormGroup label="Latitude">
          <TextField
            keyboardType="numbers-and-punctuation"
            onChange={setLatitude}
            value={latitude}
          />
        </FormGroup>
        <FormGroup label="Longitude">
          <TextField
            keyboardType="numbers-and-punctuation"
            onChange={setLongitude}
            value={longitude}
          />
        </FormGroup>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => void handleSave()}
        style={styles.save}
      >
        <Icon name="save" size={20} color={colors.background} />
        <Typography style={styles.saveText}>Save</Typography>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    gap: spacing.between,
    padding: spacing.inside,
    borderTopWidth: 1,
    borderTopColor: colors.brand,
    backgroundColor: colors.background,
  },
  close: {
    position: "absolute",
    top: spacing.between,
    right: spacing.between,
    zIndex: 1,
    padding: 12,
    borderRadius: 24,
    backgroundColor: colors.brand,
  },
  form: {
    width: "100%",
  },
  save: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 14,
    borderRadius: 28,
    backgroundColor: colors.brand,
  },
  saveText: {
    color: colors.background,
    fontWeight: "700",
  },
})
