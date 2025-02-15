/**
 * Converts a JSON object to a pretty-printed XML string.
 * If a root element name is provided, the output is wrapped inside that tag.
 *
 * @param obj - The JSON object to convert.
 * @param rootElement - (Optional) A tag name to wrap the output XML.
 * @param indentLevel - (Optional) The current indentation level (used in recursion).
 * @returns A string containing the XML representation of the object.
 */
export declare function jsonToXml(obj: any, rootElement?: string, indentLevel?: number): string;
