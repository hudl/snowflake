// @flow

import React from 'react';
import { SizeMe } from 'react-sizeme';
import { trackIds, tracks, categoryColorScale } from '../constants';
import type { MilestoneMap, TrackId } from '../constants';

let SingleSelect = undefined;
if (typeof window !== 'undefined') {
  SingleSelect = window.__uniformui_Components.SingleSelect;
}

type Props = {
  milestoneByTrack: MilestoneMap,
  focusedTrackId: TrackId,
  setFocusedTrackIdFn: TrackId => void
};

class TrackSelector extends React.Component<Props> {
  render() {
    let options = trackIds.map(trackId => {
      return {
        label: tracks[trackId].displayName,
        value: trackId
      };
    });
    return (
      <SizeMe>
        {({ size }) => (
          <div>
            {size.width > 550 && (
              <table>
                <style jsx>{`
                  table {
                    width: 100%;
                    border-spacing: 3px;
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                    margin-left: -3px;
                    border-collapse: separate;
                  }
                  .track-selector-value {
                    line-height: 50px;
                    width: 50px;
                    text-align: center;
                    background: #eee;
                    font-weight: bold;
                    font-size: 24px;
                    border-radius: 3px;
                    cursor: pointer;
                  }
                  .track-selector-label {
                    text-align: center;
                    font-size: 9px;
                  }
                `}</style>
                <tbody>
                  <tr>
                    {trackIds.map(trackId => (
                      <td
                        key={trackId}
                        className="track-selector-label"
                        onClick={() => this.props.setFocusedTrackIdFn(trackId)}
                      >
                        {tracks[trackId].displayName}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {trackIds.map(trackId => (
                      <td
                        key={trackId}
                        className="track-selector-value"
                        style={{
                          border:
                            '4px solid ' +
                            (trackId == this.props.focusedTrackId
                              ? '#000'
                              : categoryColorScale(tracks[trackId].category)),
                          background: categoryColorScale(
                            tracks[trackId].category
                          )
                        }}
                        onClick={() => this.props.setFocusedTrackIdFn(trackId)}
                      >
                        {this.props.milestoneByTrack[trackId]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            )}
            {size.width <= 550 &&
              typeof window !== 'undefined' && (
                <div className="select-track">
                  <SingleSelect
                    options={options}
                    id="track-select"
                    onChange={selectedOption =>
                      this.props.setFocusedTrackIdFn(selectedOption.value)
                    }
                    value={this.props.focusedTrackId}
                    customOption={({ optionData }) => (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>{optionData.label}</div>
                        <div
                          className="uni-margin--half--horiz uni-pad--quarter--vert uni-pad--half--horiz"
                          style={{
                            background: categoryColorScale(
                              tracks[optionData.value].category
                            ),
                            borderRadius: '.25rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {this.props.milestoneByTrack[optionData.value]}
                        </div>
                      </div>
                    )}
                  />
                </div>
              )}
          </div>
        )}
      </SizeMe>
    );
  }
}

export default TrackSelector;
