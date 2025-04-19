// import React, { useEffect, useRef } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { prepFeedbackInterface } from '@/typeInterfaces/prepInterface';
import ShareFeedback from './ShareFeedback';


export interface LoadingModalProps {
    display: boolean,
    setDisplay: (state: boolean) => void,
    prepFeedback: prepFeedbackInterface
    overlayBgColor?: string,
};

const ShareFeedbackModal: React.FC<LoadingModalProps> = ({
    display = false, prepFeedback, setDisplay, overlayBgColor = "#eef8fc"
}) => {


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={display}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                backgroundColor: overlayBgColor,
            }}>
                
                <ShareFeedback
                    prepFeedback={prepFeedback}
                    shareFeedback={display}
                    setShareFeedback={setDisplay}
                />
            </View>
        </Modal>
    )
}

export default ShareFeedbackModal;

const styles = StyleSheet.create({})