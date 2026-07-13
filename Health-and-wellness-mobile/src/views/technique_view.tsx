import React from 'react'
import { inject, observer } from 'mobx-react'
import View from './view_models/view'
import { IonList } from '@ionic/react'
import ScrollTile from '../components/scroll_tile'
import Store from '../stores/store'
import TextBlock from '../components/text_block'
import { TechniqueBody } from '../stores/models/data_models'
import { action, observable } from 'mobx'

export interface Props {
    store: Store
}

export interface TechniqueTile {
    info: TechniqueBody,
    open: boolean
}

@observer
@inject("store")
export default class TechniqueView extends React.Component<Props> {

    @observable private tiles: TechniqueTile[] = this.props.store.data.techniqueView.techniques.map((item) => {
        return ({
            info: item,
            open: false
        })
    })

    public static defaultProps = {
        store: null
    }

    public render() {

        const body = (
            <IonList lines="none">
                <div>
                    <div className="technique-view__header">
                        {this.props.store.data.techniqueView.header}
                    </div>
                    {this.renderBody()}
                </div>
            </IonList>
        );

        return (
            <View title="In the Classroom" route="/technique" body={body} />
        )
    }

    private renderBody() {
        return this.tiles.map((item, idx) => {
            if (item.open) {
            }
            return (
                <ScrollTile open={item.open} label={item.info.header} enableModal={true} key={idx} onToggleOpen={this.handleToggleModal(item)}>
                    <div className="views__modal">
                        <div className="technique-view__modal">
                            <TextBlock input={item.info.body} />
                        </div>
                    </div>
                </ScrollTile>
            )
        })
    }

    private handleToggleModal = (tile: TechniqueTile) => {
        return action((open: boolean) => {
            tile.open = open
            this.forceUpdate()
        })
    }
}