import { Tabs } from "expo-router"

const ParentTabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="home" />
        <Tabs.Screen name="list" />
    </Tabs>
  )
}

export default ParentTabsLayout