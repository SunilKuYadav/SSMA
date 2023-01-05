import * as React from 'react';
import Svg, {SvgProps, Path, G, Circle} from 'react-native-svg';
function RemoveIcon(props: SvgProps) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={100} height={100}>
      <G transform="translate(0 -1020.362)">
        <Circle
          cx="16"
          cy="1036.362"
          r="16"
          fill={props.fill ? props.fill : '#1d67b1'}
        />
        <Path
          style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal"
          fill={props.fillSecond ? props.fillSecond : '#154082'}
          d="M20.682 31.283a16 16 0 0 0 1.115-.37 16 16 0 0 0 1.46-.653 16 16 0 0 0 1.388-.797 16 16 0 0 0 1.3-.93 16 16 0 0 0 1.201-1.054 16 16 0 0 0 1.092-1.172 16 16 0 0 0 .967-1.272 16 16 0 0 0 .836-1.365 16 16 0 0 0 .695-1.44 16 16 0 0 0 .55-1.501 16 16 0 0 0 .009-.036L21.3 10.7A7.476 7.476 0 0 0 16 8.5c-4.136 0-7.5 3.364-7.5 7.5 0 2.068.841 3.943 2.2 5.3l9.982 9.983z"
          color="#000"
          font-family="sans-serif"
          font-weight="400"
          transform="translate(0 1020.362)"
        />
        <Path
          style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal"
          fill="#fff"
          d="M8.5 1C4.364 1 1 4.364 1 8.5S4.364 16 8.5 16 16 12.636 16 8.5 12.636 1 8.5 1Zm0 1C12.096 2 15 4.904 15 8.5S12.096 15 8.5 15A6.492 6.492 0 0 1 2 8.5C2 4.904 4.904 2 8.5 2ZM4.95 8A.5.5 0 0 0 5 9h7a.5.5 0 1 0 0-1H5a.5.5 0 0 0-.05 0Z"
          color="#000"
          font-family="sans-serif"
          font-weight="400"
          overflow="visible"
          transform="translate(7.5 1027.862)"
        />
      </G>
    </Svg>
  );
}

export default RemoveIcon;
