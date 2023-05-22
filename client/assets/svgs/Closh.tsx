import React from "react";
import { SvgXml } from "react-native-svg";

const xml = `<svg width="214" height="148" viewBox="0 0 214 148" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M193.308 110.143V103.571C193.308 84.4001 184.215 66.0139 168.029 52.4577C151.843 38.9015 129.89 31.2857 107 31.2857M107 31.2857C84.1098 31.2857 62.1571 38.9015 45.9712 52.4577C29.7854 66.0139 20.6923 84.4001 20.6923 103.571V110.143M107 31.2857V5M209 110.143H5L10.0215 124.206C11.9512 129.641 15.9278 134.408 21.3578 137.795C26.7878 141.183 33.3802 143.008 40.1508 143H173.849C180.62 143.008 187.212 141.183 192.642 137.795C198.072 134.408 202.049 129.641 203.978 124.206L209 110.143Z" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const CloshElement = () => <SvgXml xml={xml} width="50%" />

export default function CloshSvg(){
    return <CloshElement />
}