export const onMomentumScrollEnd = (messageLimit, setMessageLimit, loadingMessages) => event => {
    if (loadingMessages) return;
    if (!loadingMessages) {
        const contentOffsetY = event.nativeEvent.contentOffset.y;
        const contentSizeHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;
        const calc = layoutHeight + contentOffsetY >= contentSizeHeight - 150;
        if (contentOffsetY <= 10) {
            setMessageLimit(messageLimit + 20);
        }
        if (messageLimit !== 0 && calc) {
            setMessageLimit(0);
        }
    }
};

