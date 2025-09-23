import React from 'react';
import { View } from 'react-native';
import Cell from './cell';

export default function Board({ board, setBoard, gameOver, win }) {
  return (
    <View>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row' }}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              cell={cell}
              row={rowIndex}
              col={colIndex}
              setBoard={setBoard}
              gameOver={gameOver}
              win={win}
            />
          ))}
        </View>
      ))}
    </View>
  );
}