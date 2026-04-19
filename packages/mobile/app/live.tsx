import { useMemo } from "react";
import { Text, View } from "react-native";
import { competitionService } from "@ancpcp/shared";
import { Screen } from "../src/components/screen";

export default function LiveScreen() {
  const rows = useMemo(() => competitionService.recalculate("rnd-2"), []);

  return (
    <Screen title="Leaderboard en vivo">
      <View style={{ gap: 8 }}>
        {rows.map((row) => (
          <View key={row.participantId} style={{ backgroundColor: "white", borderRadius: 8, padding: 12 }}>
            <Text>#{row.rank} {row.horseName}</Text>
            <Text>{row.exhibitorName}</Text>
            <Text style={{ fontWeight: "700" }}>{row.finalScore.toFixed(3)}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}
