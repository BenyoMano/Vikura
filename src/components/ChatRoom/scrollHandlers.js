export const onScroll = (msgLimit, setMsgLimit) => e => {
    const scrollOffset = e.nativeEvent.contentOffset.y;
    if (scrollOffset <= 10) {
        console.log('setMsgLimit');
        setMsgLimit(msgLimit + 15);
    }
};

export const onMomentumScrollEnd = (msgLimit, setMsgLimit) => event => {
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const calc = layoutHeight + contentOffsetY >= contentSizeHeight - 150;
    if (msgLimit !== 0 && calc) {
        console.log('Near bottom reached --reset msgLimit--');
        setMsgLimit(0);
    }
};

