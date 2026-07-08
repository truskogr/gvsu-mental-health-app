import React, { useRef } from 'react';
import { ResourceTile, GuideTileInfo } from '../../stores/models/data_models';
import {
  IonList,
  IonImg,
  IonRouterLink,
  IonIcon,
  IonSlides,
} from '@ionic/react';
import Slides from '../horizontal-slides';
import InfiniteScroll from '../infinite-scroll';
import gv from '../../assets/gv_placeholder_logo.jpg';
import { call, link, mail } from 'ionicons/icons';
import TextBlock from '../text_block';
import ScrollTile from '../scroll_tile';

import './index.scss';

export interface ResourceSlideDockProps {
  resources: ResourceTile[];
  tile?: GuideTileInfo;
  resourceView?: boolean;
  onCloseModal?: () => void;
  stretchCards?: boolean;
}

export default class ResourceSlideDock extends React.Component<
  ResourceSlideDockProps
> {
  public static defaultProps = {
    loop: true,
    slidesPerView: 1,
  };

  public render() {
    const slides = this.props.resources
      .filter((item) => {
        return !(item.hidden === true) || !(this.props.resourceView === true);
      })
      .map((item) => {
        return {
          title: item.department,
          body: (
            <>
              {this.renderImage(item)}
              {this.renderContact(item)}
              {this.renderBody(item)}
            </>
          ),
        };
      });
    if (!this.props.resourceView) {
      slides.push({
        title: 'Other Resources',
        body: (
          <>
            <IonImg className="resource-tile__image" src={gv} />
            <ScrollTile
              open={false}
              label="All Resources"
              link="/resources"
              onClick={this.handleClickAllResources}
            />
          </>
        ),
      });
    }
    return (
      <div>
        <Slides slides={slides} stretchCards={this.props.stretchCards} />
        <InfiniteScroll threshold={'100px'} infinite={this.onInfinite} />
      </div>
    );
  }

  private renderImage(tile: ResourceTile) {
    const tileLocation = tile.picture
      ? `../../assets/resource_photos/${tile.picture}`
      : gv;
    return <IonImg className="resource-tile__image" src={tileLocation} />;
  }

  private renderContact(tile: ResourceTile) {
    return (
      <div className="resource-tile__contact">
        {tile.link ? (
          <div>
            <IonIcon className="resource-tile__icon" icon={link} />
            <IonRouterLink href={tile.link}>Visit site</IonRouterLink>
          </div>
        ) : null}
        {tile.phone ? (
          <div>
            <a href={`tel:${tile.phone}`}>
              <IonIcon icon={call} className="resource-tile__icon" />
              {tile.phone}
            </a>
          </div>
        ) : null}
        {tile.email ? (
          <a href={`mailto:${tile.email}`}>
            <div>
              <IonIcon icon={mail} className="resource-tile__icon" />
              {tile.email}
            </div>
          </a>
        ) : null}
      </div>
    );
  }

  private renderBody(item: ResourceTile) {
    const { tile } = this.props;
    if (!tile) {
      return;
    }
    const resource = tile.resourcesRelevant.find(
      (t) => t.name === item.department,
    );
    const input = resource ? resource.body : '';
    return <TextBlock input={input} />;
  }

  private handleClickAllResources = () => {
    const { onCloseModal } = this.props;
    if (onCloseModal) {
      onCloseModal();
    }
  };

  private onInfinite = (e: CustomEvent<void>) => {
    (e.target as HTMLIonInfiniteScrollElement).complete();
  };
}
