import React from 'react';
import {View} from 'react-native';
import {WP} from '../../../shared/exporter';

interface SpacerProps {
  height?: number;
}

const Spacer: React.FC<SpacerProps> = ({height = WP('5')}) => {
  return <View style={{height: height}} />;
};

export {Spacer};
