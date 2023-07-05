import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Button from "../src/atoms/Button";
import '@testing-library/jest-native/extend-expect';


describe('functionality', () => {

    test('calls onPress callback when pressed', () => {
        const onPressMock = jest.fn();
       
        const { getByTestId } = render(
            <Button title="Test Button" onPress={onPressMock} />
        );
        const buttonElement = getByTestId('button');
        fireEvent.press(buttonElement);
    
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

});

describe('visuals', () => {

    test('should have the correct styling', () => {
    
        const { getByTestId } = render(<Button />);
        const buttonElement = getByTestId('button');
        const buttonStyle = buttonElement.props.children[0].props.style[0];
        const textStyle = buttonElement.props.children[0].props.children.props.style;
    
        expect(buttonStyle.backgroundColor).toBe('#C4C4C4');
        expect(buttonStyle.paddingVertical).toBe(18);
        expect(buttonStyle.width).toBe(230);
        expect(buttonStyle.borderRadius).toBe(12);
        
        expect(textStyle.fontSize).toBe(18);
        expect(textStyle.color).toBe('black');
        expect(textStyle.textAlign).toBe('center');
        expect(textStyle.textTransform).toBe('uppercase');
        expect(textStyle.fontFamily).toBe('NunitoSans-Regular');
    });
    
    test('should display the title given as a prop', () => {
    
        const title = 'Any Title';
        
        const { getByText } = render(<Button title={title} onPress={() => {}} />);
        const buttonElement = getByText(title);
    
        expect(buttonElement).toBeDefined();
    });
});
