import React from "react";
import MainText from "../src/atoms/MainText";
import { render, screen } from "@testing-library/react-native";
import '@testing-library/jest-native/extend-expect';


describe('visuals', () => {
    
    test('should be rendered', () => {
        const { getByTestId } = render(<MainText />);
        const inputbarComponent = getByTestId('maintext');
    
        expect(inputbarComponent).toBeDefined();
    });
    
    test('should have correct base styling', () => {
        const { getByTestId } = render(<MainText />);
        const mainTextComponent = getByTestId('maintext');
    
        expect(mainTextComponent).toHaveStyle('alignItems', 'center');
        expect(mainTextComponent).toHaveStyle('fontFamily', 'NunitoSans-Regular');
    
    });
});

describe('functionality', () => {

    test('should pass properties correctly', () => {
        const title = 'Any Title';
        const style = ({
            fontSize: 24,
            color: 'black',
        });

        const { getByTestId } = render(<MainText title={title} style={style} />);
        const mainTextComponent = getByTestId('maintext');

        expect(mainTextComponent.props.children).toBe(title);
        expect(mainTextComponent).toHaveStyle('fontSize', 24);
        expect(mainTextComponent).toHaveStyle('color', 'black');
    });
});