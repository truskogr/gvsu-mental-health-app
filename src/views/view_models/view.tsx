import * as React from 'react'
import { IonToolbar, IonHeader, IonPage, IonContent, IonTitle } from '@ionic/react'
import { inject } from 'mobx-react'
import Store from '../../stores/store'
import EmergencyButton from '../../components/emergency_button'

import "./view.scss"

export interface ViewProps {
    title: string
    route: string
    body: React.ReactElement
    enableEmergencyModal: boolean
    store: Store
}

@inject('store')
export default class View extends React.Component<ViewProps> {

    public static defaultProps = {
        store: null,
        enableEmergencyModal: true
    }

    public render() {
        const { title, body, enableEmergencyModal } = this.props
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar >
                        <IonTitle className="view-title">{title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="view-body">
                    {body}
                </IonContent>
                {/* <FirebaseContext.Consumer>
                    {firebase =>
                        <Modal showModal={!store.preferences.hasLoggedin} forceModal={true}>
                            <LoginView fbase={firebase} toggleVisible={this.toggleLoginModal} />
                        </Modal>
                    }
                </FirebaseContext.Consumer> */}
                {enableEmergencyModal ?
                    <div className="view-emergency">
                        <EmergencyButton />
                    </div> : null
                }
                <div className="view-footer">
                    <span>University Counseling <br /> Center Information</span>
                </div>
            </IonPage>
        )
    }

    private toggleLoginModal = () => {
        const { store } = this.props
        store.preferences.loginUser()
        this.forceUpdate()
    }
}