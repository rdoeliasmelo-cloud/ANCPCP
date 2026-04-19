import { Text, View } from "react-native";
import { db } from "@ancpcp/shared";
import { Screen } from "../src/components/screen";

export default function ExhibitorScreen() {
  return (
    <Screen title="Expositor">
      <View style={{ gap: 8 }}>
        {db.participants.map((participant) => (
          <View key={participant.id} style={{ backgroundColor: "white", borderRadius: 8, padding: 12 }}>
            <Text>Participación #{participant.entryNumber}</Text>
            <Text>Estado: {participant.status}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}
