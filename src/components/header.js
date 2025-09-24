import React from 'react';
import { View, Text, Button } from 'react-native';


export default function Header({ minesLeft = 0, onRestart = () => {}, win = false, gameOver = false }) {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10, // margem ao redor do cabeçalho
      gap: 10 // espaçamento entre os itens
    }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 16 }}>Campo Minado</Text>
      <Text style={{ fontSize: 16, marginRight: 16 }}>Minas: {minesLeft}</Text>
      <Button title="Reiniciar" onPress={onRestart} disabled={!(win || gameOver)} />
    </View>
  );
}