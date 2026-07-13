import * as React from 'react'
import { IonButton } from '@ionic/react'
import { classNames } from '../../utils/system'

import './index.scss' //scss import

export type ButtonType = 'icon' | 'standard' | 'tabs'
export type ButtonColor = 'primary' | 'secondary' | 'danger'
export type ButtonFill = 'solid' | 'outline' | 'clear'

export interface ButtonProps {
    type: ButtonType
    color: ButtonColor
    fill: ButtonFill
    busy: boolean
    fillWidth: boolean
    disabled?: boolean
    className?: string
    onClick?: () => void
}

export default class Button extends React.Component<ButtonProps> {

    public static defaultProps = {
        type: 'standard',
        color: 'primary',
        fill: 'solid',
        busy: false,
        fillWidth: false
    }

    public render() {
        const { onClick, type, fillWidth, className, fill, color } = this.props

        const buttonClass = classNames('button-wrapper',
            [{ name: 'button-wrapper__fill-width', include: fillWidth },
            { name: className!, include: className !== null || className !== undefined },
            { name: 'button-wrapper__outline', include: fill === 'outline'}
            ])

        const fillVal = this.props.fill ? this.props.fill : "solid"

        if (type === 'standard') {
            return (
                <div className={buttonClass}>
                    <IonButton onClick={onClick} color={color} fill={fillVal}>
                        <span>{this.props.children}</span>
                    </IonButton>
                </div >
            )
        }

        else if (type === 'icon') {
            return (
            <IonButton onClick={onClick} fill={fillVal} size="default">
                {this.props.children}
            </IonButton>
            )
        }
    }
}