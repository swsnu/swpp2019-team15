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
            label: "NONE",
            content: "NO LINES"
        },
        {
            label: "SHORT",
            content: "LINES ARE SHORT"
        },
        {
            label: "MODERATE",
            content: "Lines are MODERATE"
        },
        {
            label: "LONG",
            content: "Lines are LONG"
        },
        {
            label: "VERY LONG",
            content: "Lines are VERY LONG"
        }
    ],
    "Are there MANY SEATS": [
        {
            label: "NO SEATS",
            content: "There are NO SEATS"
        },
        {
            label: "FEW SEATS",
            content: "There are A FEW SEATS"
        },
        {
            label: "MANY SEATS",
            content: "There are MANY SEATS"
        }
    ],
    "Is it RAINING": [
        {
            label: "NO RAIN",
            content: "There is NO RAIN"
        },
        {
            label: "DRIZZLING",
            content: "It is DRIZZLING"
        },
        {
            label: "MODERATE",
            content: "It is RAINING MODERATELY"
        },
        {
            label: "HEAVY",
            content: "It is RAINING HEAVILY"
        }
    ],
    "Is it QUIET": [
        {
            label: "QUIET",
            content: "It is QUIET"
        },
        {
            label: "MODERATE",
            content: "It is MODERATELY QUIET"
        },
        {
            label: "A BIT NOISY",
            content: "It is A BIT NOISY"
        },
        {
            label: "NOISY",
            content: "It is NOISY"
        }
    ]
};

/**
 * 1 if answer type is positive
 * 0 if answer type is negatuve
 */
export const answer_types = {
    "It is NOISY": 0,
    "It is MODERATELY QUIET": 1,
    "It is QUIET": 1,
    "It is RAINING HEAVILY": 0,
    "It is RAINING MODERATELY": 0,
    "It is DRIZZLING": 0,
    "There is NO RAIN": 1,
    "There are MANY SEATS": 1,
    "There are A FEW SEATS": 1,
    "There are NO SEATS": 0,
    "Lines are VERY LONG": 0,
    "Lines are LONG": 0,
    "Lines are MODERATE": 0,
    "Lines are SHORT": 1,
    "NO LINES": 1
};

export default {
    question_types,
    answer_markers,
    answer_types
};
