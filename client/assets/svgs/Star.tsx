import React from "react";
import Svg, { Path } from "react-native-svg";

type SvgType = {
    active: boolean,
    size?: string
}

export default function StarSvg({active, size}: SvgType) {
    return (
        <Svg width={size ? size : "30"} height={size ? size : "30"} viewBox="0 0 30 30" fill="none">
            <Path d="M15 1L19.326 10.2156L29 11.7024L22 18.8717L23.652 29L15 24.2156L6.348 29L8 18.8717L1 11.7024L10.674 10.2156L15 1Z" fill={active ? "#FFD700" : "#868686"} stroke={active ? "#FFD700" : "#868686"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    )
}