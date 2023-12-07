type OnMomentumScrollEndProps = {
  messageLimit: number;
  setMessageLimit: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
};

export const onMomentumScrollEnd =
  ({messageLimit, setMessageLimit, isLoading}: OnMomentumScrollEndProps) =>
  (event: any) => {
    if (isLoading) return;
    if (!isLoading) {
      const contentOffsetY = event.nativeEvent.contentOffset.y;
      const contentSizeHeight = event.nativeEvent.contentSize.height;
      const layoutHeight = event.nativeEvent.layoutMeasurement.height;
      const calc = layoutHeight + contentOffsetY >= contentSizeHeight - 150;
      if (contentOffsetY <= 10) {
        setMessageLimit(prevLimit => prevLimit + 20);
      }
      if (messageLimit !== 0 && calc) {
        setMessageLimit(0);
      }
    }
  };
