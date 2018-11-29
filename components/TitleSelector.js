// @flow

import React from 'react';
import { hudlRoles } from '../constants';
import type { MilestoneMap } from '../constants';

let LookupSelect = undefined;
let Icon = undefined;
let Tooltip = undefined;
let Link = undefined;
if (typeof window !== 'undefined') {
  LookupSelect = window.__uniformui_Components.LookupSelect;
  Icon = window.__uniformui_Components.Icon;
  Tooltip = window.__uniformui_Components.Tooltip;
  Link = window.__uniformui_Components.Link;
}

type Props = {
  milestoneByTrack: MilestoneMap,
  currentTitle: String,
  setTitleFn: Object => void
};

class TitleSelector extends React.Component<Props> {
  render() {
    const currentValue =
      this.props.currentTitle !== '' ? this.props.currentTitle : null;
    if (typeof window !== 'undefined') {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <LookupSelect
              placeholder="Find a role"
              options={hudlRoles}
              id="role-select"
              onChange={this.props.setTitleFn}
              value={currentValue}
              showAllOptions
            />
          </div>
          {currentValue !== null && (
            <Tooltip
              position="bottom"
              text="Find Hudlies with this title"
              parent="icon"
            >
              <Link
                href={`https://hudlies.hudltools.com/?search=title:${encodeURI(
                  currentValue
                )}`}
                target="_blank"
                type="wrapper"
              >
                <Icon
                  type="share"
                  color="nonessential"
                  className="uni-margin--half--left"
                />
              </Link>
            </Tooltip>
          )}
        </div>
      );
    }
    return <div />;
  }
}

export default TitleSelector;
