import React from 'react';
import {
  IonModal,
  IonIcon,
  IonHeader,
  IonTitle,
  IonButtons,
  IonToolbar,
} from '@ionic/react';
import { close } from 'ionicons/icons';
import Button from '../button';

import './index.scss';

export interface ModalProps {
  header: string;
  showModal: boolean;
  forceModal: boolean;
  onToggleModalVisible?: (visible: boolean) => void;
  children?: React.ReactNode
}

export default class Modal extends React.Component<ModalProps> {
  public static defaultProps = {
    header: 'Sample',
    showModal: false,
    forceModal: false,
  };

  public render() {
    return (
      <IonModal isOpen={this.props.showModal} backdropDismiss={false}>
        {!this.props.forceModal ? (
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end" onClick={this.toggleModalVisible(false)}>
                <Button onClick={this.toggleModalVisible(false)}>
                  <IonIcon icon={close} size={'large'} />
                </Button>
              </IonButtons>
              <IonTitle>{this.props.header}</IonTitle>
            </IonToolbar>
          </IonHeader>
        ) : null}
        {this.props.children}
      </IonModal>
    );
  }

  private toggleModalVisible = (visible: boolean) => {
    const { onToggleModalVisible } = this.props;
    return () => {
      if (onToggleModalVisible) {
        onToggleModalVisible(visible);
      }
    };
  };
}
