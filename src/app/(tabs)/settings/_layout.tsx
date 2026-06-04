import { Drawer } from "expo-router/drawer"

const Layout: React.FC = () => {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Settings" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
      <Drawer.Screen name="flat-list" options={{ title: "Flat List" }} />
      <Drawer.Screen name="section-list" options={{ title: "Section List" }} />
    </Drawer>
  )
}

export default Layout
