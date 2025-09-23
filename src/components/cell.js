import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { openCell, toggleFlag } from '../logic/gamelogic';

export default function Cell({ cell, row, col, setBoard, gameOver, win }) {
  // Função para abrir célula
  const handleOpen = () => {
    if (!gameOver && !win) {
      setBoard(prev => openCell(prev, row, col));
    }
  };
  // Função para marcar/desmarcar célula
  const handleFlag = () => {
    if (!gameOver && !win) {
      setBoard(prev => toggleFlag(prev, row, col));
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: 30,
        height: 30,
        borderWidth: 1,
        backgroundColor: cell.opened ? (cell.exploded ? '#f88' : '#eee') : '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={handleOpen}
      onLongPress={handleFlag}
      disabled={cell.opened || gameOver || win}
    >
      <Text>
        {cell.opened
          ? cell.mined
            ? '💣'
            : cell.nearMines > 0
            ? cell.nearMines
            : ''
          : cell.flagged
          ? '🚩'
          : ''}
      </Text>
    </TouchableOpacity>
  );
}