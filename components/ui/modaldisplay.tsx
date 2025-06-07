import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { View } from 'react-native';
import { Divider, Modal, Portal, Text } from 'react-native-paper';

interface GroupedNotification {
  title: string;
  icon: string;
  data: string[];
  subtitle?: string;
}

interface ModalMessageProps {
  visible: boolean;
  hideModal: () => void;
  groupedNotifications: GroupedNotification[];
}

const ModalMessage = ({ visible, hideModal, groupedNotifications }: ModalMessageProps) => {
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    maxHeight: '80%' as `${number}%`,
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: 'black' }}>
          You have Notifications
        </Text>

        {groupedNotifications.map((group, idx) => (
          <View key={idx} style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <MaterialCommunityIcons name={group.icon as keyof typeof MaterialCommunityIcons.glyphMap} size={20} color="#03a832" />
              <Text style={{ marginLeft: 6, fontWeight: 'bold', fontSize: 16, color: '#03a832' }}>
                {group.title}
              </Text>
            </View>

            {group.subtitle && (
              <Text style={{ marginLeft: 26, marginBottom: 8, fontSize: 14, color: '#666' }}>
                {group.subtitle}
              </Text>
            )}

            {group.data.length === 0 ? (
              <Text style={{ marginLeft: 26, color: 'gray' }}>No new items.</Text>
            ) : (
              group.data.map((item, i) => (
                <Text key={i} style={{ marginLeft: 26, marginBottom: 4, color: '#333' }}>
                  • {item}
                </Text>
              ))
            )}

            {idx < groupedNotifications.length - 1 && <Divider style={{ marginTop: 10 }} />}
          </View>
        ))}
      </Modal>
    </Portal>
  );
};

export default ModalMessage;
