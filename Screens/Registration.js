import React from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView, Modal, ToastAndroid} from 'react-native';
import * as firebase from 'firebase'
import db from '../config'

export default class Registration extends React.Component{
    constructor(){
        super()
        this.state={
            firstname: "",
            lastname: "",
            contact: "",
            address: "",
            username: "",
            password: "",
            confirmpassword: "",
            isVisible: true     
        }
    }
    userSignUp = (username, password, confirmpassword) => {
        if(password != confirmpassword){
            return Alert.alert("Password Doesn't Match\nCheck Your Password.")
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(username, password)
            .then((response)=>{
                db.collection("users").add({
                    first_name: this.state.firstname,
                    last_name: this.state.lastname,
                    mobile_number: this.state.contact,
                    address: this.state.address,
                    username: this.state.username,
              })
              return Alert.alert("User Added Successfully!"
              [{text: 'OK', onPress:()=>this.setState({isVisible: false})}])
            })
            .catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message
                return Alert.alert(errorMessage)
            })
        }
    }
    showModal = () => {
        <Modal
        animationType = "fade"
        transparent = {true}
        visible = { this.state.isVisible}>
        </Modal>
    }
    render(){
        return(
            <KeyboardAvoidingView style = {{alignItems:'center',marginTop:20}}>
            ({this.showModal()})
            <View>
                <Text>Registration</Text>
                <TextInput
                onChangeText = {(text)=>{this.setState({firstname: text})}}
                placeholder = "First Name"/>

                <TextInput
                onChangeText = {(text)=>{this.setState({lastname: text})}}
                placeholder = "Last Name"/>

                <TextInput
                onChangeText = {(text)=>{this.setState({contact: text})}}
                placeholder = "Contact No."
                maxLength = {10}
                keyboardType = {"numeric"}/>
                
                <TextInput
                onChangeText = {(text)=>{this.setState({address: text})}}
                placeholder = "Address"
                multiline = {true}/>
                
                <TextInput
                onChangeText = {(text)=>{this.setState({username: text})}}
                placeholder = "abc@example.com"
                keyboardType = {"email-address"}/>

                <TextInput
                onChangeText = {(text)=>{this.setState({password: text})}}
                placeholder = "Password"
                secureTextEntry = {true}/>

                <TextInput
                onChangeText = {(text)=>{this.setState({confirmpassword: text})}}
                placeholder = "Confirm Password"
                secureTextEntry = {true}/>

                <TouchableOpacity style = {styles.button}><Text>Register</Text></TouchableOpacity>
                <TouchableOpacity style = {styles.button}><Text>Cancel</Text></TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    button:{
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    }
  })