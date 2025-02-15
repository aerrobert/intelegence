export interface XmlNode {
    [key: string]: XmlValue;
}
export type XmlValue = string | XmlNode | Array<XmlValue>;
export declare function parseOutSimpleXml(input: string): XmlNode[];
