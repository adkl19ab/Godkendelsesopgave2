import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const Add_edit_Profile = ({navigation,route}) => {

    const initialState = {
        Fornavn: '',
        Efternavn: '',
        Fødselsdato: '',
        Linje: ''
    }

    const [newProfile,setNewProfile] = useState(initialState);

    
    const isEditProfile = route.name === "Edit Profile";

    useEffect(() => {
        if(isEditProfile){
            const Profile = route.params.Profile[1];
            setNewProfile(Profile)
        }
        
        return () => {
            setNewProfile(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewProfile({...newProfile, [name]: event});
    }

    const handleSave = () => {

        const { Fornavn, Efternavn, Fødselsdato, Linje } = newProfile;

        if(Fornavn.length === 0 || Efternavn.length === 0 || Fødselsdato.length === 0 || Linje.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditProfile){
            const id = route.params.Profile[0];
            try {
                firebase
                    .database()
                    .ref(`/Profiles/${id}`)
                   
                    .update({ Fornavn, Efternavn, Fødselsdato, Linje });
                
                Alert.alert("Din info er nu opdateret");
                const Profile = [id,newProfile]
                navigation.navigate("Profile information",{Profile});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{

            try {
                firebase
                    .database()
                    .ref('/Profiles/')
                    .push({ Fornavn, Efternavn, Fødselsdato, Linje });
                Alert.alert(`Saved`);
                setNewProfile(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newProfile[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit Profile, vis save changes i stedet for add Profile*/}
                <Button title={ isEditProfile ? "Save changes" : "Add profile"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_edit_Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});
