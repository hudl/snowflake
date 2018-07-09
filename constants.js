// @flow
import * as d3 from "d3";

export type TrackId =
  | "MOBILE"
  | "WEB_CLIENT"
  | "FOUNDATIONS"
  | "SERVERS"
  | "PROJECT_MANAGEMENT"
  | "COMMUNICATION"
  | "CRAFT";
export type Milestone = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type MilestoneMap = {
  MOBILE: Milestone,
  WEB_CLIENT: Milestone,
  FOUNDATIONS: Milestone,
  SERVERS: Milestone,
  PROJECT_MANAGEMENT: Milestone,
  COMMUNICATION: Milestone,
  CRAFT: Milestone
};
export const milestones = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const milestoneToPoints = (
  milestone: Milestone,
  trackId: TrackId
): number => {
  console.log(trackId);
  if (trackId === "CRAFT") {
    return milestone * 2;
  } else {
    return milestone;
  }
};

export const pointsToLevels = {
  "0": "1",
  "20": "2",
  "24": "3",
  "29": "4",
  "34": "5",
  "38": "6",
  "43": "7",
  "47": "8",
  "49": "9",
  "51": "10"
};

export const maxLevel = 52;

export type Track = {
  displayName: string,
  category: string, // TK categoryId type?
  description: string,
  milestones: {
    summary: string,
    signals: string[],
    examples: string[]
  }[]
};

type Tracks = {|
  MOBILE: Track,
  WEB_CLIENT: Track,
  FOUNDATIONS: Track,
  SERVERS: Track,
  PROJECT_MANAGEMENT: Track,
  COMMUNICATION: Track,
  CRAFT: Track,
  INITIATIVE: Track
|};

