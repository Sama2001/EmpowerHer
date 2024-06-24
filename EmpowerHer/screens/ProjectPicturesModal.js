import React, { useState} from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ProjectPicturesModal = ({ projectPictures, onClose }) => {
    console.log('ProjectPicturesModal - projectPictures:', projectPictures);
  
    return (
      <Modal visible={true} animationType="slide" transparent={false}>
        <View style={styles.container}>
          <ScrollView vertical pagingEnabled>
            {projectPictures.map((picture, picIndex) => (
              <Image
                key={picIndex}
                source={{ uri: `http://192.168.1.120:3000/${picture.replace(/\\/g, '/')}` }}
                style={styles.image}
                onError={(error) => console.error('Error loading image:', error)}
              />
            ))}
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    marginTop:70,
    marginLeft:82,
    width: 250,
    height: 200,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export default ProjectPicturesModal;
