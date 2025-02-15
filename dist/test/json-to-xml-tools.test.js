"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_to_xml_tools_1 = require("../src/utils/json-to-xml-tools");
describe('jsonToXml', () => {
    test('converts simple object with primitive values', () => {
        const input = {
            name: 'John',
            age: 30,
            active: true,
        };
        const expected = '<name>John</name>\n' + '<age>30</age>\n' + '<active>true</active>\n';
        expect((0, json_to_xml_tools_1.jsonToXml)(input)).toBe(expected);
    });
    test('handles nested objects', () => {
        const input = {
            person: {
                name: 'John',
                address: {
                    street: 'Main St',
                    city: 'Boston',
                },
            },
        };
        const expected = '<person>\n' +
            '  <name>John</name>\n' +
            '  <address>\n' +
            '    <street>Main St</street>\n' +
            '    <city>Boston</city>\n' +
            '  </address>\n' +
            '</person>\n';
        expect((0, json_to_xml_tools_1.jsonToXml)(input)).toBe(expected);
    });
    test('handles arrays', () => {
        const input = {
            fruits: ['apple', 'banana', 'orange'],
            scores: [1, 2, 3],
        };
        const expected = '<fruits>\n' +
            '  <0>apple</0>\n' +
            '  <1>banana</1>\n' +
            '  <2>orange</2>\n' +
            '</fruits>\n' +
            '<scores>\n' +
            '  <0>1</0>\n' +
            '  <1>2</1>\n' +
            '  <2>3</2>\n' +
            '</scores>\n';
        expect((0, json_to_xml_tools_1.jsonToXml)(input)).toBe(expected);
    });
    test('handles arrays of objects', () => {
        const input = {
            people: [
                { name: 'John', age: 30 },
                { name: 'Jane', age: 25 },
            ],
        };
        const expected = '<people>\n' +
            '  <name>John</name>\n' +
            '  <age>30</age>\n' +
            '</people>\n' +
            '<people>\n' +
            '  <name>Jane</name>\n' +
            '  <age>25</age>\n' +
            '</people>\n';
        expect((0, json_to_xml_tools_1.jsonToXml)(input)).toBe(expected);
    });
    test('handles null values', () => {
        const input = {
            name: 'John',
            age: 30,
        };
        const expected = '<name>John</name>\n' + '<middleName></middleName>\n' + '<age>30</age>\n';
        expect((0, json_to_xml_tools_1.jsonToXml)(input)).toBe(expected);
    });
    test('wraps with root element when provided', () => {
        const input = {
            name: 'John',
            age: 30,
        };
        const expected = '<root>\n' + '  <name>John</name>\n' + '  <age>30</age>\n' + '</root>';
        expect((0, json_to_xml_tools_1.jsonToXml)(input, 'root')).toBe(expected);
    });
    test('handles empty objects', () => {
        const input = {};
        expect((0, json_to_xml_tools_1.jsonToXml)(input)).toBe('');
    });
    test('handles custom indentation level', () => {
        const input = {
            name: 'John',
        };
        const expected = '    <name>John</name>\n';
        expect((0, json_to_xml_tools_1.jsonToXml)(input, undefined, 2)).toBe(expected);
    });
});
//# sourceMappingURL=json-to-xml-tools.test.js.map