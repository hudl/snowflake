// @flow

import React from 'react';
import roles from '../static/roles';
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
    let options = {};
    roles.hudlRoles
      .sort((roleA, roleB) => {
        if (roleA.department.toLowerCase() === roleB.department.toLowerCase()) {
          if (roleA.score === roleB.score) {
            if (roleA.title.toLowerCase() < roleB.title.toLowerCase())
              return -1;
            if (roleA.title.toLowerCase() > roleB.title.toLowerCase()) return 1;
            return 0;
          } else {
            return roleA.score - roleB.score;
          }
        } else {
          if (roleA.department.toLowerCase() < roleB.department.toLowerCase())
            return -1;
          if (roleA.department.toLowerCase() > roleB.department.toLowerCase())
            return 1;
          return 0;
        }
      })
      .forEach(role => {
        if (!(role.department in options)) {
          //the department hasn't been added to the options object
          options[role.department] = { label: role.department, options: [] };
        }
        options[role.department].options.push({
          label: role.title,
          value: role.title,
          scoredata: {
            Score: role.score,
            KNOWLEDGE: role.knowledge,
            COMMUNICATION: role.communication,
            GSD: role.gsd,
            INNOVATION: role.innovation,
            COMPLEXITY: role.complexity,
            OWNERSHIP: role.ownership,
            IMPACT: role.impact
          }
        });
      });
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
              options={options}
              id="role-select"
              onChange={this.props.setTitleFn}
              value={currentValue}
              showAllOptions
              maxHeight="300px"
            />
          </div>
          <div
            style={{ visibility: currentValue === null ? 'hidden' : 'visible' }}
          >
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
          </div>
        </div>
      );
    }
    return <div />;
  }
}

export default TitleSelector;
