
import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const ProfileList = ({navigation}) => {

    const [Profiles,setProfiles] = useState()

    useEffect(() => {
        if(!Profiles) {
            firebase
                .database()
                .ref('/Profiles')
                .on('value', snapshot => {
                        setProfiles(snapshot.val())
                });
        }
    },[]);

    // Vi viser ingenting hvis der ikke er data
    if (!Profiles) {
        return <Text>Loading...</Text>;
    }

   const handleselectProfile = id => {
        
        const Profile = Object.entries(Profiles).find( Profile => Profile[0] === id /*id*/)
        navigation.navigate('Profile information', { Profile });
    };

    
    const profileArray = Object.values(Profiles);
    const profileKeys = Object.keys(Profiles);

    return (
        <FlatList
            data={profileArray}
            // Vi bruger profileKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til ProfileListItem
            keyExtractor={(item, index) => profileKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleselectProfile(profileKeys[index])}>
                        <Text>
                            {item.Fornavn} {item.Efternavn}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default ProfileList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});
