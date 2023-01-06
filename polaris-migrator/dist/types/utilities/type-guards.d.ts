export declare function isKeyOf<T extends {
    [key: string]: any;
}>(obj: T, key: PropertyKey | undefined): key is keyof T;
export declare function isValueOf<T extends readonly string[]>(arr: T, value: string | undefined): value is T[number];
