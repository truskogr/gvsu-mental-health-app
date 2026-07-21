
import React from 'react'
import { IonModal, IonIcon, IonHeader, IonTitle } from '@ionic/react'
import { close } from 'ionicons/icons'
import Button from '../button'

import './index.scss'

export interface ModalProps {
    header: string
    showModal: boolean
    forceModal: boolean
    onToggleModalVisible?: (visible: boolean) => void
}

export default class Modal extends React.Component<ModalProps> {

    public static defaultProps = {
        header: "Sample",
        showModal: false,
        forceModal: false,
    }

    public render() {
        return (
            <IonModal isOpen={this.props.showModal}>
                    {!this.props.forceModal ?
                        <IonHeader>
                            <div className="modal-header">
                                <IonTitle>
                                    {this.props.header}
                                </IonTitle>
                                <Button onClick={this.toggleModalVisible(false)}>
                                    <IonIcon icon={close} />
                                </Button>
                            </div>
                        </IonHeader> : null
                    }
                    {this.props.children}
            </IonModal>
        )
    }

    private toggleModalVisible = (visible: boolean) => {
        const { onToggleModalVisible } = this.props
        return (() => {
            if (onToggleModalVisible) {
                onToggleModalVisible(visible)
            }
        })
    }

}