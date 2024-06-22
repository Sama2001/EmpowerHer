import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button,Linking,ScrollView } from 'react-native';
import { Manager as styles } from '../styles/ManagerStyles'; // Import styles from the separated file
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for vector icons

const OpportunitiesModal = ({ visible, onClose, opportunitiesData, handleApproveOpp, handleRejectOpp }) => {

   
    const openPDF = (pdfUrl) => {
        Linking.openURL(pdfUrl);
      };
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
            <Text style={styles.oppTitle}>Opportunities</Text>
              <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center',margin: 10 }}>

      <View style={styles.modalMemberContainer}>
        
        { opportunitiesData.length === 0 && (
          <Text>All forms are reviewed</Text>
        )}
        {opportunitiesData.length > 0 && (
          opportunitiesData.map((opportunity, index) => (
            <View key={index} style={styles.opportunityContainer}>
              <Text style={styles.opportunityTitle}>Opportunity {index + 1}</Text>
              <Text>Name: {opportunity.fullName}</Text>
              <Text>Address: {opportunity.address}</Text>
              <Text>Skills: {opportunity.skills}</Text>

              {/* Render PDF files */}
              {opportunity.cv && opportunity.cv.map((pdfFile, pdfIndex) => (
                <Button
                  key={pdfIndex}
                  title={`View PDF ${pdfIndex + 1}`}
                  onPress={() => {
                    const pdfUrl = `http://192.168.1.120:3000/${pdfFile.replace(/\\/g, '/')}`;
                    openPDF(pdfUrl);
                  }}
                />
              ))}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.Approve} onPress={() => handleApproveOpp(opportunity)}>
                  <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Reject} onPress={() => handleRejectOpp(opportunity)}>
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
        {/* <TouchableOpacity onPress={onClose} style={styles.button}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>*/}


      </View>
      </ScrollView>
      <View style={styles.closeButtonContainer1}>
        <TouchableOpacity onPress={onClose} style={styles.CloseButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default OpportunitiesModal;
