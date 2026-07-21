import React from "react"
import { IonSlides, IonSlide } from '@ionic/react'
import Card from "../card"

export interface Slide {
    title?: string
    body: JSX.Element
}

export interface SlideProps {
    slides: Slide[]
    loop: boolean
    slidesPerView: number
    stretchCards?: boolean
}

export default class Slides extends React.Component<SlideProps> {
    public static defaultProps = {
        loop: true,
        slidesPerView: 1
    }

    public render() {
        const { slides, loop, slidesPerView } = this.props
        const slidesOpts = {
            loop: loop,
            slidesPerView: slidesPerView,
        }

        return (
            <IonSlides options={slidesOpts}>
                {
                    slides.map((slide, idx) => {
                        const title = slide.title ? slide.title : undefined
                        const stretch = this.props.stretchCards
                        return (
                            <IonSlide key={idx}>
                                <Card title={title} stretch={stretch}>
                                    {slide.body}
                                </Card>
                            </IonSlide>
                        )
                    }
                    )
                }
            </IonSlides>
        )
    }
}
