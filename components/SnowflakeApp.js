// @flow

import TrackSelector from '../components/TrackSelector';
import NightingaleChart from '../components/NightingaleChart';
import KeyboardListener from '../components/KeyboardListener';
import Track from '../components/Track';
import LevelThermometer from '../components/LevelThermometer';
import {
  eligibleTitles,
  trackIds,
  milestones,
  milestoneToPoints
} from '../constants';
import PointSummaries from '../components/PointSummaries';
import type { Milestone, MilestoneMap, TrackId } from '../constants';
import React from 'react';
import TitleSelector from '../components/TitleSelector';

let Components = undefined;
if (typeof window !== 'undefined') {
  Components = window.__uniformui_Components;
}

type SnowflakeAppState = {
  milestoneByTrack: MilestoneMap,
  previewMilestoneByTrack: MilestoneMap,
  name: string,
  title: string,
  focusedTrackId: TrackId
};

const hashToState = (hash: String): ?SnowflakeAppState => {
  if (!hash) return null;
  const result = defaultState();
  const hashValues = hash.split('#')[1].split(',');
  if (!hashValues) return null;
  trackIds.forEach((trackId, i) => {
    result.milestoneByTrack[trackId] = coerceMilestone(Number(hashValues[i]));
  });
  if (hashValues[16]) result.name = decodeURI(hashValues[16]);
  if (hashValues[17]) result.title = decodeURI(hashValues[17]);
  return result;
};

const coerceMilestone = (value: number): Milestone => {
  // HACK I know this is goofy but i'm dealing with flow typing
  switch (value) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 4;
    case 5:
      return 5;
    default:
      return 0;
  }
};

const emptyState = (): SnowflakeAppState => {
  return {
    name: '',
    title: '',
    milestoneByTrack: {
      MOBILE: 0,
      WEB_CLIENT: 0,
      FOUNDATIONS: 0,
      SERVERS: 0,
      PROJECT_MANAGEMENT: 0,
      COMMUNICATION: 0,
      CRAFT: 0
    },
    previewMilestoneByTrack: {
      MOBILE: 0,
      WEB_CLIENT: 0,
      FOUNDATIONS: 0,
      SERVERS: 0,
      PROJECT_MANAGEMENT: 0,
      COMMUNICATION: 0,
      CRAFT: 0
    },
    focusedTrackId: 'MOBILE'
  };
};

const defaultState = (): SnowflakeAppState => {
  return {
    name: '',
    title: '',
    milestoneByTrack: {
      MOBILE: 0,
      WEB_CLIENT: 0,
      FOUNDATIONS: 0,
      SERVERS: 0,
      PROJECT_MANAGEMENT: 0,
      COMMUNICATION: 0,
      CRAFT: 0
    },
    previewMilestoneByTrack: {
      MOBILE: 0,
      WEB_CLIENT: 0,
      FOUNDATIONS: 0,
      SERVERS: 0,
      PROJECT_MANAGEMENT: 0,
      COMMUNICATION: 0,
      CRAFT: 0
    },
    focusedTrackId: 'MOBILE'
  };
};

const stateToHash = (state: SnowflakeAppState) => {
  if (!state || !state.milestoneByTrack) return null;
  const values = trackIds
    .map(trackId => state.milestoneByTrack[trackId])
    .concat(encodeURI(state.name), encodeURI(state.title));
  return values.join(',');
};

type Props = {};

class SnowflakeApp extends React.Component<Props, SnowflakeAppState> {
  constructor(props: Props) {
    super(props);
    this.state = emptyState();
  }

  componentDidUpdate() {
    const hash = stateToHash(this.state);
    if (hash) window.location.replace(`#${hash}`);
  }

  componentDidMount() {
    const state = hashToState(window.location.hash);
    if (state) {
      this.setState(state);
    } else {
      this.setState(defaultState());
    }
  }

