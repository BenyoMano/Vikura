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
    expect(inputbarComponent).toHaveStyle('width', '100%');
    expect(inputbarComponent).toHaveStyle('color', 'black');
    expect(inputbarComponent).toHaveStyle('backgroundColor', '#EEEEEE');
    expect(inputbarComponent).toHaveStyle('borderColor', 'gray');
    expect(inputbarComponent).toHaveStyle('borderWidth', 2);
    expect(inputbarComponent).toHaveStyle('borderRadius', 12);
    expect(inputbarComponent).toHaveStyle('padding', 10);
    expect(inputbarComponent).toHaveStyle('fontFamily', 'NunitoSans-Regular');
});