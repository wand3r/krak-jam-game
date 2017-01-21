import {add} from "./";
import {sortObject} from "../../../utils/sortObject";

describe("Add", () => {
    test("2 + 2", () => {
        expect(add(2, 2)).toEqual(4);
    });
});


const _unsortedObject = {
    'a': 234234,
    'g': 3333,
    'b': 2222,
    'o': 22332,
    'ab': 2233
};

const _sortedObject = {
    'a': 234234,
    'ab': 2233,
    'b': 2222,
    'g': 3333,
    'o': 22332,
};

describe("SortObject", () => {
    const __sortedObject = sortObject(_unsortedObject);
    test("objects keys order", () => {
        expect(__sortedObject).toEqual(_sortedObject);
    });
});