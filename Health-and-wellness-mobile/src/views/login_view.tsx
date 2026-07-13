import React from "react"
import { IonContent } from "@ionic/react"
import Button from "../../src/components/button"
import Store from "../stores/store"
import { inject, observer } from "mobx-react"
import Firebase from '../components/firebase'

import "./views.scss"

export interface LoginViewProps {
    store: Store
    fbase: Firebase
    toggleVisible: () => void
}

@inject('store')
@observer
export default class LoginView extends React.Component<LoginViewProps> {

    public static defaultProps = {
        store: null
    }

    public render() {
        return (
            <div className="login-view">
                <IonContent className="content">
                    <div className="login-view__background">
                        <div className="view__header login-view__header" >
                            GVSU Mental Health Resource Guide
                        </div>
                        <div className="login-view__login">
                            <Button onClick={this.handleClickLogin} fillWidth={true}>Login</Button>
                        </div>
                    </div>
                </IonContent>
            </div>
        )
    }

    private handleClickLogin = () => {
        if (!this.props.store.preferences.hasLoggedin) {
            this.props.fbase.auth.onAuthStateChanged((user: any) => {
                if (user) {
                    this.props.toggleVisible()
                } else {
                    this.props.fbase.signIn().then((_) => {
                        this.props.toggleVisible()
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            })
        }
    }
}