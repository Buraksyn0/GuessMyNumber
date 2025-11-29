import {useState,useEffect} from 'react';
import {View,StyleSheet,Alert,Text,FlatList} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Title from '../Components/UI/Title'
import NumberContainer from '../Components/Game/NumberContainer';
import PrimaryButton from '../Components/UI/PrimaryButton';
import Card from '../Components/UI/Card';
import InstructionText from '../Components/UI/InstructionText';
import GuessLogItem from '../Components/Game/GuessLogItem';

let minBoundry = 1;
let maxBoundry = 100;

function GameScreen({userNumber,onGameOver}){

    const initialGuess = generateRandomBetween(1,100,userNumber);
    const [currentGuess,setCurrentGuess] = useState(initialGuess);
    const [guessRounds,setGuessRounds] = useState([initialGuess])

    useEffect(() => {
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length);
        }
    },[currentGuess,userNumber,onGameOver])

    useEffect(() => {
        minBoundry = 1;
        maxBoundry = 100;
    },[])

    function nextGuessHandler(direction){

        if((direction === "lower" && currentGuess < userNumber) || (direction === "greater" && currentGuess > userNumber)){
            Alert.alert("Don't lie","You know that is wrong...",[{text: "Sorry",style: ''}])
            return;
        }

        if(direction === "lower"){
            maxBoundry = currentGuess;
        }else{
            minBoundry = currentGuess + 1;
        }

        console.log(minBoundry,maxBoundry)
        const newRndNumber = generateRandomBetween(minBoundry,maxBoundry,currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds])
    }

    const guessRoundsListLength = guessRounds.length;

    

    function generateRandomBetween(min,max,exclude){
        const rndNum = Math.floor(Math.random() * (max - min)) + min;

        if (rndNum == exclude){
            return generateRandomBetween(min,max,exclude);
        } else{
            return rndNum
        }
    }
    return(
        <View style = {styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style = {styles.instructionText}>Higher or Lower</InstructionText>
            <View style = {styles.buttonsContainer}>
                <View style = {styles.buttonContainer}>
                    <PrimaryButton  onPress={nextGuessHandler.bind(this,"lower")}>
                        <Ionicons name="remove" size={24} color = "white"/>
                    </PrimaryButton>
                </View>
                <View style = {styles.buttonContainer}>
                    <PrimaryButton  onPress={nextGuessHandler.bind(this,"greater")}>
                        <Ionicons name="add" size={24} color="white"/>
                    </PrimaryButton>
                </View>
            </View>
            </Card>
            <View style = {styles.listContainer}>
                {/*{guessRounds.map(guessRound => <Text key = {guessRound}>{guessRound}</Text>)}*/}
                <FlatList 
                    data={guessRounds}
                    renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength-itemData.index} guess={itemData.item}/>}
                    keyExtractor={(item ) => item}
                />
            </View>
        </View>
    )
}
export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    instructionText:{
        marginBottom: 12
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
    
})