import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { strings } from '../../../../../../locales/i18n';
import Title from '../Title';
import { colors as importedColors } from '../../../../../styles/common';
import StyledButton from '../../../StyledButton';
import Device from '../../../../../util/device';
import { useTheme } from '../../../../../util/theme';

const createStyles = (colors) =>
  StyleSheet.create({
    modalView: {
      backgroundColor: colors.background.default,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 50,
      borderRadius: 10,
      shadowColor: importedColors.black,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
    },
    modal: {
      margin: 0,
      width: '100%',
      padding: Device.isIphone5() ? 15 : 25,
    },
    title: {
      width: '100%',
      paddingVertical: 15,
      paddingHorizontal: 20,
      paddingBottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    closeIcon: {
      color: colors.text.default,
    },
    body: {
      width: '100%',
      paddingVertical: 5,
      paddingHorizontal: 20,
    },
    action: {
      width: '100%',
      alignItems: 'center',
      marginTop: 15,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border.muted,
    },
    button: {
      width: '50%',
    },
  });

const CloseIcon = (props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <IonicIcon name="ios-close" style={styles.closeIcon} size={30} {...props} />
  );
};

const PaymentMethodModal = ({ isVisible, title, dismiss, children }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={dismiss}
      onBackButtonPress={dismiss}
      onSwipeComplete={dismiss}
      swipeDirection="down"
      style={styles.modal}
      propagateSwipe
      backdropColor={colors.overlay.default}
      backdropOpacity={1}
    >
      <SafeAreaView style={styles.modalView}>
        <View style={styles.title}>
          <Title>{title}</Title>
          <TouchableOpacity
            onPress={dismiss}
            hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.body}>
          <View onStartShouldSetResponder={() => true}>{children}</View>
        </ScrollView>
        <View style={styles.action}>
          <StyledButton
            type="blue"
            onPress={dismiss}
            containerStyle={[styles.button]}
          >
            {strings('fiat_on_ramp.purchase_method_modal_close')}
          </StyledButton>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

PaymentMethodModal.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string.isRequired,
  dismiss: PropTypes.func,
  children: PropTypes.node,
};

PaymentMethodModal.defaultProps = {
  isVisible: false,
  dismiss: undefined,
  children: undefined,
};

export default PaymentMethodModal;