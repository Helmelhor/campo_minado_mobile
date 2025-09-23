import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Header({ minesLeft = 0, onRestart = () => {}, win = false, gameOver = false }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 8 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Campo Minado</Text>
      <Text style={{ fontSize: 16 }}>Minas: {minesLeft}</Text>
      <Button title="Reiniciar" onPress={onRestart} disabled={!(win || gameOver)} />
    </View>
  );
}