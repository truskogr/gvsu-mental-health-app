import React from "react"
import { inject, observer } from "mobx-react"
import View from "./view_models/view"
import ScrollTile from "../components/scroll_tile"
import Store from "../stores/store"
import { GuideTileInfo } from "../stores/models/data_models"
import { IonList } from "@ionic/react"
import Slides from "../components/horizontal-slides"
import InfiniteScroll from "../components/infinite-scroll"
import ResourceSlideDock from "../components/resource_slider_dock"
import TextBlock from "../components/text_block"
import { observable, action } from "mobx"
import VideoPlayer from "../components/video_player"

export interface ViewProps {
    store: Store
}

export interface GuideTile {
    info: GuideTileInfo
    open: boolean
    bodyOpen: boolean
}

@inject('store')
@observer
export default class GuideView extends React.Component<ViewProps> {

    @observable private tiles: GuideTile[] = this.props.store.data.guideInfo.map((item) => {
        return ({
            info: item,
            open: false,
            bodyOpen: false
        })
    })

    @observable private ofConcernTiles = this.props.store.data.ofConcernTile.tiles.map((tile) => {
        return {
            info: tile,
            open: false
        }
    })

    @observable private ofConcernOpen: boolean = false

    public static defaultProps = {
        store: null
    }

    public render() {
        const body = (
            <>
                {this.renderGuideTiles()}
                {this.renderOfConcernTile()}
            </>
        )
        return (
            <View title="I have a student who...." body={body} route="/home" />
        )
    }

    private renderGuideTiles() {
        return this.tiles.map((tile, idx) => {
            return (
                <ScrollTile open={tile.open} subscript={tile.info.subscript} label={tile.info.label}
                    enableModal={true} key={idx} onToggleOpen={this.handleToggleModal(tile)}>
                    <div className="guide-view__modal-header">
                        Description
                    </div>
                    <div className="guide-view__modal">
                        <TextBlock input={tile.info.description} />
                    </div >
                    <div className="guide-view__modal">
                        {this.renderVideo(tile.info)}
                    </div>
                    <div className="guide-view__modal-header">
                        Warning Signs
                    </div>
                    <div className="guide-view__modal">
                        {this.renderWarningSigns(tile.info)}
                    </div>
                    {tile.info.body ?
                        this.renderBody(tile) : null
                    }
                    <div className="guide-view__modal-header">
                        {"Do's & Don'ts"}
                    </div>
                    <div>
                        {this.renderDosDonts(tile.info)}
                    </div>
                    <div className="guide-view__modal-header">
                        Relevant Resources
                    </div>
                    <div>
                        {this.renderResources(tile)}
                    </div>
                </ScrollTile>
            )
        })
    }

    private renderOfConcernTile() {
        const tile = this.props.store.data.ofConcernTile
        const buttons = this.ofConcernTiles.map((item, idx) => {
            return (
                <ScrollTile open={item.open} label={item.info.header} enableDropdown={true} key={idx} onClick={this.handleToggleInnerConcern(item)} >
                    <div className="faq-view__dropdown">
                        <TextBlock input={item.info.body} />
                    </div>
                </ScrollTile>
            )
        })
        return (
            <ScrollTile open={this.ofConcernOpen} subscript={tile.subscript} label={tile.header}
                enableModal={true} onToggleOpen={this.handleToggleConcernTile}>
                {buttons}
            </ScrollTile>
        )
    }

    private renderVideo(tile: GuideTileInfo) {
        if (!tile.videoLink) {
            return
        }

        return (
            <VideoPlayer video={tile.videoLink} />
        )
    }

    private renderWarningSigns(tile: GuideTileInfo) {
        if (!tile.warningSigns) {
            return
        }
        const primeSigns = tile.warningSigns.primarySigns.map((sign, idx) => {
            return (
                <div className="guide-view__warning-signs" key={idx}>
                    - {sign}
                </div>
            )
        })

        const secondarySigns = tile.warningSigns.secondarySigns.map((sign, idx) => {
            return (
                <div className="guide-view__warning-signs" key={idx}>
                    - {sign}
                </div>
            )
        })

        return (
            <>
                {primeSigns.length > 0 ?
                    <>
                        <div className="guide-view__modal-subheader">
                            {tile.warningSigns.primaryHeader}
                        </div>
                        <div>
                            {primeSigns}
                        </div>
                    </> : null
                }

                {secondarySigns.length > 0 ?
                    <>
                        <div className="guide-view__modal-subheader">
                            {tile.warningSigns.secondaryHeader}
                        </div>
                        <div>
                            {secondarySigns}
                        </div>
                    </> : null
                }
            </>
        )
    }

    private renderBody(tile: GuideTile) {
        if (!tile.info.body) {
            return
        }

        return (
            <ScrollTile open={tile.bodyOpen} label={tile.info.body!.header} onClick={this.handleToggleBodyOpen(tile)} enableDropdown={true} >
                <div className="faq-view__dropdown">
                    <TextBlock input={tile.info.body!.body} />
                </div>
            </ScrollTile>
        )
    }

    private renderDosDonts(tile: GuideTileInfo) {
        const slides = tile.dosDonts.map((item, idx) => {
            const doBull = item.doBullets.map((d, num) => {
                return (
                    <div key={num} className="guide-view__modal-bullets">
                        - {d}
                    </div>
                )
            })
            const dontBull = item.dontBullets.map((d, num) => {
                return (
                    <div key={num} className="guide-view__modal-bullets">
                        - {d}
                    </div>
                )
            })
            return (
                {
                    body: (
                        <div key={idx}>
                            <div className="guide-view__modal-text">
                                <div>
                                    <div className="guide-view__modal-subheader">Do</div>
                                    {item.do}
                                </div>
                                <div>
                                    {doBull}
                                </div>
                            </div>
                            <div className="guide-view__modal-text">
                                <div>
                                    <div className="guide-view__modal-subheader">Dont</div>
                                    {item.dont}
                                </div>
                                <div>
                                    {dontBull}
                                </div>
                            </div>
                        </div>
                    )
                }
            )
        })

        return (
            <div>
                <IonList>
                    <Slides slides={slides} stretchCards={true}/>
                    <InfiniteScroll threshold={'100px'} infinite={this.onInfinite} />
                </IonList>
            </div>
        )
    }

    private renderResources(tile: GuideTile) {
        const resources = this.props.store.data.guideResourceTiles(tile.info)
        return (
            <ResourceSlideDock resources={resources} tile={tile.info} onCloseModal={this.handleCloseModal(tile)} stretchCards={true}/>
        )
    }

    @action
    private handleToggleConcernTile = (open: boolean) => {
        this.ofConcernOpen = open
    }

    @action
    private handleToggleInnerConcern = (tile: any) => {
        return () => {
            if (tile.open) {
                tile.open = false
            }
            else {
                this.ofConcernTiles.forEach((t) => {
                    t.open = false
                })
                tile.open = true
            }
        }
    }

    @action
    private handleToggleOpen(tile: GuideTile, open: boolean) {
        tile.open = open
    }

    @action
    private handleToggleBodyOpen = (tile: GuideTile) => {
        return () => {
            tile.bodyOpen = !tile.bodyOpen
        }
    }

    private handleToggleModal = (tile: GuideTile) => {
        return action((open: boolean) => {
            tile.open = open
        })
    }

    private handleCloseModal = (tile: GuideTile) => {
        return () => {
            this.handleToggleOpen(tile, false)
        }
    }

    private onInfinite = (e: CustomEvent<void>) => {
        (e.target as HTMLIonInfiniteScrollElement).complete()
    }
}