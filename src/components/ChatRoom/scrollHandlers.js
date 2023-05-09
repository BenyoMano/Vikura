export const onScroll = (messageLimit, setMessageLimit) => e => {
    const scrollOffset = e.nativeEvent.contentOffset.y;
    if (scrollOffset <= 10) {
        console.log('setMessageLimit');
        setMessageLimit(messageLimit + 50);
    }
};

export const onMomentumScrollEnd = (messageLimit, setMessageLimit) => event => {
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const calc = layoutHeight + contentOffsetY >= contentSizeHeight - 150;
    if (messageLimit !== 0 && calc) {
        console.log('Near bottom reached --reset messageLimit--');
        setMessageLimit(0);
    }
};

