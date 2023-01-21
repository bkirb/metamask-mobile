import { ThemeColors } from '@metamask/design-tokens/dist/js/themes/types';
import { ConnectionStatus } from '@metamask/sdk-communication-layer';
import { Connection } from '../../../core/SDKConnect/SDKConnect';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Logger from '../../../util/Logger';
import { useTheme } from '../../../util/theme';

interface SDKSessionViewProps {
  connection: Connection;
}

const createStyles = (
  colors: ThemeColors,
  connectionStatus: ConnectionStatus,
) =>
  StyleSheet.create({
    container: {
      borderWidth: 2,
      borderColor:
        connectionStatus === ConnectionStatus.LINKED
          ? colors.success.default
          : colors.warning.default,
      padding: 10,
      backgroundColor: colors.background.alternative,
    },
    button: {
      height: 30,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary.default,
    },
    textData: {
      color: colors.primary.alternative,
    },
    buttonText: {
      color: colors.primary.inverse,
    },
    removeButton: {
      backgroundColor: colors.warning.default,
    },
  });

export const SDKSessionView = ({ connection }: SDKSessionViewProps) => {
  const { colors } = useTheme();
  const status = connection.RemoteConn.getConnectionStatus();
  const styles = createStyles(colors, status);

  const hasPauseAction =
    (status !== ConnectionStatus.PAUSED &&
      status === ConnectionStatus.LINKED) ||
    status === ConnectionStatus.WAITING;
  const hasResumeAction = status === ConnectionStatus.PAUSED;
  const hasRemoveAction = true;

  Logger.log(
    `status: ${status} hasPauseAction=${hasPauseAction} hasResumeAction=${hasResumeAction}`,
  );

  return (
    <View style={styles.container}>
      {/* <Text>{connection.originatorInfo?.platform}</Text>
      <Text>{connection.originatorInfo?.title}</Text>
      <Text>{connection.originatorInfo?.url}</Text> */}
      <Text>{connection.channelId}</Text>
      {/* <Text>
        MM Private Key:{' '}
        <Text style={styles.textData}>
          {connection.getKeyInfo()?.encryptionKey}
        </Text>
      </Text>
      <Text>
        MM Public Key:{' '}
        <Text style={styles.textData}>
          {connection.getKeyInfo()?.decryptionKey}
        </Text>
      </Text>
      <Text>
        Dapp Public Key:{' '}
        <Text style={styles.textData}>
          {connection.getKeyInfo()?.otherPubKey}
        </Text>
      </Text>
      <Text>
        Expiration: {connection.remote.getChannelConfig()?.validUntil}
      </Text>
      <Text>Status: {connection.getConnectionStatus()}</Text> */}
      {hasResumeAction && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            connection.resume();
          }}
        >
          <Text style={styles.buttonText}>Resume</Text>
        </TouchableOpacity>
      )}
      {hasPauseAction && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            connection.pause();
          }}
        >
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
      )}
      {hasRemoveAction && (
        <TouchableOpacity
          style={[styles.button, styles.removeButton]}
          onPress={() => {
            // SDKConnect.removeChannel(connection.channelId);
            Logger.log(`TODO`);
          }}
        >
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SDKSessionView;
