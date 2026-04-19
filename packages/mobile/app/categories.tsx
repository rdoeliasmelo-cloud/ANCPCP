import { Link } from "expo-router";
import { Text, View } from "react-native";
import { db } from "@ancpcp/shared";
import { Screen } from "../src/components/screen";

export default function CategoriesScreen() {
  return (
    <Screen title="Categorías y rondas">
      <View style={{ gap: 10 }}>
        {db.categories.map((category) => (
          <View key={category.id} style={{ backgroundColor: "white", borderRadius: 8, padding: 12 }}>
            <Text style={{ fontWeight: "700" }}>{category.name}</Text>
            {db.rounds
              .filter((round) => round.categoryId === category.id)
              .map((round) => (
                <Text key={round.id}>• {round.name} ({round.status})</Text>
              ))}
          </View>
        ))}
        <Link href="/judge">Pantalla juez</Link>
        <Link href="/staff">Pantalla staff</Link>
        <Link href="/exhibitor">Pantalla expositor</Link>
        <Link href="/live">Leaderboard público</Link>
      </View>
    </Screen>
  );
}
