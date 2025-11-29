import {useState} from 'react';
import { StyleSheet,ImageBackground,SafeAreaView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useFonts} from 'expo-font';
import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOverScreen from './Screens/GameOverScreen';
import Colors from './constants/colors';
import AppLoading from 'expo-app-loading';

export default function App() {

  const [userNumber,setUserNumber] = useState('');
  const [gameIsOver,setGameIsOver] = useState(true);
  const [guessRounds,setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans' : require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Regular.ttf'),
  });

  if(! fontsLoaded){
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber)
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds){
    setGameIsOver(true)
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler(numberOfRounds){
     setUserNumber(null);
     setGuessRounds(0);
  }
  let screen = <StartGameScreen onPickNumber = {pickedNumberHandler}/>

  if(userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver = {gameOverHandler}/>
  }
  if(gameIsOver && userNumber){
    screen = (
    <GameOverScreen 
    userNumber={userNumber} 
    roundsNumber={guessRounds} 
    onStartNewGame={startNewGameHandler}/>
  );
  }

  

  return (
    <LinearGradient colors = {[Colors.primary700,Colors.accent500]} style = {styles.rootScreen}>
      <ImageBackground 
      source={require('./assets/images/background (1).png')} 
      resizeMode='cover' 
      style = {styles.rootScreen}
      imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style = {styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    rootScreen: {
      flex: 1
    },
    backgroundImage: {
      opacity: 0.15
    }
});