export const tracks: Tracks = {
  MOBILE: {
    displayName: "Knowledge",
    category: "Responsibility",
    description: "Experience Required.",
    milestones: [
      {
        summary:
          "Basic skills or knowledge that require only a few hours to learn. No previous experience or knowledge needed.",
        signals: [
          "Completes tasks that are repeated over and over again",
          "Supports functions that are easily understood and trained within a few hours"
        ],
        examples: [
          "Processing paperwork",
          "Sorting documentation",
          "Moving equipment"
        ]
      },
      {
        summary:
          "Standardized and clear instructions reinforced by job experience over a period of months. No previous experience or training needed, but a basic understanding of the concepts.",
        signals: [
          "Completes tasks that are simple in nature, but could be different from day-to-day"
        ],
        examples: [
          "Answering simple questions",
          "Researching problems identified by others",
          "Booking/scheduling events or travel"
        ]
      },
      {
        summary:
          "Entry-level knowledge and decision-making abilities. No formal training or University and/or less than one year of experience.",
        signals: [
          "Shares perspective openly",
          "Asks insightful questions to understand"
        ],
        examples: [
          "Answers questions that may require research",
          "Solves simple problems where solutions already exist",
          "Uses a supervisor/mentor to solve problems where answers may not exist"
        ]
      },
      {
        summary:
          "Formal training and/or degree in the topic/area that is owned.",
        signals: [
          "Leverages knowledge of the topic to share their perspective",
          "Actively seeks out information for topics they're not trained in"
        ],
        examples: [
          "Completes projects independently that are within scope of knowledge-base",
          "Decision-making autonomy for simple tasks",
          "Works collaboratively to solve problems that are not within scope of knowledge-base"
        ]
      },
      {
        summary:
          "Advanced training and/or prior professional experience required.",
        signals: [
          "Leverages training and experience to share perspective on topic at hand",
          "Draws from previous experience to provide higher-level thinking/questions"
        ],
        examples: [
          "Solving complex problems within area of expertise",
          "Identifying problems that need to be solved"
        ]
      },
      {
        summary:
          "Deep knowledge or experience, typically gained over multiple professional experiences, advanced certification, and/or significant time in the industry.",
        signals: [
          "Provides experienced insight for topics at hand",
          "Shares experience openly",
          "Draws from a broad range of experiences to provide perspective"
        ],
        examples: [
          "Solving problems that are complex, using collaboration for areas outside of expertise",
          "Actively challenging norms to further Hudl",
          "Creating recommendations based on benchmarking experience"
        ]
      },
      {
        summary: "Expert in the field or industry.",
        signals: [
          "Provides experienced direction for topics at hand",
          "Shares expertise openly",
          "Connects frequently with other experts in the industry to continue building professional networks"
        ],
        examples: [
          "Building strategy for area of expertise",
          "Creating a comprehensive analysis of Hudl's position compared to competitors"
        ]
      },
      {
        summary: "Seasoned expert in the industry.",
        signals: [
          "Provides experienced direction for topics at hand",
          "Shares expertise openly, inlfuencing those around them",
          "Connects Hudl with peers in the industry to help us level-up"
        ],
        examples: [
          "Setting vision for team",
          "Providing updates to the Board",
          "Hosting external benchmarking sessions"
        ]
      }
    ]
  },

  WEB_CLIENT: {
    displayName: "Communication",
    category: "Responsibility",
    description: "Person to person skills.",
    milestones: [
      {
        summary:
          "The most basic communication skills are required - mostly written, wiht very little interpersonal requirements",
        signals: [
          "Transfers information from one source to another",
          "Provides updates on information that already exists"
        ],
        examples: [
          "Updates Sync Pages",
          "Types up notes that someone else took"
        ]
      },
      {
        summary:
          "Entry-level communication requirements - written and verbal, but little to no reasoning required.",
        signals: [
          "Executes tasks that have been clearly defined",
          "Coordinates activities where outcomes are clear"
        ],
        examples: ["Scheduling meetings", "Taking notes"]
      },
      {
        summary:
          "Communication skills that require interpersonal interactions but are limited to less than 50% of the job duties.",
        signals: [
          "Draws connections between closely related topics",
          "Interacts with others kindly and efficiently (but limited to less than 50% of their core role)"
        ],
        examples: [
          "Managing a single calendar (outside of own)",
          "Scheduling and coordinating simple events"
        ]
      },
      {
        summary:
          "Communication that involves basic reasoning, requesting and providing information. Courtesy, fact and effectiveness are required.",
        signals: [
          "Draws connections between multiple points",
          "Distills information down to the key messages",
          "Interacts with others kindly and efficiently"
        ],
        examples: [
          "Managing multiple calendars",
          "Planning events",
          "Interacting with external clients/hires"
        ]
      },
      {
        summary:
          "Communication that requires understanding, influencing and supporting people.  Focused on causing action or acceptance by others.",
        signals: [
          "Seeks to understand before they seek to influence",
          "Asks insightful questions",
          "Makes connections between what people are saying and what needs to happen to achieve an outcome"
        ],
        examples: [
          "Working cross-functionally on a project/goal",
          "Identifying dependencies"
        ]
      },
      {
        summary:
          "Communication that is focused on influencing, developing and motivating people to demonstrate a shift or change in their behavior.",
        signals: [
          "Works collaboritvely to find creative solutions",
          "Influences others through building trusting relationships"
        ],
        examples: [
          "Developing team/peers through trusting relationships and #realtalk",
          "Communicating mistakes openly to help others learn",
          "Leading a cross-functional effort to achieve a milestone or goal"
        ]
      },
      {
        summary:
          "Influencing that requires integration of multiple areas/topics AND impacts significant business strategies (i.e. an entire functional area, tribe). Must be a minimum of 50% of core role's responsibilities.",
        signals: [
          "Takes disperate information and synthesizes it into a cohesive recommendation that impacts Hudl's business strategies",
          "Leverages collaboration to drive business results"
        ],
        examples: [
          "Providing strategic recommendations through collaborative partnerships with peers",
          "Identifying cross-functional roadblocks and providing collaborative solutions"
        ]
      },
      {
        summary:
          "Influencing significant beahvior change within the Senior-Most Leadership Team that impacts Hudl's strategic priorities and decisions (SPG, WLB). Must be a minimum of 75% of core role's responsibilities.",
        signals: [
          "Works collaboratively with Sr. Leadership to set direction for strategy",
          "Shares teams wins and opportunities openly during strategic meetings"
        ],
        examples: [
          "Actively participates in SPG and/or WLB meetings",
          "Sharing wins/oppportunities to help Hudl learn from our mistakes"
        ]
      }
    ]
  },

  FOUNDATIONS: {
    displayName: "GSD",
    category: "Responsibility",
    description: "GSD factor. How and what needs to get done.",
    milestones: [
      {
        summary: "Tasks are identified and laid out in advance.",
        signals: [],
        examples: []
      },
      {
        summary: "Tasks are laid out and defined, but may change periodically.",
        signals: [],
        examples: []
      },
      {
        summary:
          "Manage multiple activities, but how those are completed is clear and defined. Work collaboratively with other Hudlies to get things done (execute on plans).  ",
        signals: [],
        examples: []
      },
      {
        summary:
          "General guidance, but some autonomy in how the work gets done. Works collaboratively with other Hudlies to solve problems together.",
        signals: [],
        examples: []
      },
      {
        summary:
          "Work collaboratively to identify and solve problems that may not seem related. Identifies problems that impact Hudl's success regardless of areas of ownership.",
        signals: [],
        examples: []
      },
      {
        summary:
          "Strategic integration and leadership of important business goals.",
        signals: [],
        examples: []
      },
      {
        summary:
          "Direction of a strategic function within and across the organization.",
        signals: [],
        examples: []
      },
      {
        summary: "Direction of an Enterprise Function (i.e. C-Suite)",
        signals: [],
        examples: []
      }
    ]
  },

  SERVERS: {
    displayName: "Innovation",
    category: "Scope",
    description:
      "The degree to which thinking is constrained by rules, methods, procedures, precedents, policies, strategy, etc",
    milestones: [
      {
        summary:
          "Thinking within clear objectives, with no room for iteration.",
        signals: [],
        examples: []
      },
      {
        summary:
          "Thinking within very detailed and precisely defined rules and instructions, with some room for iteration (less than 20%).",
        signals: [],
        examples: []
      },
      {
        summary:
          "Precedence and standards exist, but identifying the problem and applying those standards is required.",
        signals: [],
        examples: []
      },
      {
        summary:
          "SEMI-ROUTINE: Thinking within a well-defined area with many precedents covering most situations and/or readily available assistance.",
        signals: [],
        examples: []
      },
      {
        summary:
          "VARIED: Thinking within multiple, substantially different areas and precedents, with access to assistance.",
        signals: [],
        examples: []
      },
      {
        summary:
          "Thinking within a defined area and/or objectives (i.e. functional area, tribe or bet), where innivation is required (more than 50% of the role).",
        signals: [],
        examples: []
      },
      {
        summary:
          " Thinking within broad area and/or objectives (i.e. work impacts multiple areas) where innovation is required as core part of the role (minimum of 50%).",
        signals: [],
        examples: []
      },
      {
        summary: "Charting the unknown.",
        signals: [],
        examples: []
      }
    ]
  },

  PROJECT_MANAGEMENT: {
    displayName: "Complexity",
    category: "Scope",
    description:
      "The complexity of the problems encountered and the extent to which original thinking must be employed to arrive at solutions.",
    milestones: [
      {
        summary: "",
        signals: [],
        examples: []
      },
      {
        summary:
          "REPETITIVE: Identical situation requiring solution by simple choice of things learned.",
        signals: [],
        examples: []
      },
      {
        summary:
          "PATTERNED: Similar situations requiring solutions by the deciding between known alternatives.",
        signals: [],
        examples: []
      },
      {
        summary:
          "VARIABLE: Different situations requring identification of issues, judgment, and the selection of solutions within an area of expertise.",
        signals: [],
        examples: []
      },
      {
        summary:
          "ADAPTIVE: Situation constantly requiring adaptation or development of new solutions through innovative thinking",
        signals: [],
        examples: []
      },
      {
        summary:
          "UNCHARTED: Novel & path finding situations, requiring the development of new concepts and imaginative solutions for which there are no precedents.",
        signals: [],
        examples: []
      }
    ]
  },

  COMMUNICATION: {
    displayName: "Ownership",
    category: "Scope",
    description:
      "The extent to which the job/role has autonomy to determine meansures and action to be taken to achieve results.",
    milestones: [
      {
        summary: "",
        signals: [],
        examples: []
      },
      {
        summary:
          "CLOSELY CONTROLLED: Operating within direct and detailed instructions with very close and continuous supervision.",
        signals: [],
        examples: []
      },
      {
        summary:
          "CONTROLLED: Clear instructions and established work routines, under close supervision.",
        signals: [],
        examples: []
      },
      {
        summary:
          "STANDARDIZED: Operating within standardized practices, general work instructions and supervision of progress and results.",
        signals: [],
        examples: []
      },
      {
        summary:
          "GENERALLY REGULATED: Operating within practices and procedures covered by precendents or well-defined policies and review of end results.",
        signals: [],
        examples: []
      },
      {
        summary:
          "CLEARLY DIRECTED: Subject to broad practices and procedures covered by functional precedents and policies and managerial direction.",
        signals: [],
        examples: []
      },
      {
        summary:
          "GENERALLY DIRECTED: Subject to general direction and broadly defined policy objectives.",
        signals: [],
        examples: []
      },
      {
        summary:
          "GUIDED: Subject only to overall guidance on broad organizational objectives and collection of strategic policy.",
        signals: [],
        examples: []
      }
    ]
  },

  CRAFT: {
    displayName: "Impact",
    category: "Impact",
    description:
      "The nature of the influence (direct or indirect) the job has on end results.",
    milestones: [
      {
        summary: "",
        signals: [],
        examples: []
      },
      {
        summary:
          "PRIMARY: No financial impact. Little or no shared responsibility or impact on others.",
        signals: [],
        examples: []
      },
      {
        summary:
          "SHARED: Partnership and common responsibiltiies with other roles/functions. OR - impact that reaches one department/business unit.",
        signals: [],
        examples: []
      },
      {
        summary:
          "CONTRIBUTIVE: Works collaboratively to define direction focused on achieving critical business impact. And/or impact that is inter-departmental/multiple business units.",
        signals: [],
        examples: []
      },
      {
        summary:
          "DIRECTIVE: Defines/sets direction for others to achieve critical business impact. And/or impact that is company-wide.",
        signals: [],
        examples: []
      }
    ]
  }
};

