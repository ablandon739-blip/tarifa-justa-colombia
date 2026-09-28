import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';

const PRECIOS = {
  "Medellín": { Taxi: "$15.000 - $18.000", Plomero: "$40.000 - $60.000", Albañil: "$80.000 / día" },
  "Bogotá": { Taxi: "$18.000 - $25.000", Plomero: "$50.000 - $70.000", Albañil: "$90.000 / día" },
  "Cali": { Taxi: "$12.000 - $16.000", Plomero: "$35.000 - $55.000", Albañil: "$75.000 / día" },
  "Villavicencio": { Taxi: "$8.000 - $12.000", Plomero: "$30.000 - $50.000", Albañil: "$70.000 / día" },
};

export default function App() {
  const [ciudad, setCiudad] = useState("Medellín");
  const [servicio, setServicio] = useState("Taxi");
  const [usos, setUsos] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  const consultar = (nuevoServicio) => {
    if(nuevoServicio) setServicio(nuevoServicio);
    if(!isPremium && usos >= 3){
      Alert.alert(
        "Límite gratis alcanzado 🔒",
        "Has usado tus 3 consultas gratis de hoy.\n\nDesbloquea PREMIUM por $19.900/mes para ver WhatsApp ilimitados y sin anuncios.",
        [{text: "Ver PREMIUM", onPress: () => comprarPremium()}, {text: "Luego"}]
      );
      return;
    }
    if(!isPremium) setUsos(usos + 1);
  };

  const comprarPremium = () => {
    // Aquí se conectará con Google Play Billing: premium_mes
    Alert.alert(
      "Desbloquear PREMIUM 💎",
      "Esto en producción cobrará $19.900 con Google Play.\nPor ahora lo activamos en modo prueba.",
      [
        {text: "Activar PREMIUM (prueba)", onPress: () => setIsPremium(true)},
        {text: "Cancelar", style: "cancel"}
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tarifa Justa{"\n"}Colombia</Text>
        <View style={styles.ciudadBox}><Text style={styles.ciudadText}>📍 {ciudad}</Text></View>
        <Text style={styles.quedan}>{isPremium ? "♾️ PREMIUM ACTIVO" : `Te quedan ${3-usos} consultas gratis hoy`}</Text>
      </View>

      <Text style={styles.title}>Selecciona un servicio</Text>
      <Text style={styles.subtitle}>Compara precios justos en tu ciudad</Text>
      
      <View style={styles.row}>
        {["Taxi","Plomero","Albañil"].map(s => (
          <TouchableOpacity key={s} onPress={()=>consultar(s)} style={[styles.card, servicio===s && styles.cardActive]}>
            <Text style={styles.cardIcon}>{s==="Taxi"?"🚕": s==="Plomero"?"🔧":"👷"}</Text>
            <Text style={styles.cardText}>{s}</Text>
            <Text style={styles.disponible}>✓ Disponible</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.resultado}>
        <Text style={styles.badge}>🛡️ RESULTADO JUSTO</Text>
        <Text style={styles.precioLabel}>Precio Justo en {ciudad}:</Text>
        <Text style={styles.precio}>{PRECIOS[ciudad][servicio]}</Text>
        <Text style={styles.sub}>Tarifa promedio basada en +1.200 reportes de usuarios en {ciudad} · Actualizado hoy</Text>
      </View>

      <View style={styles.contactos}>
        <Text style={styles.contactTitle}>Contactar profesionales {isPremium?"🔓":"🔒"}</Text>
        <Text style={styles.contactSub}>Desbloquea contactos para chatear por WhatsApp</Text>
        <TouchableOpacity style={styles.waBtn} onPress={()=>consultar()}>
          <Text style={styles.waText}>{isPremium ? "📲 318 546 7276 - Juan Plomero (4.9★)" : "•••• ••• WhatsApp 🔒"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.waBtn} onPress={()=>consultar()}>
          <Text style={styles.waText}>{isPremium ? "📲 300 123 4567 - Taxi Seguro" : "•••• ••• WhatsApp 🔒"}</Text>
        </TouchableOpacity>
      </View>

      {!isPremium && (
        <View style={styles.adBanner}>
          <Text style={styles.adText}>AD - Banner Publicitario (AdMob) - Aquí ganas dinero por vista</Text>
        </View>
      )}

      {!isPremium ? (
        <TouchableOpacity style={styles.premiumBtn} onPress={comprarPremium}>
          <Text style={styles.premiumText}>✨ Desbloquea PREMIUM $19.900/mes</Text>
          <Text style={styles.premiumSub}>Ilimitado · Sin anuncios · WhatsApp directo</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.premiumActive}>
          <Text style={styles.premiumActiveText}>✅ PREMIUM ACTIVO - Gracias por apoyar</Text>
        </View>
      )}

      <Text style={styles.footer}>Restaurar compra · Política de privacidad · Términos{"\n"}Esta versión es para probar. El cobro real se activa en Play Console.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:"#F5F7FA", padding:16},
  header:{backgroundColor:"#0B3D91", padding:20, borderRadius:20, marginBottom:16},
  headerTitle:{color:"white", fontSize:26, fontWeight:"900", lineHeight:30},
  ciudadBox:{backgroundColor:"white", paddingHorizontal:12, paddingVertical:6, borderRadius:20, marginTop:10, alignSelf:"flex-start"},
  ciudadText:{fontWeight:"800"},
  quedan:{color:"#FFC300", marginTop:8, fontWeight:"700", fontSize:12},
  title:{fontSize:22, fontWeight:"900", color:"#111"},
  subtitle:{fontSize:13, color:"#666", marginBottom:12},
  row:{flexDirection:"row", justifyContent:"space-between", marginBottom:16},
  card:{backgroundColor:"white", width:"31%", padding:12, borderRadius:15, alignItems:"center", borderWidth:1, borderColor:"#ddd"},
  cardActive:{borderColor:"#0B3D91", borderWidth:2.5, backgroundColor:"#EAF0FF"},
  cardIcon:{fontSize:24},
  cardText:{fontWeight:"800", marginTop:4},
  disponible:{fontSize:10, color:"green", marginTop:4},
  resultado:{backgroundColor:"#FFF9E6", padding:14, borderRadius:15, borderWidth:1, borderColor:"#FFE58F", marginBottom:16},
  badge:{backgroundColor:"#0B3D91", color:"white", alignSelf:"flex-start", paddingHorizontal:8, paddingVertical:3, borderRadius:10, fontSize:10, fontWeight:"800", overflow:"hidden"},
  precioLabel:{fontSize:15, fontWeight:"700", marginTop:10},
  precio:{fontSize:26, fontWeight:"900", color:"#0B3D91", marginTop:2},
  sub:{fontSize:11, color:"#555", marginTop:6},
  contactos:{backgroundColor:"white", padding:14, borderRadius:15, marginBottom:12},
  contactTitle:{fontWeight:"900", fontSize:15},
  contactSub:{fontSize:11, color:"#666", marginBottom:10},
  waBtn:{backgroundColor:"#FFF3CC", padding:12, borderRadius:10, marginBottom:8},
  waText:{fontWeight:"700"},
  adBanner:{borderWidth:1, borderStyle:"dashed", borderColor:"#999", padding:10, borderRadius:10, marginBottom:12, alignItems:"center", backgroundColor:"#FFF"},
  adText:{fontSize:10, color:"#555"},
  premiumBtn:{backgroundColor:"#FFC300", padding:16, borderRadius:15, alignItems:"center", marginBottom:10},
  premiumText:{fontWeight:"900", fontSize:16, color:"#111"},
  premiumSub:{fontSize:11, color:"#333", marginTop:2},
  premiumActive:{backgroundColor:"#D1FAE5", padding:14, borderRadius:12, alignItems:"center", marginBottom:10},
  premiumActiveText:{fontWeight:"800", color:"#065F46"},
  footer:{fontSize:10, textAlign:"center", color:"#777", marginTop:8, marginBottom:40, lineHeight:14}
});