import { Text, View } from "react-native";
import { Screen } from "../src/components/screen";

export default function StaffScreen() {
  return (
    <Screen title="Staff pista">
      <View style={{ backgroundColor: "white", borderRadius: 8, padding: 12 }}>
        <Text>Check-in y control de orden de salida (MVP).</Text>
      </View>
    </Screen>
  );
}
