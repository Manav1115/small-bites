import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  ImageSourcePropType
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {useRouter } from 'expo-router';

type OrderStatus = 'pending' | 'preparing' | 'ready';

interface OrderItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
  due: string;
  notes: string;
  status: OrderStatus;
}

const orderItems: OrderItem[] = [
  {
    id: '1',
    name: 'Chicken Burger',image: require('@/assets/images/menuItems/burger.jpg'),    due: '1:30pm',
    notes: 'Note: Less spicy, No mayo',
    status: 'pending',
  },
  {
    id: '2',
    name: 'Chicken Burger',
    image: require('@/assets/images/menuItems/burger.jpg'),
    due: '1:30pm',
    notes: 'Note: Less spicy, No mayo',
    status: 'preparing',
  },
  {
    id: '3',
    name: 'Chicken Burger',
    image: require('@/assets/images/menuItems/burger.jpg'),
    due: '1:30pm',
    notes: 'Note: Less spicy, No mayo',
    status: 'ready',
  },
];

const UpdateMenu: React.FC = ({ }) => {
  const router = useRouter();
  const renderOrderItem = ({ item }: { item: OrderItem }) => {
    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={styles.orderDot} />
          <Text style={styles.orderName}>{item.name}</Text>
        </View>
        <View style={styles.orderDetails}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderTime}>Due: {item.due}</Text>
            <Text style={styles.orderNotes}>{item.notes}</Text>
          </View>
          <Image source={item.image} style={styles.orderImage} />
        </View>
        <View style={styles.orderActions}>
          <Text style={styles.actionLabel}>
            {item.status === 'pending' ? 'Accept Order?' : 
             item.status === 'preparing' ? 'Preparing Order?' : 'Order Ready?'}
          </Text>
          <View style={styles.actionButtons}>
            {item.status === 'pending' ? (
              <>
                <TouchableOpacity style={styles.actionButtonYes}>
                  <Text style={styles.actionButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonNo}>
                  <Text style={styles.actionButtonText}>No</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.actionButtonYes}>
                <Text style={styles.actionButtonText}>Yes</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
      </View>

      <FlatList
        data={orderItems}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersList}
      />

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('./dashboard')}
        >
          <Text style={styles.tabText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={[styles.tabText, styles.activeTab]}>Orders</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000080',
    marginRight: 40,
  },
  ordersList: {
    padding: 16,
    paddingTop: 8,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 8,
  },
  orderName: {
    fontSize: 16,
    fontWeight: '600',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  orderTime: {
    fontSize: 14,
    marginBottom: 4,
  },
  orderNotes: {
    fontSize: 14,
    color: '#666',
  },
  orderImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButtonYes: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 8,
  },
  actionButtonNo: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 8,
  },
  actionButtonText: {
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTab: {
    color: '#000080',
    fontWeight: '600',
  },
});

export default UpdateMenu;