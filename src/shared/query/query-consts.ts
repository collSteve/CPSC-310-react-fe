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

// EBNF Conts
export const Room_MFields = ["lat", "lon", "seats"];
export const Room_SFields = ['fullname',  'shortname', 'number', 'name', 'address', 'type', 'furniture', 'href'];

export const Section_MFields = ["avg", "pass", "fail", "audit", "year"];
export const Section_SFields = ['dept', 'id', 'instructor', 'title', 'uuid'];

export enum OrderDir {
    UP = "UP",
    DOWN = "DOWN",
}

export const ALL_ORDER_DIRS = [OrderDir.UP, OrderDir.DOWN];