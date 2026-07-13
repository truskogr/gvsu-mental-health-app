import React from "react";

import "./index.scss";
import { IonImg, IonIcon } from "@ionic/react";
import { play } from "ionicons/icons";

export interface VideoPlayerProps {
  video: string;
}

export default class VideoPreview extends React.Component<VideoPlayerProps> {
  public render() {
    return (
      <div className="video-player">
        <a
          href={`https://www.youtube.com/watch?v=${this.props.video}`}
          target="_blank"
        >
          <IonImg
            className="resource-title__image"
            src={`https://img.youtube.com/vi/${this.props.video}/hqdefault.jpg`}
            alt={this.props.video}
          />
          <IonIcon className="video-player_play_button" icon={play} />
        </a>
      </div>
    );
  }
}
