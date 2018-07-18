// @flow

import React from "react";
import { hudlRoles } from "../constants";
import type { MilestoneMap } from "../constants";

let LookupSelect = undefined;
if (typeof window !== "undefined") {
  LookupSelect = window.__uniformui_Components.LookupSelect;
}

type Props = {
  milestoneByTrack: MilestoneMap,
  currentTitle: String,
  setTitleFn: string => void
};

class TitleSelector extends React.Component {
  render() {
    if (typeof window !== "undefined") {
      return (
        <LookupSelect
          placeholder="Find a role"
          options={hudlRoles}
          id="role-select"
        />
      );
    }
    return <div />;
  }
}

export default TitleSelector;
