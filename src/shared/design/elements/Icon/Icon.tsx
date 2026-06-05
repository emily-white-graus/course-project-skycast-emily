import FontAwesome from "@expo/vector-icons/FontAwesome"
import { StyleSheet } from "react-native"

const icons = {
  add: "plus",
  close: "close",
  home: "home",
  favorites: "star",
  save: "save",
  settings: "gear",
} as const

type IconProps = {
  name: keyof typeof icons
} & Omit<React.ComponentProps<typeof FontAwesome>, "name">

const Icon: React.FC<IconProps> = ({ name, style, ...props }) => {
  return (
    <FontAwesome {...props} name={icons[name]} style={[styles.icon, style]} />
  )
}

export default Icon

const styles = StyleSheet.create({
  icon: {
    //
  },
})
