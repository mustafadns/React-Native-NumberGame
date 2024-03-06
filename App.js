import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ImageBackground} from 'react-native';
import GameStartScreen from './screens/GameStartScreen';
import { LinearGradient } from 'expo-linear-gradient';
import React , { useState }from 'react';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNamber, setUserNamber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessCount, setGuessCount] = useState(0);

  function sendedNumberHandler (sendedNumber) {
    setUserNamber(sendedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler (numberofGuess) {
    setGameIsOver(true);
    setGuessCount(numberofGuess);
  }

  function startNewGameHandler () {
    setUserNamber(null);
    setGuessCount(0);
  }

  let screen = <GameStartScreen  onSendNumber={sendedNumberHandler}/>;

  if (userNamber) {
    screen = (
      <GameScreen userNamber={userNamber} onGameOver={gameOverHandler}/>
    )
  }

  if(gameIsOver && userNamber) {
    screen = <GameOverScreen 
                roundsNumber={guessCount} 
                userNumber={userNamber}
                onStartNewGame={startNewGameHandler}
              />
  }

  return (
    <LinearGradient 
      style={styles.container}
      colors={['rgba(0,0,0,0.8)','transparent']}
    >
      <ImageBackground 
        source={require('./assets/back.jpg')}
        style={styles.container}
        imageStyle={styles.backImage}
      >
        {screen}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImage: {
    opacity: 0.5,
  }
});
