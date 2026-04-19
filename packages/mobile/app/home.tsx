import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { db } from "@ancpcp/shared";
import { Screen } from "../src/components/screen";

export default function HomeScreen() {
  return (
    <Screen title="Eventos activos">
      <View style={{ gap: 8 }}>
        {db.events.map((event) => (
          <Text key={event.id} style={{ backgroundColor: "white", borderRadius: 8, padding: 12 }}>
            {event.name} · {event.venue}
          </Text>
        ))}
        <Link href="/categories" asChild>
          <Pressable style={{ backgroundColor: "#0f172a", borderRadius: 8, padding: 10 }}>
            <Text style={{ color: "white", textAlign: "center" }}>Ver categorías y rondas</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}
