import sample from "../../shared/actions/sample";

const sampleSmallActionHandler = {
    $type: sample.small,
    handle: (action) => {
    }
};

const sampleMediumActionHandler = {
    $type: sample.medium,
    handle: (action) => {
    }
};

const sampleBigActionHandler = {
    $type: sample.big,
    handle: (action) => {
    }
};

export default [
    sampleSmallActionHandler,
    sampleMediumActionHandler,
    sampleBigActionHandler
]