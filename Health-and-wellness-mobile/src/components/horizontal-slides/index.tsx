import React from 'react';
import { IonSlides, IonSlide } from '@ionic/react';
import Card from '../card';
import './index.scss';
export interface Slide {
  title?: string;
  body: JSX.Element;
}

export interface SlideProps {
  slides: Slide[];
  loop: boolean;
  slidesPerView: number;
  stretchCards?: boolean;
}

export default class Slides extends React.Component<SlideProps> {
  public static defaultProps = {
    loop: true,
    slidesPerView: 1,
  };

  public render() {
    const { slides, loop, slidesPerView } = this.props;
    const slidesOpts = {
      loop: loop,
      slidesPerView: slidesPerView,
    };

    let swiper: any = null;

    const init = async function (this: any) {
      swiper = await this.getSwiper();
    };
    let prevClicked = () => {
      if (swiper !== null && swiper !== undefined) {
        swiper.slidePrev();
      }
    };
    let nextClicked = () => {
      if (swiper !== null && swiper !== undefined) {
        swiper.slideNext();
      }
    };
    return (
      <div className="slides-container">
        <IonSlides options={slidesOpts} onIonSlidesDidLoad={init}>
          {slides.map((slide, idx) => {
            const title = slide.title ? slide.title : undefined;
            const stretch = this.props.stretchCards;
            return (
              <IonSlide key={idx}>
                <Card title={title} stretch={stretch}>
                  {slide.body}
                </Card>
              </IonSlide>
            );
          })}
        </IonSlides>
        <div className="swiper-button-prev" onClick={prevClicked}></div>
        <div className="swiper-button-next" onClick={nextClicked}></div>
      </div>
    );
  }
}
