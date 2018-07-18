// @flow

import { tracks, milestones, categoryColorScale } from "../constants";
import React from "react";
import type { MilestoneMap, TrackId, Milestone } from "../constants";

let Components = undefined;
if (typeof window !== "undefined") {
  Components = window.__uniformui_Components;
}

type Props = {
  milestoneByTrack: MilestoneMap,
  trackId: TrackId,
  handleTrackMilestoneChangeFn: (TrackId, Milestone) => void
};

class Track extends React.Component<Props> {
  render() {
    if (typeof window !== "undefined") {
      const track = tracks[this.props.trackId];
      const currentMilestoneId = this.props.milestoneByTrack[
        this.props.trackId
      ];
      const currentMilestone = track.milestones[currentMilestoneId - 1];
      return (
        <div className="track">
          <style jsx>{`
            div.track {
              border-bottom: 2px solid #ccc;
            }
            h2 {
              margin: 0 0 10px 0;
            }
            p.track-description {
              margin-top: 0;
              padding-bottom: 20px;
              border-bottom: 2px solid #ccc;
            }
            table {
              border-spacing: 3px;
              border-collapse: separate;
            }
            td {
              line-height: 50px;
              width: 50px;
              text-align: center;
              background: #eee;
              font-weight: bold;
              font-size: 24px;
              border-radius: 3px;
              cursor: pointer;
            }
          `}</style>
          <h2>{track.displayName}</h2>
          <p className="track-description">{track.description}</p>
          <div className={"uni-margin--one"} style={{ display: "flex" }}>
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
                              milestone === currentMilestoneId
                                ? "#000"
                                : isMet
                                  ? categoryColorScale(track.category)
                                  : "#eee"
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
            {currentMilestone ? (
              <div className={"uni-margin--two--horiz"}>
                <Components.Headline level="3">
                  {currentMilestone.summary}
                </Components.Headline>
                <Components.Subhead className={"uni-margin--half--vert"}>
                  Example behaviors:
                </Components.Subhead>
                <Components.Text className={"uni-margin--quarter"}>
                  <ul>
                    {currentMilestone.signals.map((signal, i) => (
                      <li key={i}>{signal}</li>
                    ))}
                  </ul>
                </Components.Text>
                <Components.Subhead className={"uni-margin--half--vert"}>
                  Example tasks:
                </Components.Subhead>
                <Components.Text className={"uni-margin--quarter"}>
                  <ul>
                    {currentMilestone.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </Components.Text>
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