  render() {
    return (
      <main style={{ display: 'flex', justifyContent: 'center' }}>
        <style jsx>{`
          //small screens
          @media all and (min-width: 400px) {
            .main-body {
              width: 100%;
            }
            .title-section {
              flex-grow: 1;
            }
            .chart-section {
              max-width: 300px;
            }
          }
          //medium screens
          @media all and (min-width: 700px) {
            .main-body {
              width: 100%;
              max-width: 800px;
            }
            .title-section {
              flex-grow: 1;
            }
            .chart-section {
              width: 300px;
              max-width: unset;
            }
          }
          //large screens
          @media all and (min-width: 960px) {
            .main-body {
              width: 100%;
              max-width: 960px;
            }
            .title-section {
              flex-grow: 1;
            }
            .chart-section {
              width: 400px;
              max-width: unset;
            }
          }
        `}</style>
        <div className="uni-margin--one--horiz main-body">
          <div style={{ textAlign: 'center' }}>
            <a href="https://hudl.com/" target="_blank">
              {typeof window !== 'undefined' && (
                <Components.Icon
                  type="logofull"
                  size="large"
                  style={{ width: 128, height: 128 }}
                />
              )}
            </a>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around'
            }}
          >
            <div className="title-section">
              <form>
                <TitleSelector
                  milestoneByTrack={this.state.milestoneByTrack}
                  currentTitle={this.state.title}
                  setTitleFn={title => this.setTitle(title)}
                />
              </form>
              <PointSummaries milestoneByTrack={this.state.milestoneByTrack} />
              <LevelThermometer
                milestoneByTrack={this.state.milestoneByTrack}
              />
            </div>
            <div className="chart-section">
              <NightingaleChart
                milestoneByTrack={this.state.milestoneByTrack}
                previewMilestoneByTrack={this.state.previewMilestoneByTrack}
                focusedTrackId={this.state.focusedTrackId}
                handleTrackMilestoneChangeFn={(track, milestone) =>
                  this.handleTrackMilestoneChange(track, milestone)
                }
              />
            </div>
          </div>
          <TrackSelector
            milestoneByTrack={this.state.milestoneByTrack}
            focusedTrackId={this.state.focusedTrackId}
            setFocusedTrackIdFn={this.setFocusedTrackId.bind(this)}
          />
          <KeyboardListener
            selectNextTrackFn={this.shiftFocusedTrack.bind(this, 1)}
            selectPrevTrackFn={this.shiftFocusedTrack.bind(this, -1)}
            increaseFocusedMilestoneFn={this.shiftFocusedTrackMilestoneByDelta.bind(
              this,
              1
            )}
            decreaseFocusedMilestoneFn={this.shiftFocusedTrackMilestoneByDelta.bind(
              this,
              -1
            )}
          />
          <Track
            milestoneByTrack={this.state.milestoneByTrack}
            previewMilestoneByTrack={this.state.previewMilestoneByTrack}
            trackId={this.state.focusedTrackId}
            handleTrackMilestoneChangeFn={(track, milestone) =>
              this.handleTrackMilestoneChange(track, milestone)
            }
          />
          <div
            style={{
              display: 'flex',
              paddingBottom: '20px',
              paddingTop: '10px'
            }}
          >
            <div style={{ flex: 1 }}>
              Hudl Levels is an extension of Snowflake, made by{' '}
              <a href="https://medium.engineering" target="_blank">
                Medium Eng
              </a>.{' '}
            </div>
          </div>
        </div>
      </main>
    );
  }

  handleTrackMilestoneChange(trackId: TrackId, milestone: Milestone) {
    const previewMilestoneByTrack = this.state.previewMilestoneByTrack;
    previewMilestoneByTrack[trackId] = milestone;
    // const titles = eligibleTitles(previewMilestoneByTrack);
    // const title =
    //   titles.indexOf(this.state.title) === -1 ? titles[0] : this.state.title;
    this.setState({ previewMilestoneByTrack, focusedTrackId: trackId });
  }

  shiftFocusedTrack(delta: number) {
    let index = trackIds.indexOf(this.state.focusedTrackId);
    index = (index + delta + trackIds.length) % trackIds.length;
    const focusedTrackId = trackIds[index];
    this.setState({ focusedTrackId });
  }

  setFocusedTrackId(trackId: TrackId) {
    let index = trackIds.indexOf(trackId);
    const focusedTrackId = trackIds[index];
    this.setState({
      focusedTrackId
    });
  }

  shiftFocusedTrackMilestoneByDelta(delta: number) {
    let prevMilestone = this.state.previewMilestoneByTrack[
      this.state.focusedTrackId
    ];
    let milestone = prevMilestone + delta;
    if (milestone < 0) milestone = 0;
    if (milestone > 5) milestone = 5;
    this.handleTrackMilestoneChange(this.state.focusedTrackId, milestone);
  }

  setTitle(selectedTitle: object) {
    if (selectedTitle) {
      this.setState({
        title: selectedTitle.label,
        milestoneByTrack: {
          MOBILE: selectedTitle.scoredata.KNOWLEDGE,
          WEB_CLIENT: selectedTitle.scoredata.COMMUNICATION,
          FOUNDATIONS: selectedTitle.scoredata.GSD,
          SERVERS: selectedTitle.scoredata.INNOVATION,
          PROJECT_MANAGEMENT: selectedTitle.scoredata.COMPLEXITY,
          COMMUNICATION: selectedTitle.scoredata.OWNERSHIP,
          CRAFT: selectedTitle.scoredata.IMPACT
        },
        previewMilestoneByTrack: {
          MOBILE: selectedTitle.scoredata.KNOWLEDGE,
          WEB_CLIENT: selectedTitle.scoredata.COMMUNICATION,
          FOUNDATIONS: selectedTitle.scoredata.GSD,
          SERVERS: selectedTitle.scoredata.INNOVATION,
          PROJECT_MANAGEMENT: selectedTitle.scoredata.COMPLEXITY,
          COMMUNICATION: selectedTitle.scoredata.OWNERSHIP,
          CRAFT: selectedTitle.scoredata.IMPACT
        }
      });
    }
  }
}

export default SnowflakeApp;
