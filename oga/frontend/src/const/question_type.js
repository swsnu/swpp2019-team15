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
            value: 1,
            label: "SHORT",
            content: "LINES ARE SHORT"
        },
        {
            value: 1,
            label: "MODERATE",
            content: "Lines are MODERATE"
        },
        {
            value: 0,
            label: "LONG",
            content: "Lines are LONG"
        },
        {
            value: 0,
            label: "VERY LONG",
            content: "Lines are VERY LONG"
        }
    ],
    "Are there MANY SEATS": [
        {
            value: 0,
            label: "NO SEATS",
            content: "There are NO SEATS"
        },
        {
            value: 1,
            label: "FEW SEATS",
            content: "There are A FEW SEATS"
        },
        {
            value: 1,
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
            value: 0,
            label: "DRIZZLING",
            content: "It is DRIZZLING"
        },
        {
            value: 0,
            label: "MODERATE",
            content: "It is RAINING MODERATELY"
        },
        {
            value: 0,
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
            value: 1,
            label: "MODERATE",
            content: "It is MODERATELY QUIET"
        },
        { value: 0, label: "A BIT NOISY", content: "It is A BIT NOISY" },
        {
            value: 0,
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
