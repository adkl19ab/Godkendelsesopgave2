
import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const ProfileDetails = ({route,navigation}) => {
    const [Profile,setProfile] = useState({});

    useEffect(() => {
        
        setProfile(route.params.Profile[1]);

        
        return () => {
            setProfile({})
        }
    });

    const handleEdit = () => {
        
        const Profile = route.params.Profile
        navigation.navigate('Edit Profile', { Profile });
    };

    
    const confirmDelete = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the profile?', [
                { text: 'Cancel', style: 'cancel' },
                
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Denne funtkion virker desværre ikke
    const  handleDelete = () => {
        const id = route.params.Profile[0];
        try {
            firebase
                .database()
                
                .ref(`/Profiles/${id}`)
                
                .remove();
            
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!Profile) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            {
                Object.entries(Profile).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores Profile keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores Profile values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default ProfileDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});