export const trackIds: TrackId[] = Object.keys(tracks);

export const categoryIds: Set<string> = trackIds.reduce((set, trackId) => {
  set.add(tracks[trackId].category);
  return set;
}, new Set());

export const categoryPointsFromMilestoneMap = (milestoneMap: MilestoneMap) => {
  let pointsByCategory = new Map();
  trackIds.forEach(trackId => {
    const milestone = milestoneMap[trackId];
    const categoryId = tracks[trackId].category;
    let currentPoints = pointsByCategory.get(categoryId) || 0;
    pointsByCategory.set(
      categoryId,
      currentPoints + milestoneToPoints(milestone, trackId)
    );
  });
  return Array.from(categoryIds.values()).map(categoryId => {
    const points = pointsByCategory.get(categoryId);
    return { categoryId, points: pointsByCategory.get(categoryId) || 0 };
  });
};

export const totalPointsFromMilestoneMap = (
  milestoneMap: MilestoneMap
): number =>
  trackIds
    .map(trackId => milestoneToPoints(milestoneMap[trackId], trackId))
    .reduce((sum, addend) => sum + addend, 0);

export const categoryColorScale = d3
  .scaleOrdinal()
  .domain(categoryIds)
  .range(["#ff6300", "#4e5d6c", "#009ce3"]);

export const titles = [
  { label: "Engineer I", minPoints: 0, maxPoints: 16 },
  { label: "Engineer II", minPoints: 17, maxPoints: 35 },
  { label: "Senior Engineer", minPoints: 36, maxPoints: 57 },
  { label: "Group Lead", minPoints: 36, maxPoints: 57 },
  { label: "Staff Engineer", minPoints: 58, maxPoints: 89 },
  { label: "Senior Group Lead", minPoints: 58, maxPoints: 89 },
  { label: "Principal Engineer", minPoints: 90 },
  { label: "Director of Engineering", minPoints: 90 }
];

export const eligibleTitles = (milestoneMap: MilestoneMap): string[] => {
  const totalPoints = totalPointsFromMilestoneMap(milestoneMap);

  return titles
    .filter(
      title =>
        (title.minPoints === undefined || totalPoints >= title.minPoints) &&
        (title.maxPoints === undefined || totalPoints <= title.maxPoints)
    )
    .map(title => title.label);
};
