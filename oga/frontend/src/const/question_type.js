export const question_types = {
    "Are there LONG LINES": [
        "VERY LONG",
        "LONG",
        "MODERATE",
        "SHORT",
        "VERY SHORT"
    ],
    "Are there MANY SEATS": ["MANY", "MODERATE", "SMALL"],
    "Is it RAINING": ["HEAVY", "MODERATE", "SMALL", "NO"],
    "Is it QUIET": ["NOISY", "MODERATE", "QUIET"]
};

export const answer_markers = {
    "Are there LONG LINES": [
        {
            value: 5,
            label: "VERY LONG"
        },
        {
            value: 4,
            label: "LONG"
        },
        {
            value: 3,
            label: "MODERATE"
        },
        {
            value: 2,
            label: "SHORT"
        },
        {
            value: 1,
            label: "VERY SHORT"
        }
    ],
    "Are there MANY SEATS": [
        {
            value: 3,
            label: "MANY"
        },
        {
            value: 2,
            label: "MODERATE"
        },
        {
            value: 1,
            label: "SMALL"
        }
    ],
    "Is it RAINING": [
        {
            value: 4,
            label: "HEAVY"
        },
        {
            value: 3,
            label: "MODERATE"
        },
        {
            value: 2,
            label: "SMALL"
        },
        {
            value: 1,
            label: "NO"
        }
    ],
    "Is it QUIET": [
        {
            value: 3,
            label: "NOISY"
        },
        {
            value: 2,
            label: "MODERATE"
        },
        {
            value: 1,
            label: "QUIET"
        }
    ]
};

export default {
    question_types,
    answer_markers
};
