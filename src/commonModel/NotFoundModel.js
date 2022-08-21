import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import Lottie from 'lottie-react-native';
import React, { useState } from 'react';

const NotFoundModel = ({modelOpen, onRequestClose}) => {
  // const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modelOpen}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Lottie
            style={{ height: 200 }}
            source={require('../../assets/animation/notfound.json')}
            autoPlay
            loop
          />
          <Text style={styles.modalText}>404 not found !</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onRequestClose}
          >
            <Text style={styles.textStyle}>Back</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#eeeeee',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 200,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
});

export default NotFoundModel;
