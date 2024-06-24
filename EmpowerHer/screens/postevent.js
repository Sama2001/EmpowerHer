import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Ensure you have installed and imported DateTimePicker
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for vector icons

const EventFormModal = ({ onClose, onPictureSelection, onDateChange, authToken }) => {
  const [description, setDescription] = useState('');
  const [maxAttendance, setMaxAttendance] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [images, setImages] = useState([]);

  const handlePictureSelectionWrapper = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true, // Enable multiple selection if available
      });

      console.log('Image Picker Result:', result);

      if (!result.cancelled) {
        const selectedURIs = result.assets.map((asset) => asset.uri);
        setImages([...images, ...selectedURIs]);
        console.log('Selected Pictures:', selectedURIs);
        onPictureSelection(selectedURIs); // Pass selected URIs to parent function
      } else {
        console.log('Image selection cancelled or URI undefined.');
      }
    } catch (error) {
      console.error('Error selecting picture:', error);
    }
  };

  const handleDateChangeWrapper = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    //setShowDatePicker(false); // Hide date picker
    setDate(currentDate); // Update selected date
    onDateChange(currentDate); // Pass selected date to parent function
  };

  const postEventWrapper = async () => {
    try {
      const token = authToken; // Assuming authToken is stored or retrieved
      if (!token) {
        console.error('Error: authToken is not provided');
        return;
      }

      const isoDate = date.toISOString(); // Convert selected date to ISO format

      const maxAttendanceNumber = parseInt(maxAttendance);

      // Validate maxAttendance to ensure it's a number
      if (isNaN(maxAttendanceNumber)) {
        console.error('maxAttendance must be a number');
        return;
      }

      const formData = new FormData();
      formData.append('description', description);
      formData.append('maxAttendance', maxAttendanceNumber);
      formData.append('date', isoDate);
      images.forEach((uri, index) => {
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append('images', {
          uri,
          name: `images_${index}.${fileType}`,
          type: `image/${fileType}`,
        });
      });

      console.log('Sending images:', images);

      const response = await fetch('http://192.168.1.120:3000/events', {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Event added successfully:', data);
        Alert.alert('Added successfully');
        setDescription('');
        setMaxAttendance('');
        //onSubmit(data); // Pass response data to parent function
      } else {
        console.error('Failed to add event:', data.message);
        // Handle error (optional)
      }
    } catch (error) {
      console.error('Error adding event:', error);
      // Handle network or other errors (optional)
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true} // Always visible for this example
      onRequestClose={onClose}
    >

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>

        <View style={styles.eventFormContainer}>
        <Text style={styles.title}>Add Event</Text> 

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="rgba(0, 0, 0, 0.5)" // Adjust opacity of placeholder text

          />
          <TextInput
            style={styles.input}
            placeholder="Maximum Attendance"
            value={maxAttendance}
            onChangeText={setMaxAttendance}
            keyboardType="numeric"
            placeholderTextColor="rgba(0, 0, 0, 0.5)" // Adjust opacity of placeholder text

          />

            <TextInput
            style={styles.input}
            placeholder="Location"
             placeholderTextColor="rgba(0, 0, 0, 0.5)" // Adjust opacity of placeholder text

          />      

          <TouchableOpacity style={styles.selectDateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.selectDateButtonText}>Select Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="datetime"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChangeWrapper}
              textColor="black"
              style={[Platform.OS === 'android' ? styles.dateTimePickerAndroid : undefined]}
            />
          )}

          <TouchableOpacity style={styles.button1} onPress={handlePictureSelectionWrapper}>
            <Text style={styles.buttonText}>Choose Pictures</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={postEventWrapper}>
            <Text style={styles.buttonText1}>Add Event</Text>
          </TouchableOpacity>
        </View>

        
      </View>

      <View style={styles.closeButtonContainer1}>
        <TouchableOpacity onPress={onClose} style={styles.CloseButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

    </Modal>
  );
};

const styles = {
  eventFormContainer: {
    backgroundColor: 'hsla(0, 15%, 100%, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 4,
    borderRadius: 30,
    margin: 5,
    borderColor: '#a86556',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:400,
    height:850,
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 70,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'white',
    color: 'black', // Text color for input fields
    width:300,
  },
  selectDateButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  selectDateButtonText: {
    color: '#a86556',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateTimePickerAndroid: {
    color: 'black', // Text color for Android date picker
  },
  button: {
    backgroundColor: '#a86556',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width:200,
    marginTop: 100,
  },
  buttonText: {
    color: '#a86556',
    fontSize: 16,
  },
  buttonText1: {
    color: 'white',
    fontSize: 16,
    fontWeight:'bold',
  },
  button1: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButtonContainer1: {
    position: 'absolute',
    top:50,
    right:25,
  },
  CloseButton:{
    
    padding: 3,
    borderRadius:10,
    backgroundColor: 'rgba(187, 123, 107, 0.6)',

  },
};

export default EventFormModal;
