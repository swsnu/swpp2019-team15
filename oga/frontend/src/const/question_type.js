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
            value: 100,
            label: "VERY LONG"
        },
        {
            value: 75,
            label: "LONG"
        },
        {
            value: 50,
            label: "MODERATE"
        },
        {
            value: 25,
            label: "SHORT"
        },
        {
            value: 0,
            label: "VERY SHORT"
        }
    ],
    "Are there MANY SEATS": [
        {
            value: 100,
            label: "MANY"
        },
        {
            value: 50,
            label: "MODERATE"
        },
        {
            value: 0,
            label: "SMALL"
        }
    ],
    "Is it RAINING": [
        {
            value: 100,
            label: "HEAVY"
        },
        {
            value: 66,
            label: "MODERATE"
        },
        {
            value: 33,
            label: "SMALL"
        },
        {
            value: 0,
            label: "NO"
        }
    ],
    "Is it QUIET": [
        {
            value: 100,
            label: "NOISY"
        },
        {
            value: 50,
            label: "MODERATE"
        },
        {
            value: 0,
            label: "QUIET"
        }
    ]
};

export default {
    question_types,
    answer_markers
};
