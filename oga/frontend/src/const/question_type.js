export const question_types = [
    "Are there LONG LINES",
    "Are there MANY SEATS",
    "Is it RAINING",
    "Is it QUIET"
];
/**
 * Marker values and respective labels
 * for NewAnswer Slider display
 */
export const answer_markers = {
    "Are there LONG LINES": [
        {
            value: 1,
            label: "NONE",
            content: "NO LINES"
        },
        {
            value: 2,
            label: "SHORT",
            content: "LINES ARE SHORT"
        },
        {
            value: 3,
            label: "MODERATE",
            content: "Lines are MODERATE"
        },
        {
            value: 4,
            label: "LONG",
            content: "Lines are LONG"
        },
        {
            value: 5,
            label: "VERY LONG",
            content: "Lines are VERY LONG"
        }
    ],
    "Are there MANY SEATS": [
        {
            value: 1,
            label: "NO SEATS",
            content: "There are NO SEATS"
        },
        {
            value: 2,
            label: "FEW SEATS",
            content: "There are a FEW SEATS"
        },
        {
            value: 3,
            label: "MANY SEATS",
            content: "There are MANY SEATS"
        }
    ],
    "Is it RAINING": [
        {
            value: 1,
            label: "NO RAIN",
            content: "There is NO RAIN"
        },
        {
            value: 2,
            label: "DRIZZLING",
            content: "It is DRIZZLING"
        },
        {
            value: 3,
            label: "MODERATE",
            content: "It is RAINING MODERATELY"
        },
        {
            value: 4,
            label: "HEAVY",
            content: "It is RAINING HEAVILY"
        }
    ],
    "Is it QUIET": [
        {
            value: 1,
            label: "QUIET",
            content: "It is QUIET"
        },
        {
            value: 2,
            label: "MODERATE",
            content: "It is MODERATELY QUIET"
        },
        {
            value: 3,
            label: "NOISY",
            content: "It is NOISY"
        }
    ]
};

export default {
    question_types,
    answer_markers
};
