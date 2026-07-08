import React from "react"
import { IonInput } from "@ionic/react"

import './index.scss'

export type InputType = 'password' | 'email'

export interface InputProps {
    type: InputType
}

export default class Input extends React.Component<InputProps> {

    public static defaultProps = {
        type: 'password'
    }

    public render() {
        return (
            <div className="input">
                {this.renderBody()}
            </div>
        )
    }

    public renderBody() {

        switch (this.props.type) {
            case 'password':
                return (
                    <IonInput placeholder="Password" inputMode="text" type="password"></IonInput>
                )

            case 'email':
                return (
                    <IonInput placeholder="GVSU Email" inputMode="email" type="email" ></IonInput>
                )
        }
    }
}