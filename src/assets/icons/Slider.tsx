import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  LinearGradient,
  Defs,
  Stop,
} from 'react-native-svg';
function Slider(props: SvgProps) {
  return (
    <Svg
      width="100%"
      height="50%"
      viewBox="0 0 336 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M2.17346 2.72998C2.17346 2.72998 54.5655 31.9955 167.673 33.6678C280.781 35.3401 333.173 2.72998 333.173 2.72998"
        stroke="url(#paint0_linear_600_39136)"
        stroke-width="4"
        stroke-linecap="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_600_39136"
          x1="11.9664"
          y1="18.73"
          x2="333.173"
          y2="18.73"
          gradientUnits="userSpaceOnUse">
          <Stop stop-color="#212AB3" />
          <Stop offset="1" stop-color="#CEB55A" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default Slider;
