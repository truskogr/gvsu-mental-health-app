import * as React from 'react'
import { classNames } from "../../utils/system";
import { IonInput } from '@ionic/react'

import './index.scss'

export type InputType = "date" | "email" | "number" | "password" | "search" | "tel" | "text" | "time" | "url"
export type InputMode = "decimal" | "email" | "none" | "numeric" | "search" | "tel" | "text" | "url" | undefined
export type InputValue = null | number | string | undefined
export type InputColor = 'primary' | 'secondary'

export interface InputProps {
    type: InputType
    color: InputColor
    required?: boolean
    value?: InputValue
    inputmode?: InputMode
    disabled?: boolean
    className?: string
    autofocus?: boolean
}

export default class Input extends React.Component<InputProps> {

    public static defaultProps = {
        type: 'text',
        color: 'primary'
    }

    public render() {
        const { type, color, required, inputmode, disabled, className, autofocus} = this.props;
        
        const inputClass = classNames('input-wrapper', 
        [{ name: className!, include: className !== null || className !== undefined}]
        );

        return (
            <div className={inputClass}>
                <IonInput type={type} color={color} required={required} inputmode={inputmode} disabled={disabled} autofocus={autofocus}>
                    {this.props.children}
                </IonInput>
            </div>
        )
    }
}