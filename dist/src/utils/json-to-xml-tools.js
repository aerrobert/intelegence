"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToXml = void 0;
/**
 * Converts a JSON object to a pretty-printed XML string.
 * If a root element name is provided, the output is wrapped inside that tag.
 *
 * @param obj - The JSON object to convert.
 * @param rootElement - (Optional) A tag name to wrap the output XML.
 * @param indentLevel - (Optional) The current indentation level (used in recursion).
 * @returns A string containing the XML representation of the object.
 */
function jsonToXml(obj, rootElement, indentLevel = 0) {
    const indent = (level) => '  '.repeat(level);
    // Recursively converts an object to its XML string representation.
    const convert = (data, level) => {
        let xml = '';
        if (typeof data !== 'object' || data === null) {
            // For primitive types, return the value as a string.
            return data === null ? '' : String(data);
        }
        for (const key in data) {
            if (!Object.prototype.hasOwnProperty.call(data, key))
                continue;
            const value = data[key];
            if (Array.isArray(value)) {
                // For arrays, iterate over each item using the parent key and index
                xml += `${indent(level)}<${key}>\n`;
                for (let i = 0; i < value.length; i++) {
                    const item = value[i];
                    if (typeof item === 'object' && item !== null) {
                        xml += `${indent(level + 1)}<${i}>${convert(item, level + 1)}</${i}>\n`;
                    }
                    else {
                        xml += `${indent(level + 1)}<${i}>${item}</${i}>\n`;
                    }
                }
                xml += `${indent(level)}</${key}>\n`;
            }
            else if (typeof value === 'object' && value !== null) {
                // Recursively convert nested objects.
                xml += `${indent(level)}<${key}>\n${convert(value, level + 1)}${indent(level)}</${key}>\n`;
            }
            else {
                // For primitive values, output a simple tag.
                xml += `${indent(level)}<${key}>${value}</${key}>\n`;
            }
        }
        return xml;
    };
    // If a root element is provided, wrap the result accordingly.
    if (rootElement) {
        return `${indent(indentLevel)}<${rootElement}>\n${convert(obj, indentLevel + 1)}${indent(indentLevel)}</${rootElement}>`;
    }
    return convert(obj, indentLevel);
}
exports.jsonToXml = jsonToXml;
//# sourceMappingURL=json-to-xml-tools.js.map