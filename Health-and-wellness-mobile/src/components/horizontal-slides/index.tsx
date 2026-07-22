import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../card';
import './index.scss';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import '@ionic/react/css/ionic-swiper.css';

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

  private swiper: any = null;

  private initSwiper = (swiper: any) => {
    this.swiper = swiper;
  };

  private prevClicked = () => {
    if (this.swiper) {
      this.swiper.slidePrev();
    }
  };

  private nextClicked = () => {
    if (this.swiper) {
      this.swiper.slideNext();
    }
  };

  public render() {
    const { slides, loop, slidesPerView, stretchCards = false } = this.props;

    return (
      <div className="slides-container">
        <Swiper loop={loop} slidesPerView={slidesPerView} onInit={this.initSwiper}>
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <Card title={slide.title} stretch={stretchCards}>
                {slide.body}
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev" onClick={this.prevClicked}></div>
        <div className="swiper-button-next" onClick={this.nextClicked}></div>
      </div>
    );
  }
}
