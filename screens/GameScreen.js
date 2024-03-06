import { Alert, StyleSheet, Text, View , FlatList} from 'react-native'
import React , { useEffect, useState } from 'react'
import Title from '../components/Title';
import ComputerNumber from '../components/ComputerNumber';
import CustomButton from '../components/CustomButton';
import { AntDesign } from '@expo/vector-icons';
import CopmuterGuess from '../components/CopmuterGuess';


let minNumber = 1;
let maxNumber = 100;

export default function GameScreen({userNamber ,onGameOver}) {

    const initialGuess = generateNumber(1,100,userNamber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessCount, setGuessCount] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === userNamber) {
            onGameOver(guessCount.length);
        }
    },[currentGuess,userNamber,onGameOver]);

    useEffect(() => {
        minNumber = 1;
        maxNumber = 100;
    },[]);


    function nextGuessHandler (direction) {

        if((direction === 'lower' && currentGuess < userNamber) 
            || 
            (direction === 'greater' && currentGuess > userNamber))
            {
                Alert.alert('Hadi Oradan !','Yanlış olduğunu bile bile basıyorsun ! ...',
                            [{text:'Tamam',style:'cancel'}])
                return;
            }


        if (direction === 'lower') {
            maxNumber = currentGuess;
        }
        else {
            minNumber = currentGuess + 1;
        }
        const newRandomNumber = generateNumber(minNumber,maxNumber,currentGuess);
        setCurrentGuess(newRandomNumber);
        setGuessCount((prevGuess) => [newRandomNumber,...prevGuess])
    }

    function generateNumber (min,max,exclude) {
        const randomNumber = Math.floor(Math.random()*(max-min)) + min

        if (randomNumber === exclude) {
            return randomNumber(min,max,exclude);
        }
        else {
            return randomNumber;
        }
    }
    return (
        <View style={styles.container}>
            <Title>Bilgisayar Tahmini</Title>
            <ComputerNumber>
                {currentGuess}
            </ComputerNumber>
            <View style={styles.card}>
                <Text style={styles.title}>Altında mı ? Üstünde mi ?</Text>
                <View style={styles.buttonsContainer}>
                    <CustomButton
                        onPress={nextGuessHandler.bind(this,'lower')}
                    >
                        <AntDesign name="minus" size={24} color="white" />
                    </CustomButton>
                    <CustomButton
                        onPress={nextGuessHandler.bind(this,'greater')}
                    >
                        <AntDesign name="plus" size={24} color="white" />
                    </CustomButton>
                </View>
            </View>
            <View style={styles.listContainer}>
                <FlatList 
                    data={guessCount}
                    keyExtractor={(itemData) => itemData}
                    renderItem={(itemData) => (
                        <CopmuterGuess 
                            roundNumber={guessCount.length - itemData.index}
                            guess={itemData.item}
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        marginTop: 25,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    card: {
        backgroundColor: 'orange',
        padding: 16,
        marginTop: 20,
        borderRadius: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width:0 , height:2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20,
    },
    listContainer: {
        flex: 1,
        marginTop: 10,
    },
});