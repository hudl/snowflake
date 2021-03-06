// @flow

import { tracks, milestones, categoryColorScale } from '../constants';
import React from 'react';
import type { MilestoneMap, TrackId, Milestone } from '../constants';

let Components = undefined;
if (typeof window !== 'undefined') {
  Components = window.__uniformui_Components;
}

type Props = {
  milestoneByTrack: MilestoneMap,
  previewMilestoneByTrack: MilestoneMap,
  trackId: TrackId,
  handleTrackMilestoneChangeFn: (TrackId, Milestone) => void
};

class Track extends React.Component<Props> {
  render() {
    if (typeof window !== 'undefined') {
      const track = tracks[this.props.trackId];
      const currentMilestoneId = this.props.milestoneByTrack[
        this.props.trackId
      ];
      const currentMilestone = track.milestones[currentMilestoneId - 1];
      const previewMilestoneId = this.props.previewMilestoneByTrack[
        this.props.trackId
      ];
      const previewMilestone = track.milestones[previewMilestoneId - 1];
      return (
        <div className="track">
          <style jsx>{`
            div.track {
              border-bottom: 1px solid rgba(167, 174, 181, 0.6);
            }
            h2 {
              margin: 0 0 10px 0;
            }
            p.track-description {
              margin-top: 10px;
              padding-bottom: 20px;
              border-bottom: 1px solid rgba(167, 174, 181, 0.6);
            }
            table {
              border-spacing: 3px;
              border-collapse: separate;
              flex-shrink: 0;
            }
            td {
              line-height: 50px;
              width: 50px;
              text-align: center;
              background: rgb(249, 250, 251);
              font-weight: bold;
              font-size: 24px;
              border-radius: 3px;
              cursor: pointer;
            }
          `}</style>
          <h2 className="track-title">{track.displayName}</h2>
          <p className="track-description">{track.description}</p>
          <div className={'uni-margin--one'} style={{ display: 'flex' }}>
            <table>
              <tbody>
                {milestones
                  .slice()
                  .reverse()
                  .map(milestone => {
                    const isMet = milestone <= currentMilestoneId;
                    return (
                      <tr key={milestone}>
                        <td
                          onClick={() =>
                            this.props.handleTrackMilestoneChangeFn(
                              this.props.trackId,
                              milestone
                            )
                          }
                          style={{
                            border: `4px solid ${
                              milestone === previewMilestoneId
                                ? '#000'
                                : isMet
                                ? categoryColorScale(track.category)
                                : 'rgb(249, 250, 251)'
                            }`,
                            background: isMet
                              ? categoryColorScale(track.category)
                              : undefined
                          }}
                        >
                          {milestone}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {previewMilestone ? (
              <div className={'uni-margin--one--left'}>
                <Components.Headline level="3">
                  {previewMilestone.summary}
                </Components.Headline>
                <Components.Subhead className={'uni-margin--half--vert'}>
                  Example behaviors:
                </Components.Subhead>
                <ul>
                  {previewMilestone.signals.map((signal, i) => (
                    <Components.Text className={'uni-margin--quarter'} key={i}>
                      <li>{signal}</li>
                    </Components.Text>
                  ))}
                </ul>
                <Components.Subhead className={'uni-margin--half--vert'}>
                  Example tasks:
                </Components.Subhead>
                <ul>
                  {previewMilestone.examples.map((example, i) => (
                    <Components.Text className={'uni-margin--quarter'} key={i}>
                      <li>{example}</li>
                    </Components.Text>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    return <div />;
  }
}

export default Track;
