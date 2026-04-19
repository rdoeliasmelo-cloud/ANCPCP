import { ReactNode } from "react";
import { SafeAreaView, Text, View } from "react-native";

export function Screen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 12 }}>{title}</Text>
        {children}
      </View>
    </SafeAreaView>
  );
}
