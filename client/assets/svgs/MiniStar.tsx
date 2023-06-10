import React from "react";
import Svg, { Path } from "react-native-svg";

export default function MiniPriceSvg() {
    return (
        <Svg width="18" height="19" viewBox="0 0 18 19" fill="none">
            <Path d="M9 1.02618L11.472 6.29222L17 7.14185L13 11.2386L13.944 17.0262L9 14.2922L4.056 17.0262L5 11.2386L1 7.14185L6.528 6.29222L9 1.02618Z" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M9 1.02618L6.528 6.29222L1 7.14185L5 11.2386L4.056 17.0262L9 14.2922V1.02618Z" fill="#FFD700" />
        </Svg>
    )
}