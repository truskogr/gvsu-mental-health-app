import React from 'react'
import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import View from './view_models/view'
import { IonList } from '@ionic/react'
import ScrollTile from '../components/scroll_tile'
import Store from '../stores/store'
import { FaqInfo } from '../stores/models/data_models'
import TextBlock from '../components/text_block'

import './views.scss'

export interface Props {
    store: Store
}

export interface FaqTile {
    info: FaqInfo
    open: boolean
}

@observer
@inject("store")
export default class FAQView extends React.Component<Props> {

    @observable private tiles: FaqTile[] = this.props.store.data.faqTiles.map((item) => {
        return (
            {
                info: item,
                open: false
            }
        )
    })

    public static defaultProps = {
        store: null
    }

    public render() {

        let body = (
            <IonList lines="none">
                {this.tiles.map((tile, idx) => {
                    return (
                        <ScrollTile open={tile.open} label={tile.info.question} enableDropdown={true} key={idx} onClick={this.toggleTileVisible(tile)}>
                            <div className="faq-view__dropdown">
                                <TextBlock input={tile.info.answer} />
                            </div>
                        </ScrollTile>
                    );
                })}
            </IonList>
        );

        return (
            <View title="FAQ" route="/faq" body={body} />
        )
    }

    @action
    private toggleTileVisible = (tile: FaqTile) => {
        return () => {
            if (!tile.open) {
                this.tiles.forEach((t) => {
                    t.open = false
                })
                tile.open = true
            }
            else {
                tile.open = false
            }
            this.forceUpdate()
        }
    }
}
