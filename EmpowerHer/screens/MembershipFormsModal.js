import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Modal, ScrollView } from 'react-native';
import { Manager as styles } from '../styles/ManagerStyles'; // Import styles from the separated file
import ProjectPicturesModal from '../screens/ProjectPicturesModal';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for vector icons

const MembershipFormsModal = ({ visible, onClose, membershipData, handleApprove, handleReject }) => {
    const [showPicturesModal, setShowPicturesModal] = useState(false); // State for showing/hiding pictures modal
  const [selectedPictures, setSelectedPictures] = useState([]); // State for selected pictures
  const openPicturesModal = (pictures) => {
    setSelectedPictures(pictures);
    setShowPicturesModal(true);
  };

  const closePicturesModal = () => {
    setShowPicturesModal(false);
    setSelectedPictures([]);
  };
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center',margin: 10 }}>
        <View style={styles.modalMemberContainer}>
          {membershipData.length === 0 ? (
            <Text>All forms are reviewed</Text>
          ) : (
            membershipData.map((form, index) => (
              <View key={index} style={styles.MemeberformContainer}>
                <Text style={styles.formTitle}>Form {index + 1}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.title, styles.text]}>Full Name:</Text>
                  <Text style={styles.text}>{form.fullName}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.title, styles.text]}>Address: </Text>
                  <Text style={styles.text}>{form.address}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.title, styles.text]}>Email Address: </Text>
                  <Text style={styles.text}>{form.email}{form.emailAddress}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.title, styles.text]}>Mobile: </Text>
                  <Text style={styles.text}>{form.mobile}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.title, styles.text]}>Education: </Text>
                  <Text style={styles.text}>{form.education}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.title, styles.text]}>Age: </Text>
                  <Text style={styles.text}>{form.age}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.title, styles.text]}>Social media link:</Text>
                  <Text style={styles.link} onPress={() => Linking.openURL(form.socialMediaLink)}>
                    {form.socialMediaLink}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.title, styles.text]}>Project location: </Text>
                  <Text style={styles.text}>{form.projectLocation}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.title, styles.text]}>Project sector: </Text>
                  <Text style={styles.text}>{form.projectSector}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.title, styles.text]}>Project summary: </Text>
                  <Text style={styles.text}>{form.projectSummary}</Text>
                </View>
                <TouchableOpacity style={styles.Picbutton} onPress={() => openPicturesModal(form.projectPictures)}>
                    <Text style={styles.buttonText}>View Pictures</Text>
                  </TouchableOpacity>
                <View style={styles.buttonContainer}>
                
                  <TouchableOpacity style={styles.Approve1} onPress={() => handleApprove(form)}>
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.Reject1} onPress={() => handleReject(form)}>
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
          {/*<TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity> */}
          
          <View style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={onClose} style={styles.Closebutton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
        </View>


        {showPicturesModal && (
          <ProjectPicturesModal projectPictures={selectedPictures} onClose={closePicturesModal} />
        )}

      </ScrollView>
    </Modal>
  );
};

export default MembershipFormsModal;
