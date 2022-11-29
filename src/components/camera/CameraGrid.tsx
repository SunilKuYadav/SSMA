import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

type GridProp = {
  gridHeight: number;
  verticalLines?: number;
  horizontalLines?: number;
};

const CameraGrid: FC<GridProp> = ({
  gridHeight,
  verticalLines,
  horizontalLines,
}) => {
  return (
    <View style={{...styles.gridView, height: gridHeight}}>
      {[...Array(horizontalLines)].map((_, index) => (
        <View
          key={index}
          style={{
            ...styles.horizonatlGridLine,
            borderTopWidth: index > 0 ? 1 : 0,
          }}
        />
      ))}

      <View style={styles.verticalContainer}>
        {[...Array(verticalLines)].map((_, index) => (
          <View
            key={index}
            style={[styles.verticalGridLine, {height: '100%'}]}
          />
        ))}
      </View>
    </View>
  );
};

CameraGrid.defaultProps = {
  verticalLines: 3,
  horizontalLines: 4,
};

const styles = StyleSheet.create({
  gridView: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  horizonatlGridLine: {
    borderTopColor: 'white',
    borderTopWidth: 1,
    flex: 1,
  },
  verticalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  verticalGridLine: {
    width: 0.5,
    backgroundColor: 'white',
  },
});

export default CameraGrid;
