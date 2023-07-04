import React from "react";
import { render } from "@testing-library/react-native";
import InputBarChatt, { styles } from "../src/components/ChatRoom/InputbarChat";
import '@testing-library/jest-native/extend-expect';


test('should be rendered', () => {
    const { getByTestId } = render(<InputBarChatt />);
    const inputbarComponent = getByTestId('inputbarChat');

    expect(inputbarComponent).toBeDefined();
});

test('should pass the messageToSend value', () => {
    const message = 'Hello there!';
    const { getByTestId } = render(<InputBarChatt messageToSend={message}/>);
    const inputbarComponent = getByTestId('inputbarChat');

    expect(inputbarComponent.props.value).toBe(message);
});

test('should have correct properties', () => {

    const { getByTestId } = render(<InputBarChatt />);
    const inputbarComponent = getByTestId('inputbarChat');

    expect(inputbarComponent.props.autoFocus).toBeTruthy();
    expect(inputbarComponent.props.multiline).toBeDefined();
    expect(inputbarComponent.props.placeholder).toBe('Skriv något...');
    expect(inputbarComponent.props.placeholderTextColor).toBe('grey');
    expect(inputbarComponent.props.textBreakStrategy).toBe('simple');
    expect(inputbarComponent.props.underlineColorAndroid).toBe('transparent');
});

test('should have correct styling', () => {
    const { getByTestId } = render(<InputBarChatt />);
    const inputbarComponent = getByTestId('inputbarChat');
    const barStyle = inputbarComponent.props.style;

    expect(barStyle).toEqual(styles.barStyle);
    expect(barStyle.maxHeight).toBe(250);
    expect(barStyle.width).toBe('100%');
    expect(barStyle.color).toBe('black');
    expect(barStyle.backgroundColor).toBe('#EEEEEE');
    expect(barStyle.borderColor).toBe('gray');
    expect(barStyle.borderWidth).toBe(2);
    expect(barStyle.borderRadius).toBe(12);
    expect(barStyle.padding).toBe(10);
    expect(barStyle.fontFamily).toBe('NunitoSans-Regular');
});