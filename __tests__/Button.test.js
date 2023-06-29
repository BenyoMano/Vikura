import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Button from "../src/atoms/Button";
import { test, expect } from "@jest/globals";


test('should have the correct text style', () => {

    const title = 'Any Title';
    
    const { getByText } = render(<Button title={title} onPress={() => {}} />);
    const buttonElement = getByText(title);
    const buttonTextStyle = buttonElement.props.style;

    expect(buttonTextStyle).toHaveProperty('fontSize', 18);
    expect(buttonTextStyle).toHaveProperty('color', 'black');
    expect(buttonTextStyle).toHaveProperty('textAlign', 'center');
    expect(buttonTextStyle).toHaveProperty('textTransform', 'uppercase');
    expect(buttonTextStyle).toHaveProperty('fontFamily', 'NunitoSans-Regular');
});

test('should display the title given as a prop', () => {
   
    const title = 'Any Title';
    
    const { getByText } = render(<Button title={title} onPress={() => {}} />);
    const buttonElement = getByText(title);

    expect(buttonElement).toBeDefined();
});

test('should sucessfully pass the onPress prop', () => {
    const onPressMock = jest.fn();
   
    const { getByTestId } = render(
        <Button title="Test Button" onPress={onPressMock} />
    );
    const buttonElement = getByTestId('button');
    fireEvent.press(buttonElement);
    
    expect(onPressMock).toHaveBeenCalledTimes(1);
});