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
    
        expect(buttonElement).toHaveStyle('backgroundColor', '#C4C4C4');
        expect(buttonElement).toHaveStyle('paddingVertical', 18);
        expect(buttonElement).toHaveStyle('width', 230);
        expect(buttonElement).toHaveStyle('borderRadius', 12);
        
        expect(buttonElement).toHaveStyle('fontSize', 18);
        expect(buttonElement).toHaveStyle('color', 'black');
        expect(buttonElement).toHaveStyle('textAlign', 'center');
        expect(buttonElement).toHaveStyle('textTransform', 'uppercase');
        expect(buttonElement).toHaveStyle('fontFamily', 'NunitoSans-Regular');
    });
    
    test('should display the title given as a prop', () => {
    
        const title = 'Any Title';
        
        const { getByText } = render(<Button title={title} onPress={() => {}} />);
        const buttonElement = getByText(title);
    
        expect(buttonElement).toBeDefined();
    });
});
