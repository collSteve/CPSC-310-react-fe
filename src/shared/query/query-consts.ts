export enum DirectQueryType {
    GT = "GT",
    LT = "LT",
    EQ = "EQ",
}

export enum NNaryLogicalQueryType {
    AND = "AND",
    OR = "OR",
}

export enum UnaryLogicalQueryType {
    NOT = "NOT",
}

export enum DirectValueType {
    STRING = "STRING",
    NUMBER = "NUMBER",
}

export enum EmptyQueryType {
    EMPTY = "EMPTY"
}

export const ALL_DIRECT_QUERY_TYPES = [DirectQueryType.GT, DirectQueryType.LT, DirectQueryType.EQ];
export const ALL_NNARY_LOGICAL_QUERY_TYPES = [NNaryLogicalQueryType.AND, NNaryLogicalQueryType.OR];
export const ALL_UNARY_LOGICAL_QUERY_TYPES = [UnaryLogicalQueryType.NOT];

export type AnyQueryType = DirectQueryType | NNaryLogicalQueryType | UnaryLogicalQueryType;
export const ALL_QUERY_TYPES = [...ALL_DIRECT_QUERY_TYPES, ...ALL_NNARY_LOGICAL_QUERY_TYPES, ...ALL_UNARY_LOGICAL_QUERY_TYPES];

export type IDedType = {id: string};

export type LooseAnyQueryType = AnyQueryType | EmptyQueryType;