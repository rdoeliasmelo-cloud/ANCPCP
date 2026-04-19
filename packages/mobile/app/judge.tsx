import { Text, View } from "react-native";
import { Screen } from "../src/components/screen";

export default function JudgeScreen() {
  return (
    <Screen title="Juez - puntuación rápida">
      <View style={{ backgroundColor: "white", borderRadius: 8, padding: 12 }}>
        <Text>Ingreso rápido de puntajes por participante (MVP).</Text>
      </View>
    </Screen>
  );
}
