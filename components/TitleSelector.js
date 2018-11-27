// @flow

import React from 'react';
import { hudlRoles } from '../constants';
import type { MilestoneMap } from '../constants';

let LookupSelect = undefined;
if (typeof window !== 'undefined') {
  LookupSelect = window.__uniformui_Components.LookupSelect;
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
        <LookupSelect
          placeholder="Find a role"
          options={hudlRoles}
          id="role-select"
          onChange={this.props.setTitleFn}
          value={currentValue}
          showAllOptions
        />
      );
    }
    return <div />;
  }
}

export default TitleSelector;
