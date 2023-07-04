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
        const viewstyle = mainTextComponent.props.style;
        const fontfamily = mainTextComponent.props.children.props.style[1].fontFamily;

        expect(viewstyle.alignItems).toBe('center');
        expect(fontfamily).toBe('NunitoSans-Regular');
    
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
        const componentTitle = mainTextComponent.props.children.props.children;
        const compomentStyle = mainTextComponent.props.children.props.style[0];

        expect(componentTitle).toBe(title);
        expect(compomentStyle.fontSize).toBe(24);
        expect(compomentStyle.color).toBe('black');
    });
});