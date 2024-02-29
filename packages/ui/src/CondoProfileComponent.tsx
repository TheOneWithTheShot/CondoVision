import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

// Dummy data for the condo
const condoData = {
  images: [
    require('../../../public/logoWhiteBG.png'), // Adjust the path as necessary
    require('../../../public/logoBright.png'), // Adjust the path as necessary
  ],
  address: '123 Condo Lane, Condo City, CC 12345',
  unitCount: 20,
  unitOwner: 'John Doe',
  parkingCount: 12,
  financialRate: '5.5%',
  fee: '$300/month',
  lockerCount: 10,
  generalInfo: 'This condo offers great views, modern amenities, and is conveniently located near downtown.',
  id: '12345',
};


export const CondoProfileComponent = ({ data = condoData }) => {
  const [expanded, setExpanded] = useState(false); // State to toggle expanded/collapsed view

  const city = data.address.split(',')[1].trim();

  return (

    <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.container}>
      <View>
        {!expanded && (
          <View>
            <Image source={data.images[0]} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>{data.fee}</Text>
              <Text style={styles.infoText}>{city}</Text>
            </View>
          </View>
        )}
      </View>
      {expanded && (
        <ScrollView style={styles.expandedScrollView}>

          <View style={styles.imageContainer}>
            {data.images.map((image, index) => (
              <Image key={index} source={image} style={styles.imageExpanded} />
            ))}
          </View>
          <Text style={styles.header}>Condo Details</Text>
          <View style={styles.detailSection}>
            <Text style={styles.infoTitle}>Address:</Text>
            <Text style={styles.infoText}>{data.address}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.infoTitle}>Property ID:</Text>
            <Text style={styles.infoText}>{data.id}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.infoTitle}>Unit Count:</Text>
            <Text style={styles.infoText}>{data.unitCount}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.infoTitle}>Parking Count:</Text>
            <Text style={styles.infoText}>{data.parkingCount}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.infoTitle}>Locker Count:</Text>
            <Text style={styles.infoText}>{data.lockerCount}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.infoTitle}>General Info:</Text>
            <Text style={styles.infoText}>{data.generalInfo}</Text>
          </View>
          <TouchableOpacity onPress={() => console.log('PDF Upload')} style={styles.uploadButton}>
            <Text style={styles.buttonText}>Upload PDF</Text>
          </TouchableOpacity>

        </ScrollView>
      )}
    </TouchableOpacity>
  );
};

const textSize = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  collapsedContainer: {
    height: 100,
  },
  expandedContainer: {
    height: 'auto',
  },
  expandedScrollView: {
    paddingBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  imageExpanded: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2f80ed',
    textAlign: 'center',
    marginVertical: 10,
  },
  expandedHeader: {
    fontSize: 22,
  },
  detailSection: {
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  infoTitle: {
    fontSize: textSize,
    fontWeight: '600',
    color: '#333',
  },
  infoText: {
    fontSize: textSize,
    color: '#666',
    marginLeft: 10,
    fontFamily: 'System',
  },
  uploadButton: {
    backgroundColor: '#2074df',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: textSize,
    fontWeight: '500',
  },
  infoContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,

  },
});

export default CondoProfileComponent;
