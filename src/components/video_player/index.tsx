import React from "react"
import ReactPlayer from 'react-player'

import './index.scss'

export interface VideoPlayerProps {
    video: string
}

export default class VideoPlayer extends React.Component<VideoPlayerProps> {
    public render() {
        return (
            <div className="video-player">
                <ReactPlayer url={this.props.video} width="80vw" />
            </div>
        )
    }
}
