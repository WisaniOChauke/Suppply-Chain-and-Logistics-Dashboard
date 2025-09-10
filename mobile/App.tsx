import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

function DashboardScreen({ navigation }: any) {
  const shipments = [
    { id: '1', trackingNumber: 'TRK001', status: 'IN_TRANSIT', destination: 'New York' },
    { id: '2', trackingNumber: 'TRK002', status: 'DELIVERED', destination: 'Los Angeles' },
    { id: '3', trackingNumber: 'TRK003', status: 'EXCEPTION', destination: 'Chicago' },
  ];

  const renderShipment = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.shipmentCard}
      onPress={() => navigation.navigate('ShipmentDetail', { shipment: item })}
    >
      <Text style={styles.trackingNumber}>{item.trackingNumber}</Text>
      <Text style={styles.destination}>To: {item.destination}</Text>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supply Chain Mobile</Text>
      <FlatList
        data={shipments}
        renderItem={renderShipment}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

function ShipmentDetailScreen({ route }: any) {
  const { shipment } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shipment Details</Text>
      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>Tracking Number:</Text>
        <Text style={styles.detailValue}>{shipment.trackingNumber}</Text>
        
        <Text style={styles.detailLabel}>Status:</Text>
        <Text style={styles.detailValue}>{shipment.status}</Text>
        
        <Text style={styles.detailLabel}>Destination:</Text>
        <Text style={styles.detailValue}>{shipment.destination}</Text>
      </View>
    </View>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'DELIVERED': return '#4CAF50';
    case 'IN_TRANSIT': return '#2196F3';
    case 'EXCEPTION': return '#F44336';
    default: return '#9E9E9E';
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="ShipmentDetail" component={ShipmentDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  shipmentCard: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  trackingNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  destination: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
});