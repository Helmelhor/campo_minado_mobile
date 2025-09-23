import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import Board from '../components/board';
import Header from '../components/header';
import { createBoard, checkWin, checkLose } from '../logic/gamelogic';

const ROWS = 10;
const COLS = 10;
const MINES = 15;

export default function GameScreen() {
  const [board, setBoard] = useState(() => createBoard(ROWS, COLS, MINES));
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [minesLeft, setMinesLeft] = useState(MINES);

  useEffect(() => {
    setWin(checkWin(board, MINES));
    setGameOver(checkLose(board));
    // Atualiza contador de minas
    let flags = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c].flagged) flags++;
      }
    }
    setMinesLeft(MINES - flags);
  }, [board]);

  const handleRestart = () => {
    setBoard(createBoard(ROWS, COLS, MINES));
    setWin(false);
    setGameOver(false);
    setMinesLeft(MINES);
  };

  useEffect(() => {
    if (win) Alert.alert('Parabéns!', 'Você venceu!', [{ text: 'OK' }]);
    if (gameOver) Alert.alert('Game Over', 'Você perdeu!', [{ text: 'OK' }]);
  }, [win, gameOver]);

  return (
    <View>
      <Header minesLeft={minesLeft} onRestart={handleRestart} win={win} gameOver={gameOver} />
      <Board board={board} setBoard={setBoard} gameOver={gameOver} win={win} />
      <Text style={{textAlign: 'center', margin: 8}}>
        {win ? 'Você venceu!' : gameOver ? 'Você perdeu!' : ''}
      </Text>
    </View>
  );
}