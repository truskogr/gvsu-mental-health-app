import React from 'react'
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react'
import { classNames } from '../../utils/system'

import './index.scss'

export type ButtonType = "button" | "reset" | "submit"

export interface cardProps {
    title?: string
    stretch: boolean
    children?: React.ReactNode
}

export default class Card extends React.Component<cardProps> {

    public static defaultProps = {
        stretch: false,
        title: ''
    }

    public render() {

        const { title, stretch } = this.props

        const cardClass = classNames('card', [
            {
                name: 'card__stretch',
                include: stretch
            }
        ])

        return (
            <IonCard className={cardClass}>
                <IonCardHeader>
                    {
                        title !== '' ?
                            <IonCardTitle>{title}</IonCardTitle>
                            : null
                    }
                </IonCardHeader>
                <IonCardContent>
                    {this.props.children}
                </IonCardContent>
            </IonCard>
        )
    }
}