import { Link } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { Screen } from "../src/components/screen";

export default function LoginScreen() {
  return (
    <Screen title="Ingreso ANCPCP">
      <View style={{ gap: 10 }}>
        <TextInput placeholder="correo" style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10 }} />
        <TextInput placeholder="contraseña" secureTextEntry style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10 }} />
        <Link href="/home" asChild>
          <Pressable style={{ backgroundColor: "#1d4ed8", borderRadius: 8, padding: 10 }}>
            <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>Ingresar</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}
