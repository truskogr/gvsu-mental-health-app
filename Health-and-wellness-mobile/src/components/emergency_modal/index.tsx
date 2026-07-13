import React from "react"
import { inject, observer } from "mobx-react"
import Modal from "../modal"
import Store from "../../stores/store"
import { EmergencyInfo } from "../../stores/models/data_models"
import TextBlock from "../text_block"

import "./index.scss"

export interface Props {
    onToggleVisible: (visible: boolean) => void
    store: Store
}

@inject('store')
@observer
export default class EmergencyModal extends React.Component<Props> {

    public static defaultProps = {
        store: null
    }

    public render() {
        return (
            <Modal showModal={true} onToggleModalVisible={this.toggleModal} header="Emergency Support">
                <div className="emergency-modal">
                    <div>
                        {this.renderBody()}
                    </div>
                </div>
            </Modal>
        )
    }

    private toggleModal = (visible: boolean) => {
        if (this.props.onToggleVisible) {
            this.props.onToggleVisible(visible)
        }
    }

    private renderBody() {
        const data = this.props.store.data
        const during = data.emergencyBusinessHourInfo
        const after = data.emergencyAfterHourInfo

        return (
            <>
                {this.renderDescription()}
                {this.renderConcerned()}
                {this.renderSection(during)}
                {this.renderSection(after)}
            </>
        )
    }

    private renderDescription() {
        const data = this.props.store.data
        const header = data.emergencyDescriptionHeader
        const bullets = data.emergencyDescriptionBullets
        const footer = data.emergencyDescriptionFooter

        return (
            <>
                <div className="emergency-modal__description">
                    <TextBlock input={header} />
                </div>
                <div className="emergency-modal__description">
                    <TextBlock input={bullets} />
                </div>
                <div className="emergency-modal__description">
                    <TextBlock input={footer} />
                </div>
            </>
        )
    }

    private renderConcerned() {
        const data = this.props.store.data
        const header = data.emergencyConcernHeader
        const bullets = data.emergencyConcernBullets

        return (
            <div className="emergency-modal__section">
                <div className="emergency-modal__header">
                    <span>{header}</span>
                </div>
                <div>
                    <TextBlock input={bullets} />
                </div>
            </div>
        )
    }

    private renderSection(info: EmergencyInfo) {
        return (
            <div className="emergency-modal__section">
                <div className="emergency-modal__header">
                    <span>{info.title}</span>
                </div>
                <div>
                    <TextBlock input={info.body}/>
                </div>
            </div>
        )
    }
}
