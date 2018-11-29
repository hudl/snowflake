// @flow

import {
  pointsToLevels,
  milestoneToPoints,
  trackIds,
  totalPointsFromMilestoneMap,
  maxLevel
} from '../constants';
import type { MilestoneMap } from '../constants';
import React from 'react';

type Props = {
  milestoneByTrack: MilestoneMap
};

class PointSummaries extends React.Component<Props> {
  render() {
    const totalPoints = totalPointsFromMilestoneMap(
      this.props.milestoneByTrack
    );

    let currentLevel, nextLevel;

    let pointsForCurrentLevel = totalPoints;
    while (!(currentLevel = pointsToLevels[pointsForCurrentLevel])) {
      pointsForCurrentLevel--;
    }

    let pointsToNextLevel = 1;
    while (!(nextLevel = pointsToLevels[totalPoints + pointsToNextLevel])) {
      pointsToNextLevel++;
      if (pointsToNextLevel > maxLevel) {
        pointsToNextLevel = 'N/A';
        break;
      }
    }

    const blocks = [
      {
        label: 'Current level',
        value: currentLevel
      },
      {
        label: 'Total points',
        value: totalPoints
      },
      {
        label: 'Points to next level',
        value: pointsToNextLevel
      }
    ];

    return (
      <div
        className="uni-margin--one--vert"
        style={{ display: 'flex', justifyContent: 'space-around' }}
      >
        {blocks.map(({ value, label }, i) => (
          <div style={{ width: '120px' }} key={label}>
            <div
              className="uni-pad--quarter--vert"
              style={{ fontSize: '12px', textAlign: 'center', width: '100%' }}
            >
              {label}
            </div>
            <div
              style={{
                background: 'rgb(249, 250, 251)',
                textAlign: 'center',
                width: '100%',
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: '50px',
                borderRadius: '2px'
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default PointSummaries;
