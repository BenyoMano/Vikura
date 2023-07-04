import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import SmallButton from "../src/atoms/SmallButton";
import '@testing-library/jest-native/extend-expect';


describe('functionality', () => {

    test('calls onPress callback when pressed', () => {
        const onPressMock = jest.fn();
       
        const { getByTestId } = render(
            <SmallButton title="Test SmallButton" onPress={onPressMock} />
        );
        const SmallButtonElement = getByTestId('smallbutton');
        fireEvent.press(SmallButtonElement);
    
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

});

describe('visuals', () => {

    test('should have the correct styling', () => {
    
        const { getByTestId } = render(<SmallButton />);
        const SmallButtonElement = getByTestId('smallbutton');

        const buttonContainerStyle = SmallButtonElement.props.children[0].props.style[0];
        const textStyle = SmallButtonElement.props.children[0].props.children.props.style;

        expect(buttonContainerStyle.borderRadius).toBe(12);
        expect(buttonContainerStyle.borderWidth).toBe(1);
        expect(buttonContainerStyle.borderColor).toBe('black');
        expect(buttonContainerStyle.padding).toBe(10);
        expect(buttonContainerStyle.backgroundColor).toBe('lightgrey');
        
        expect(textStyle.color).toBe('black');
        expect(textStyle.fontSize).toBe(18);
        expect(textStyle.textAlign).toBe('center');
        expect(textStyle.fontFamily).toBe('NunitoSans-Regular');
    });
    
    test('should display the title given as a prop', () => {
    
        const title = 'Any Title';
        
        const { getByText } = render(<SmallButton title={title} onPress={() => {}} />);
        const SmallButtonElement = getByText(title);
    
        expect(SmallButtonElement).toBeDefined();
    });
});
