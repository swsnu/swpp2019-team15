import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export const StyledRating = withStyles({
    iconFilled: {
        color: "#ff6d75"
    },
    iconHover: {
        color: "#ff3d47"
    }
})(Rating);

// function getLabelText(value) {
//     return `${value} Heart${value !== 1 ? "s" : ""}`;
// }

// // function IconContainer(props) {
// //     const { value, ...other } = props;
// //     return (
// //         <Tooltip title={labels[value] || ""}>
// //             <span {...other} />
// //         </Tooltip>
// //     );
// // }

// export default function CustomRatings(props) {
//     const value = 2;
//     const [hover, setHover] = React.useState(-1);

//     return (
//         <Box component="fieldset" mb={3} borderColor="transparent">
//             <StyledRating
//                 name="customized-color"
//                 value={props.value}
//                 getLabelText={getLabelText}
//                 precision={1}
//                 max={props.max}
//                 icon={
//                     // props.icon
//                     <FavoriteIcon
//                         fontSize="inherit"
//                         style={{ fontSize: "55px", width: "60px" }}
//                     />
//                 }
//                 size="large"
//                 onChangeActive={(event, newHover) => {
//                     setHover(newHover);
//                 }}
//                 toolTipText="hi"
//             />
//             {/* <Box ml={2}>{props.labels[hover !== -1 ? hover : value]}</Box> */}
//         </Box>
//     );
// }

export default StyledRating;
