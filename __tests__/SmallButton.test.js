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
        console.log('F', SmallButtonElement);
        console.log('S', SmallButtonElement.props.style.backgroundColor);
        // screen.debug();

        expect(SmallButtonElement.props.style.backgroundColor).toBe('lightgrey');
        expect(SmallButtonElement).toHaveStyle('backgroundColor', '#C4C4C4');
        expect(SmallButtonElement).toHaveStyle('paddingVertical', 18);
        expect(SmallButtonElement).toHaveStyle('width', 230);
        expect(SmallButtonElement).toHaveStyle('borderRadius', 12);
        
        expect(SmallButtonElement).toHaveStyle('fontSize', 18);
        expect(SmallButtonElement).toHaveStyle('color', 'black');
        expect(SmallButtonElement).toHaveStyle('textAlign', 'center');
        expect(SmallButtonElement).toHaveStyle('textTransform', 'uppercase');
        expect(SmallButtonElement).toHaveStyle('fontFamily', 'NunitoSans-Regular');
    });
    
    test('should display the title given as a prop', () => {
    
        const title = 'Any Title';
        
        const { getByText } = render(<SmallButton title={title} onPress={() => {}} />);
        const SmallButtonElement = getByText(title);
    
        expect(SmallButtonElement).toBeDefined();
    });
});
