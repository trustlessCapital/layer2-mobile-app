import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Colors from '../constants/Colors';
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';

const ConfirmDialog = ({title, visible, message, onOk, onDismiss, onOkText, onDismissText}) => {
  return (
    <Dialog
      visible={visible}
      onTouchOutside={() => {
        if (onDismiss) onDismiss();
      }}
      dialogTitle={
        <DialogTitle
          title={title ? title : 'Caution'}
          style={styles.header}
          textStyle={styles.headerText}
          hasTitleBar={false}
          align="center"
        />
      }
      footer={
        <DialogFooter style={styles.dialogFooter} bordered={true}>
          <DialogButton
            text={onOkText ? onOkText : 'Ok'}
            style={styles.dialogButton}
            textStyle={styles.dialogButtonText}
            onPress={() => {
              if (onOk) onOk();
            }}
          />
          <DialogButton
            text={onDismissText ? onDismissText : 'Cancel'}
            style={styles.dialogButton}
            textStyle={styles.dialogButtonText}
            onPress={() => {
              if (onDismiss) onDismiss();
            }}
          />
        </DialogFooter>
      }>
      <DialogContent style={styles.dialogContentWrapper}>
        <View style={styles.dialogContent}>
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </DialogContent>
    </Dialog>
  );
};

const styles = {
  dialogContentWrapper: {
    backgroundColor: Colors.primaryBg,
  },
  dialogContent: {
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 20,
    marginStart: 0,
    minWidth: 30,
    maxWidth: 250,
    textAlign: 'center',
    backgroundColor: Colors.primaryBg,
  },
  message: {
    marginTop: 15,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'montserrat',
    color: Colors.title,
  },
  header: {
    backgroundColor: Colors.tintColor,
    padding: 15,
  },
  headerText: {
    color: Colors.title,
  },
  dialogFooter: {
    backgroundColor: Colors.tintColor,
    borderColor: Colors.tintColor,
  },
  dialogButtonText: {
    color: Colors.tintColorSecondary,
  },
  dialogButton: {
    borderColor: Colors.tintColor,
  },
};

export default ConfirmDialog;
