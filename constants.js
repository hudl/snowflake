// @flow
import * as d3 from 'd3';

export type TrackId =
  | 'MOBILE'
  | 'WEB_CLIENT'
  | 'FOUNDATIONS'
  | 'SERVERS'
  | 'PROJECT_MANAGEMENT'
  | 'COMMUNICATION'
  | 'CRAFT';
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
  if (trackId === 'CRAFT') {
    return milestone * 2;
  } else {
    return milestone;
  }
};

export const pointsToLevels = {
  '0': '1',
  '20': '2',
  '24': '3',
  '29': '4',
  '34': '5',
  '38': '6',
  '43': '7',
  '47': '8',
  '49': '9',
  '51': '10'
};

export const maxLevel = 64;

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
    displayName: 'Knowledge',
    category: 'Responsibility',
    description: 'Experience Required.',
    milestones: [
      {
        summary:
          'Basic skills or knowledge that require only a few hours to learn. No previous experience or knowledge needed.',
        signals: [
          'Completes tasks that are repeated over and over again',
          'Supports functions that are easily understood and trained within a few hours'
        ],
        examples: [
          'Processing paperwork',
          'Sorting documentation',
          'Moving equipment'
        ]
      },
      {
        summary:
          'Standardized and clear instructions reinforced by job experience over a period of months. No previous experience or training needed, but a basic understanding of the concepts.',
        signals: [
          'Completes tasks that are simple in nature, but could be different from day-to-day'
        ],
        examples: [
          'Answering simple questions',
          'Researching problems identified by others',
          'Booking/scheduling events or travel'
        ]
      },
      {
        summary:
          'Entry-level knowledge and decision-making abilities. No formal training or University and/or less than one year of experience.',
        signals: [
          'Shares perspective openly',
          'Asks insightful questions to understand'
        ],
        examples: [
          'Answers questions that may require research',
          'Solves simple problems where solutions already exist',
          'Uses a supervisor/mentor to solve problems where answers may not exist'
        ]
      },
      {
        summary:
          'Formal training and/or degree in the topic/area that is owned.',
        signals: [
          'Leverages knowledge of the topic to share their perspective',
          "Actively seeks out information for topics they're not trained in"
        ],
        examples: [
          'Completes projects independently that are within scope of knowledge-base',
          'Decision-making autonomy for simple tasks',
          'Works collaboratively to solve problems that are not within scope of knowledge-base'
        ]
      },
      {
        summary:
          'Advanced training and/or prior professional experience required.',
        signals: [
          'Leverages training and experience to share perspective on topic at hand',
          'Draws from previous experience to provide higher-level thinking/questions'
        ],
        examples: [
          'Solving complex problems within area of expertise',
          'Identifying problems that need to be solved'
        ]
      },
      {
        summary:
          'Deep knowledge or experience, typically gained over multiple professional experiences, advanced certification, and/or significant time in the industry.',
        signals: [
          'Provides experienced insight for topics at hand',
          'Shares experience openly',
          'Draws from a broad range of experiences to provide perspective'
        ],
        examples: [
          'Solving problems that are complex, using collaboration for areas outside of expertise',
          'Actively challenging norms to further Hudl',
          'Creating recommendations based on benchmarking experience'
        ]
      },
      {
        summary: 'Expert in the field or industry.',
        signals: [
          'Provides experienced direction for topics at hand',
          'Shares expertise openly',
          'Connects frequently with other experts in the industry to continue building professional networks'
        ],
        examples: [
          'Building strategy for area of expertise',
          "Creating a comprehensive analysis of Hudl's position compared to competitors"
        ]
      },
      {
        summary: 'Seasoned expert in the industry.',
        signals: [
          'Provides experienced direction for topics at hand',
          'Shares expertise openly, inlfuencing those around them',
          'Connects Hudl with peers in the industry to help us level-up'
        ],
        examples: [
          'Setting vision for team',
          'Providing updates to the Board',
          'Hosting external benchmarking sessions'
        ]
      }
    ]
  },

  WEB_CLIENT: {
    displayName: 'Communication',
    category: 'Responsibility',
    description: 'Person to person skills.',
    milestones: [
      {
        summary:
          'The most basic communication skills are required - mostly written, wiht very little interpersonal requirements',
        signals: [
          'Transfers information from one source to another',
          'Provides updates on information that already exists'
        ],
        examples: [
          'Updates Sync Pages',
          'Types up notes that someone else took'
        ]
      },
      {
        summary:
          'Entry-level communication requirements - written and verbal, but little to no reasoning required.',
        signals: [
          'Executes tasks that have been clearly defined',
          'Coordinates activities where outcomes are clear'
        ],
        examples: ['Scheduling meetings', 'Taking notes']
      },
      {
        summary:
          'Communication skills that require interpersonal interactions but are limited to less than 50% of the job duties.',
        signals: [
          'Draws connections between closely related topics',
          'Interacts with others kindly and efficiently (but limited to less than 50% of their core role)'
        ],
        examples: [
          'Managing a single calendar (outside of own)',
          'Scheduling and coordinating simple events'
        ]
      },
      {
        summary:
          'Communication that involves basic reasoning, requesting and providing information. Courtesy, fact and effectiveness are required.',
        signals: [
          'Draws connections between multiple points',
          'Distills information down to the key messages',
          'Interacts with others kindly and efficiently'
        ],
        examples: [
          'Managing multiple calendars',
          'Planning events',
          'Interacting with external clients/hires'
        ]
      },
      {
        summary:
          'Communication that requires understanding, influencing and supporting people.  Focused on causing action or acceptance by others.',
        signals: [
          'Seeks to understand before they seek to influence',
          'Asks insightful questions',
          'Makes connections between what people are saying and what needs to happen to achieve an outcome'
        ],
        examples: [
          'Working cross-functionally on a project/goal',
          'Identifying dependencies'
        ]
      },
      {
        summary:
          'Communication that is focused on influencing, developing and motivating people to demonstrate a shift or change in their behavior.',
        signals: [
          'Works collaboritvely to find creative solutions',
          'Influences others through building trusting relationships'
        ],
        examples: [
          'Developing team/peers through trusting relationships and #realtalk',
          'Communicating mistakes openly to help others learn',
          'Leading a cross-functional effort to achieve a milestone or goal'
        ]
      },
      {
        summary:
          "Influencing that requires integration of multiple areas/topics AND impacts significant business strategies (i.e. an entire functional area, tribe). Must be a minimum of 50% of core role's responsibilities.",
        signals: [
          "Takes disperate information and synthesizes it into a cohesive recommendation that impacts Hudl's business strategies",
          'Leverages collaboration to drive business results'
        ],
        examples: [
          'Providing strategic recommendations through collaborative partnerships with peers',
          'Identifying cross-functional roadblocks and providing collaborative solutions'
        ]
      },
      {
        summary:
          "Influencing significant beahvior change within the Senior-Most Leadership Team that impacts Hudl's strategic priorities and decisions (SPG, WLB). Must be a minimum of 75% of core role's responsibilities.",
        signals: [
          'Works collaboratively with Sr. Leadership to set direction for strategy',
          'Shares teams wins and opportunities openly during strategic meetings'
        ],
        examples: [
          'Actively participates in SPG and/or WLB meetings',
          'Sharing wins/oppportunities to help Hudl learn from our mistakes'
        ]
      }
    ]
  },

  FOUNDATIONS: {
    displayName: 'GSD',
    category: 'Responsibility',
    description: 'GSD factor. How and what needs to get done.',
    milestones: [
      {
        summary: 'Tasks are identified and laid out in advance.',
        signals: ["Completes tasks as they've been assigned"],
        examples: [
          'Scheduling meetings',
          'Moving equipment',
          'Printing/Making copies of documents'
        ]
      },
      {
        summary: 'Tasks are laid out and defined, but may change periodically.',
        signals: [
          'Completes tasks that have been outlined, but has ownership over when they get completed',
          'Completes a variety of tasks over a given period of time'
        ],
        examples: [
          'Coordinating events',
          'Responding to questions in slack',
          'Updating Sync Pages as assigned'
        ]
      },
      {
        summary:
          'Manage multiple activities, but how those are completed is clear and defined. Work collaboratively with other Hudlies to get things done (execute on plans).  ',
        signals: [
          'Works with other Hudlies to meet deadlines and ensure work is complete.',
          'Owns and executes activities/tasks that are clearly defined, but require autonomy to complete.'
        ],
        examples: [
          'Completing assignments on time and with great quality',
          'Managing time effectively to ensure work is completed as assigned'
        ]
      },
      {
        summary:
          'General guidance, but some autonomy in how the work gets done. Works collaboratively with other Hudlies to solve problems together.',
        signals: [
          'Demonstrates accountability for activities they are assigned.',
          'Works with other Hudlies to solve problems.'
        ],
        examples: [
          'Working on a team to solve a problem together',
          "Delivering value through daily work within the scope of what's been assigned",
          'Challenging norms to ensure work is consistently improving'
        ]
      },
      {
        summary:
          "Work collaboratively to identify and solve problems that may not seem related. Identifies problems that impact Hudl's success regardless of areas of ownership.",
        signals: [
          "Works with other Hudlies to identify and solve problems and make connections between competing priorities and/or work that isn't clearly outlined.",
          'Identifies problems that impact Hudl outside scope of ownership.'
        ],
        examples: [
          "Identifying problems that impact Hudl's success and raising those concerns to own leader",
          'Delivering value through daily work through identifying issues and solving them collaboratively',
          'Setting personal or team goals based on priorities defined by their leader'
        ]
      },
      {
        summary:
          'Strategic integration and leadership of important business goals.',
        signals: [
          'Leverages strategic thinking to identify and execute business goals for a broad audience (tribe, bet, team, etc)',
          'Identifies and has ownership/authority to remove dependencies and roadblocks for strategic goals'
        ],
        examples: [
          'Leading strategy sessions for area of ownership',
          'Identifying key metrics and measuring pogress towards goals',
          "Bringing roadblocks to leadership's attention"
        ]
      },
      {
        summary:
          'Direction of a strategic function within and across the organization.',
        signals: [
          'Directs vision, strategy and work for an enterprise function that impacts Hudl (i.e. Marketing, Sales, Operations, Engineering, etc).',
          'Partners collaboritvely with other Enterprise Sr. Leaders to identify dependencies and remove roadblocks.'
        ],
        examples: [
          'Leading future strategy sessions for area of ownership that is large-scale in nature',
          'Identifying key metrics and measuring progress towards goals',
          'Holding team accountable to delivering results',
          "Clearly connecting own roadmap to Hudl's Strategy and mountain goals"
        ]
      },
      {
        summary: 'Direction of an Enterprise Function (i.e. C-Suite)',
        signals: ['Directs vision, strategy and work for all of Hudl.'],
        examples: [
          'Leads Future Strategy Sessions',
          'Works directly with the Board'
        ]
      }
    ]
  },

  SERVERS: {
    displayName: 'Innovation',
    category: 'Scope',
    description: 'Innovative thinking requirements',
    milestones: [
      {
        summary:
          'Thinking within clear objectives, with no room for iteration.',
        signals: [
          'Completes assignments exactly as assigned',
          'Uses scripts to respond to questions'
        ],
        examples: ['Taking direction and executing on it']
      },
      {
        summary:
          'Thinking within very detailed and precisely defined rules and instructions, with some room for iteration (less than 20%).',
        signals: [
          'Asks questions to ensure thorough understanding of tasks assigned',
          'Makes minor improvements to process to ensure efficiency'
        ],
        examples: [
          'Asking questions to ensure understanding',
          'Suggesting minor improvements to simple processes'
        ]
      },
      {
        summary:
          'Precedence and standards exist, but identifying the problem and applying those standards is required.',
        signals: [
          'Demonstrates curiosity to identify root cause of issues',
          'Leverages information available to solve problems'
        ],
        examples: [
          'Using insight to understand problems thoroughly',
          'Leveraging resources available to identify solutions'
        ]
      },
      {
        summary:
          'Thinking within a well-defined area with precedents covering less than half of the situations and/or readily available assistance.',
        signals: [
          'Leverages existing knowledge/experience to identify and solve problems',
          'Asks questions to root cause',
          'Finds creative solutions to novel problems'
        ],
        examples: [
          'Providing fresh perspective on identified problems',
          'Asking insightful questions to identify root cause',
          'Demonstrating creativity in delivering outcomes'
        ]
      },
      {
        summary:
          'Thinking within multiple, substantially different areas and precedents, where innovation is required.',
        signals: [
          'Draws connections between seemingly unconnected issues',
          'Applies innovation and creativity to identify solutions to problems previously not encountered',
          'Has ownership to implement solutions'
        ],
        examples: [
          'Identifying dependencies that impact project success',
          'Shifting priorirites to deliver more innovative solutions',
          'Challenging the status quo'
        ]
      },
      {
        summary:
          'Thinking within a defined area and/or objectives (i.e. functional area, tribe or bet), where innovation is required (more than 50% of the role).',
        signals: [
          'Applies innovative thinking to novel problems that impact a defined area or objectives that have already been laid out',
          'Uses open-ended questions to understand the problems',
          'Provides recommendations on future strategies'
        ],
        examples: [
          'Identifying future needs and providing recommendations on strategy',
          'Setting vision and direction for a team',
          'Demonstrating accountability to deliver novel solutions'
        ]
      },
      {
        summary:
          'Thinking within broad area and/or objectives (i.e. work impacts multiple areas) where innovation is required as core part of the role (minimum of 50%).',
        signals: [
          'Applies innovative thinking to novel problems that impact a broad function (enterprise)',
          'Approaches problems with a beginners mind/open mind',
          'Provides direction on future strategies'
        ],
        examples: [
          'Identifying strategic direction for Hudl or an enterprise function at Hudl',
          'Setting vision and direction for an enterprise function that requires innovation',
          'Demonstrating accountability to deliver innovative solutions'
        ]
      },
      {
        summary: 'Charting the unknown.',
        signals: [
          'Defines new areas of focus',
          'Applies innovation to all strategy and thought',
          "Seeks to understand competition and how it impacts Hudl's approach"
        ],
        examples: [
          'Identifying new business ideas for Hudl',
          'Setting the standard and/or disrupting the industry'
        ]
      }
    ]
  },

  PROJECT_MANAGEMENT: {
    displayName: 'Complexity',
    category: 'Scope',
    description: 'Complexity of problems.',
    milestones: [
      {
        summary: 'No complexity, problems and solutions cleary laid out.',
        signals: ['Executes on solutions that have already been defined'],
        examples: [
          'Answering questions using a script',
          'Giving directions to meeting rooms'
        ]
      },
      {
        summary:
          'Minimal problems, all requiring solution by simple choice of things learned.',
        signals: [
          'Uses Sync to answer simple questions',
          'Uses job aids/guides to complete tasks'
        ],
        examples: [
          'Giving office tours',
          'Researching questions and finding answers from a list of solutions',
          'Updating sync pages with a template'
        ]
      },
      {
        summary:
          'Similar situations/problems requiring solutions by deciding between known alternatives.',
        signals: [
          'Uses sync resources to solve common problems',
          'Demonstrates judgment in understanding problems to identify solutions'
        ],
        examples: [
          'Asking insightful questions to root cause problems',
          'Researching solutions and providing clarity on path forward to common problems',
          'Making suggestions for process improvements'
        ]
      },
      {
        summary:
          'Different situations/problems requring identification of issues, judgment, and the selection of solutions within an area of expertise.',
        signals: [
          'Uses experience and judgement to identify solutions to new problems',
          'Root causes problems that require a level of expertise in the area'
        ],
        examples: [
          'Working collaboratively to deliver a product or an improvement to an existing product',
          'Using foresight to share potential risks with Leadership'
        ]
      },
      {
        summary:
          'Situation/problems constantly require adaptation or development of new solutions.',
        signals: [
          'Exibits creativity through development of novel solutions',
          "Solves problems that are complex and don't have a clear path forward"
        ],
        examples: [
          'Acting as a peer leader to work collaboratively to deliver a new product or a significant improvement on existing product',
          'Identiifying and removing roadblocks that are critical to project success'
        ]
      },
      {
        summary:
          'Situations/problems constantly require adaptation or development of new solutions and are almost always (more than 75%) cross-functional in impact.',
        signals: [
          'Identifies unique solutions to complex problems that impact multiple areas of Hudl',
          'Sets vision for cross-functional teams that drive creative solutions'
        ],
        examples: [
          'Pitching and creating a roadmap for a bet',
          'Leading a bet, tribe or large cross-functional effort'
        ]
      },
      {
        summary:
          'Novel and path finding situations/problems, requiring development of new concepts and imaginative solutions for which there are no precedents.',
        signals: [
          "Provides creative solutions for problems that impact Hudl's bottom line",
          'Communicates short and long-term impact and risk of solutions/ideas',
          'Solves problems for which there is no benchmark (or few examples in the market)'
        ],
        examples: [
          'Completing a thorough assessment of new markets',
          'Building a strategic roadmap that impacts mountain goals',
          'Providing Sr. Leadership with a risk/reward analysis of a novel strategy'
        ]
      },
      {
        summary:
          'Problems/situations are novel and solutions required are detrimental to the success of Hudl. (must be a core function of the role)',
        signals: [
          "Provides innovative solutions to novel problems that are detrimental to Hudl's future"
        ],
        examples: [
          'Providing Sr. Leadership with strategic outlines of competitors and their advantages',
          'Leading strategy sessions that identify future focuses for Hudl',
          'Setting long-term vision for Hudl'
        ]
      }
    ]
  },

  COMMUNICATION: {
    displayName: 'Ownership',
    category: 'Scope',
    description: 'Autonomy and requirement to achieve results.',
    milestones: [
      {
        summary:
          'Operating within direct and detailed instructions with very close and continuous supervision.',
        signals: [
          'Completes tasks as assigned',
          'Reads or follows directions to completion'
        ],
        examples: [
          'Updating sync pages',
          'Running audits',
          'Scheduling meetings'
        ]
      },
      {
        summary:
          'Clear instructions and established work routines, under close supervision.',
        signals: [
          'Completes activities that have been clearly outlined',
          'Works closely with superviser to ensure accuracy and efficiency'
        ],
        examples: [
          'Creating meeting agendas',
          'Coordinating schedules or events',
          'Answering simple questions'
        ]
      },
      {
        summary:
          'Operating within standardized practices and/or supervision of progress and results.',
        signals: [
          'Reviews results with supervisor/manager on a reqular basis',
          'Completes activities for which they are provided an overview'
        ],
        examples: [
          'Problem solving issues',
          'Documenting solutions',
          'Executing on a project with clear objectives/outcomes'
        ]
      },
      {
        summary:
          'Operating within established precendents or well-defined policies and review of end results.',
        signals: [
          'Uses guardrails to guide daily activities',
          'Reviews end results with manager',
          'Uses policies or precedents to guide decisions'
        ],
        examples: [
          'Delivering a project on time, with exceptional results',
          'Building roadmap for a defined project'
        ]
      },
      {
        summary:
          'Subject to broad practices/procedures and managerial direction.',
        signals: [
          'Makes decisions with input/direction from manager',
          'Has autonomy to solve problems within area of ownership'
        ],
        examples: [
          'Working collaboratively on a bet or business team',
          'Leading a project',
          'Raising concerns about potential roadblocks to delivering outcomes'
        ]
      },
      {
        summary: 'Subject to general direction and broadly defined objectives.',
        signals: [
          'Makes strategic decisions with input/direction from Sr. Leadership',
          'Has autonomy to provide direction/strategy within area of ownership'
        ],
        examples: [
          'Making recommendations on future strategic priorities',
          'Leading a team or function (i.e. Tribe or bet)',
          'Working collaboratively to deliver a roadmap - end-to-end'
        ]
      },
      {
        summary:
          'Subject only to overall guidance on broad organizational objectives.',
        signals: [
          'Reviews results with Sr. Leadership',
          'Makes decisions autonomously, with insight from Sr. Leadership'
        ],
        examples: [
          'Building strategic plans for an enterprise function',
          'Aligning strategic work to mountain goals',
          'Leverging WLB discussions to drive work forward'
        ]
      },
      {
        summary: 'Complete ownership, with no oversight beyond the board.',
        signals: [
          'Reviews results with the board',
          'Makes decisions autonomously'
        ],
        examples: [
          'Leading board meetings',
          'Making strategic decisions for Hudl',
          'Reviewing financials to impact future decisions'
        ]
      }
    ]
  },

  CRAFT: {
    displayName: 'Impact',
    category: 'Impact',
    description: 'Delivering value. Weighted double.',
    milestones: [
      {
        summary: 'No impact on finances or other Hudlies.',
        signals: [
          'Executes tasks that have been assigned by others and have no impact on finances or other Hudlies'
        ],
        examples: ['Scheduling meetings', 'Creating meeting agendas']
      },
      {
        summary:
          'No financial impact. Little or no shared responsibility or impact on other Hudlies.',
        signals: [
          'Executes activities that have been assigned by others and have no impact on finances',
          'Works alone'
        ],
        examples: [
          'Processing simple requests',
          'Answering emails (internal, not with clients)'
        ]
      },
      {
        summary:
          'Partnership with other roles/functions. OR - impact that reaches one department/business unit.',
        signals: [
          "Clearly articulates connection of work to Hudl's mission/vision",
          'Works collaboratively to deliver value with other Hudlies',
          'OR',
          'Delivers outcomes that impact one department or business unit'
        ],
        examples: [
          'Working collaboratively to deliver value',
          'Building plan to ensure work is connected to team goals/Hudl mission',
          'Providing coaches or clients with an exceptional experience'
        ]
      },
      {
        summary:
          'Works collaboratively to define direction focused on achieving critical business impact. OR - impact that is inter-departmental/multiple business units.',
        signals: [
          'Uses judgment to prioritize most impactful work',
          'Demonstrates insight to define direction that delivers critical business impact for Hudl',
          'OR',
          'Delivers outcomes that impact multiple areas'
        ],
        examples: [
          'Prioritizing efforts to ensure maximum impact',
          'Working cross-functionally to deliver value as a team',
          'Identifying roadblocks and solutions to ensure exceptional outcomes'
        ]
      },
      {
        summary: 'Sets vision/direction that achieves critical business impact',
        signals: [
          'Uses expertise to identify areas that achieve critical business impact',
          'Demonstrates accountability in delivering results'
        ],
        examples: [
          'Building strategy that impacts critical business results',
          'Delivering value that is above and beyond what Hudl has seen previously out of this role',
          'Engaging peers in delivering value collaboratively'
        ]
      },
      {
        summary:
          'Defines/sets direction for others to achieve critical business impact.',
        signals: [
          'Uses expertise to identify areas of focus for others to achieve critical business impact',
          'Demonstrates accountability in delivering results- self and through others'
        ],
        examples: [
          'Building strategy that impacts critical business results through others',
          'Holds others accountable to delivering exceptional value'
        ]
      },
      {
        summary:
          'Impact of decisions are felt throughout most of Hudl and affect the majority of Hudlies (more than 50%).',
        signals: [
          "Delivers value that improves Hudl's strategic position",
          'Provides insight and work that helps Hudl achieve critical business goals',
          "Connects work directly to Hudl's strategic priorities"
        ],
        examples: [
          'Identifying potential areas of expansion for Hudl',
          'Delivering value that drives mountain goals and strategic priorities for Hudl'
        ]
      },
      {
        summary:
          'Impact of decisions are felt throughout all of Hudl and affect all Hudlies.',
        signals: [
          'Delivers value that disrupts the industry',
          "Demonstrates courage in identifying ideas that will ensure Hudl's success",
          "Connects work to Hudl's future priorities"
        ],
        examples: [
          'Identifying future strategy',
          'Setting vision for all of Hudl',
          'Providing direction that delivers on future vision'
        ]
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
  .range(['#ff6300', '#4e5d6c', '#009ce3']);

export const hudlRoles = {
  support: {
    label: 'Support',
    options: [
      {
        label: 'Elite Support',
        value: 'Elite Support',
        scoredata: {
          Score: 29,
          KNOWLEDGE: 4,
          COMMUNICATION: 4,
          GSD: 3,
          INNOVATION: 4,
          COMPLEXITY: 4,
          OWNERSHIP: 4,
          IMPACT: 3
        }
      },
      {
        label: 'Technical Consultant',
        value: 'Technical Consultant',
        scoredata: {
          Score: 35,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 5,
          INNOVATION: 4,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Elite Squad Lead',
        value: 'Elite Squad Lead',
        scoredata: {
          Score: 35,
          KNOWLEDGE: 4,
          COMMUNICATION: 5,
          GSD: 5,
          INNOVATION: 5,
          COMPLEXITY: 4,
          OWNERSHIP: 4,
          IMPACT: 4
        }
      },
      {
        label: 'Elite Support Manager',
        value: 'Elite Support Manager',
        scoredata: {
          Score: 42,
          KNOWLEDGE: 5,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 6,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 5
        }
      },
      {
        label: 'Support Specialist',
        value: 'Support Specialist',
        scoredata: {
          Score: 25,
          KNOWLEDGE: 2,
          COMMUNICATION: 4,
          GSD: 2,
          INNOVATION: 4,
          COMPLEXITY: 3,
          OWNERSHIP: 4,
          IMPACT: 3
        }
      },
      {
        label: 'Tech Lead',
        value: 'Tech Lead',
        scoredata: {
          Score: 30,
          KNOWLEDGE: 4,
          COMMUNICATION: 4,
          GSD: 4,
          INNOVATION: 4,
          COMPLEXITY: 4,
          OWNERSHIP: 4,
          IMPACT: 3
        }
      },
      {
        label: 'Support Lead',
        value: 'Support Lead',
        scoredata: {
          Score: 34,
          KNOWLEDGE: 4,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Support Experience Analyst',
        value: 'Support Experience Analyst',
        scoredata: {
          Score: 30,
          KNOWLEDGE: 3,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 4,
          COMPLEXITY: 4,
          OWNERSHIP: 4,
          IMPACT: 3
        }
      },
      {
        label: 'Support Engineer',
        value: 'Support Engineer',
        scoredata: {
          Score: 35,
          KNOWLEDGE: 4,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 4,
          IMPACT: 4
        }
      }
    ]
  },
  scrummasters: {
    label: 'ScrumMasters',
    options: [
      {
        label: 'Associate ScrumMaster',
        value: 'Associate ScrumMaster',
        scoredata: {
          Score: 30,
          KNOWLEDGE: 4,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 3,
          COMPLEXITY: 3,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'ScrumMaster',
        value: 'ScrumMaster',
        scoredata: {
          Score: 34,
          KNOWLEDGE: 5,
          COMMUNICATION: 6,
          GSD: 4,
          INNOVATION: 4,
          COMPLEXITY: 4,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Sr ScrumMaster',
        value: 'Sr ScrumMaster',

        scoredata: {
          Score: 41,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'Principal ScrumMaster',
        value: 'Principal ScrumMaster',

        scoredata: {
          Score: 43,
          KNOWLEDGE: 7,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 6,
          COMPLEXITY: 5,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'Delivery Manager',
        value: 'Delivery Manager',

        scoredata: {
          Score: 40,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 5,
          INNOVATION: 4,
          COMPLEXITY: 4,
          OWNERSHIP: 5,
          IMPACT: 6
        }
      },
      {
        label: 'Senior Delivery Manager',
        value: 'Senior Delivery Manager',

        scoredata: {
          Score: 45,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 6,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 6
        }
      },
      {
        label: 'Agile Coach',
        value: 'Agile Coach',

        scoredata: {
          Score: 41,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 4,
          INNOVATION: 4,
          COMPLEXITY: 4,
          OWNERSHIP: 5,
          IMPACT: 6
        }
      },
      {
        label: 'Senior Agile Coach',
        value: 'Senior Agile Coach',

        scoredata: {
          Score: 45,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 6,
          IMPACT: 6
        }
      },
      {
        label: 'Enterprise Agile Coach',
        value: 'Enterprise Agile Coach',

        scoredata: {
          Score: 47,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 5,
          COMPLEXITY: 6,
          OWNERSHIP: 7,
          IMPACT: 6
        }
      }
    ]
  },
  productmanagers: {
    label: 'Product Managers',
    options: [
      {
        label: 'Associate Product Manager',
        value: 'Associate Product Manager',
        scoredata: {
          Score: 30,
          KNOWLEDGE: 4,
          COMMUNICATION: 4,
          GSD: 3,
          INNOVATION: 4,
          COMPLEXITY: 4,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Product Manager',
        value: 'Product Manager',
        scoredata: {
          Score: 34,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 4,
          COMPLEXITY: 4,
          OWNERSHIP: 6,
          IMPACT: 3
        }
      },
      {
        label: 'Sr. PM Team Lead',
        value: 'Sr. PM Team Lead',
        scoredata: {
          Score: 41,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'Sr. Product Manager',
        value: 'Sr. Product Manager',
        scoredata: {
          Score: 41,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'Sr. PM Manager',
        value: 'Sr. PM Manager',
        scoredata: {
          Score: 43,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 6,
          COMPLEXITY: 6,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'Principal Product Manager',
        value: 'Principal Product Manager',
        scoredata: {
          Score: 47,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 6,
          INNOVATION: 6,
          COMPLEXITY: 6,
          OWNERSHIP: 7,
          IMPACT: 5
        }
      },
      {
        label: 'Product Director',
        value: 'Product Director',
        scoredata: {
          Score: 47,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 6,
          INNOVATION: 6,
          COMPLEXITY: 6,
          OWNERSHIP: 7,
          IMPACT: 5
        }
      },
      {
        label: 'VP Product',
        value: 'VP Product',
        scoredata: {
          Score: 49,
          KNOWLEDGE: 7,
          COMMUNICATION: 6,
          GSD: 6,
          INNOVATION: 7,
          COMPLEXITY: 6,
          OWNERSHIP: 7,
          IMPACT: 5
        }
      }
    ]
  },
  engineering: {
    label: 'Engineering',
    options: [
      {
        label: 'Engineer I',
        value: 'Engineer I',
        scoredata: {
          Score: 30,
          KNOWLEDGE: 4,
          COMMUNICATION: 4,
          GSD: 3,
          INNOVATION: 5,
          COMPLEXITY: 4,
          OWNERSHIP: 4,
          IMPACT: 3
        }
      },
      {
        label: 'Engineer II',
        value: 'Engineer II',
        scoredata: {
          Score: 31,
          KNOWLEDGE: 4,
          COMMUNICATION: 4,
          GSD: 3,
          INNOVATION: 5,
          COMPLEXITY: 4,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Data Scientist I',
        value: 'Data Scientist I',
        scoredata: {
          Score: 30,
          KNOWLEDGE: 4,
          COMMUNICATION: 4,
          GSD: 2,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 4,
          IMPACT: 3
        }
      },
      {
        label: 'Data Scientist II',
        value: 'Data Scientist II',
        scoredata: {
          Score: 33,
          KNOWLEDGE: 5,
          COMMUNICATION: 4,
          GSD: 3,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Eng Team Lead',
        value: 'Eng Team Lead',
        scoredata: {
          Score: 35,
          KNOWLEDGE: 4,
          COMMUNICATION: 6,
          GSD: 3,
          INNOVATION: 5,
          COMPLEXITY: 4,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      },
      {
        label: 'Data Scientist Team Lead',
        value: 'Data Scientist Team Lead',
        scoredata: {
          Score: 35,
          KNOWLEDGE: 5,
          COMMUNICATION: 6,
          GSD: 3,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Eng Tech Lead',
        value: 'Eng Tech Lead',
        scoredata: {
          Score: 35,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 3,
          INNOVATION: 5,
          COMPLEXITY: 4,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      },
      {
        label: 'Data Scientist Tech Lead',
        value: 'Data Scientist Tech Lead',
        scoredata: {
          Score: 34,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 3,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Sr. Engineer',
        value: 'Sr. Engineer',
        scoredata: {
          Score: 34,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 5,
          COMPLEXITY: 4,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Sr. Data Scientist',
        value: 'Sr. Data Scientist',
        scoredata: {
          Score: 35,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Sr. Eng Team Lead',
        value: 'Sr. Eng Team Lead',
        scoredata: {
          Score: 42,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 6,
          COMPLEXITY: 5,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'Sr. Eng Tech Lead',
        value: 'Sr. Eng Tech Lead',
        scoredata: {
          Score: 41,
          KNOWLEDGE: 7,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 6,
          COMPLEXITY: 5,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'Sr. Data Scientist Team Lead',
        value: 'Sr. Data Scientist Team Lead',
        scoredata: {
          Score: 38,
          KNOWLEDGE: 5,
          COMMUNICATION: 6,
          GSD: 4,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      },
      {
        label: 'Engineering Manager',
        value: 'Engineering Manager',
        scoredata: {
          Score: 43,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 6,
          COMPLEXITY: 6,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'Engineering Director',
        value: 'Engineering Director',
        scoredata: {
          Score: 43,
          KNOWLEDGE: 7,
          COMMUNICATION: 6,
          GSD: 4,
          INNOVATION: 6,
          COMPLEXITY: 6,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'VPE',
        value: 'VPE',
        scoredata: {
          Score: 49,
          KNOWLEDGE: 7,
          COMMUNICATION: 6,
          GSD: 6,
          INNOVATION: 7,
          COMPLEXITY: 6,
          OWNERSHIP: 7,
          IMPACT: 5
        }
      }
    ]
  },
  sales: {
    label: 'Sales',
    options: [
      {
        label: 'SSR',
        value: 'SSR',
        scoredata: {
          Score: 26,
          KNOWLEDGE: 3,
          COMMUNICATION: 5,
          GSD: 3,
          INNOVATION: 3,
          COMPLEXITY: 3,
          OWNERSHIP: 3,
          IMPACT: 3
        }
      },
      {
        label: 'Sr. SSR',
        value: 'Sr. SSR',
        scoredata: {
          Score: 31,
          KNOWLEDGE: 4,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 4,
          COMPLEXITY: 4,
          OWNERSHIP: 4,
          IMPACT: 3
        }
      },
      {
        label: 'TM',
        value: 'TM',
        scoredata: {
          Score: 31,
          KNOWLEDGE: 4,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 4,
          COMPLEXITY: 4,
          OWNERSHIP: 4,
          IMPACT: 3
        }
      },
      {
        label: 'Sr. TM',
        value: 'Sr. TM',
        scoredata: {
          Score: 35,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Sales Manager',
        value: 'Sales Manager',
        scoredata: {
          Score: 38,
          KNOWLEDGE: 5,
          COMMUNICATION: 6,
          GSD: 4,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      },
      {
        label: 'Sr. Sales Manager',
        value: 'Sr. Sales Manager',
        scoredata: {
          Score: 42,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 6,
          COMPLEXITY: 5,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      }
    ]
  },
  it: {
    label: 'IT',
    options: [
      {
        label: 'Technician',
        value: 'Technician',
        scoredata: {
          Score: 29,
          KNOWLEDGE: 4,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 3,
          COMPLEXITY: 3,
          OWNERSHIP: 4,
          IMPACT: 3
        }
      },
      {
        label: 'Administrator',
        value: 'Administrator',
        scoredata: {
          Score: 36,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 5,
          COMPLEXITY: 4,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      },
      {
        label: 'Sr Administrator',
        value: 'Sr Administrator',
        scoredata: {
          Score: 42,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 5,
          INNOVATION: 6,
          COMPLEXITY: 5,
          OWNERSHIP: 6,
          IMPACT: 5
        }
      }
    ]
  },
  qa: {
    label: 'QA',
    options: [
      {
        label: 'Quality Analyst I',
        value: 'Quality Analyst I',
        scoredata: {
          Score: 29,
          KNOWLEDGE: 4,
          COMMUNICATION: 4,
          GSD: 3,
          INNOVATION: 4,
          COMPLEXITY: 4,
          OWNERSHIP: 4,
          IMPACT: 3
        }
      },
      {
        label: 'Quality Analyst II',
        value: 'Quality Analyst II',
        scoredata: {
          Score: 34,
          KNOWLEDGE: 5,
          COMMUNICATION: 4,
          GSD: 4,
          INNOVATION: 5,
          COMPLEXITY: 4,
          OWNERSHIP: 4,
          IMPACT: 4
        }
      },
      {
        label: 'Senior QA',
        value: 'Senior QA',
        scoredata: {
          Score: 38,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 5,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      },
      {
        label: 'Tech Lead',
        value: 'Tech Lead',
        scoredata: {
          Score: 38,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 5,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      },
      {
        label: 'Team Lead',
        value: 'Team Lead',
        scoredata: {
          Score: 38,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 5,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      },
      {
        label: 'Principal QA',
        value: 'Principal QA',
        scoredata: {
          Score: 44,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 6,
          COMPLEXITY: 6,
          OWNERSHIP: 5,
          IMPACT: 5
        }
      },
      {
        label: 'QA Manager',
        value: 'QA Manager',
        scoredata: {
          Score: 45,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 6,
          COMPLEXITY: 6,
          OWNERSHIP: 6,
          IMPACT: 5
        }
      },
      {
        label: 'Senior Tech Lead',
        value: 'Senior Tech Lead',
        scoredata: {
          Score: 44,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 6,
          COMPLEXITY: 6,
          OWNERSHIP: 5,
          IMPACT: 5
        }
      },
      {
        label: 'VP QA',
        value: 'VP QA',
        scoredata: {
          Score: 49,
          KNOWLEDGE: 7,
          COMMUNICATION: 6,
          GSD: 6,
          INNOVATION: 7,
          COMPLEXITY: 6,
          OWNERSHIP: 7,
          IMPACT: 5
        }
      }
    ]
  },
  productdesign: {
    label: 'Product Design',
    options: [
      {
        label: 'Product Designer',
        value: 'Product Designer',
        scoredata: {
          Score: 29,
          KNOWLEDGE: 4,
          COMMUNICATION: 4,
          GSD: 4,
          INNOVATION: 3,
          COMPLEXITY: 4,
          OWNERSHIP: 4,
          IMPACT: 3
        }
      },
      {
        label: 'Senior Product Designer',
        value: 'Senior Product Designer',
        scoredata: {
          Score: 34,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 3,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Lead Designer',
        value: 'Lead Designer',
        scoredata: {
          Score: 39,
          KNOWLEDGE: 6,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 6,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      },
      {
        label: 'Design Director',
        value: 'Design Director',
        scoredata: {
          Score: 47,
          KNOWLEDGE: 7,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 7,
          COMPLEXITY: 6,
          OWNERSHIP: 6,
          IMPACT: 5
        }
      },
      {
        label: 'Design Manager',
        value: 'Design Manager',
        scoredata: {
          Score: 34,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 5,
          COMPLEXITY: 4,
          OWNERSHIP: 5,
          IMPACT: 3
        }
      },
      {
        label: 'Senior Design Manager',
        value: 'Senior Design Manager',
        scoredata: {
          Score: 43,
          KNOWLEDGE: 6,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 6,
          COMPLEXITY: 6,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'VP - Design',
        value: 'VP - Design',
        scoredata: {
          Score: 49,
          KNOWLEDGE: 7,
          COMMUNICATION: 6,
          GSD: 6,
          INNOVATION: 7,
          COMPLEXITY: 6,
          OWNERSHIP: 7,
          IMPACT: 5
        }
      }
    ]
  },
  peopleops: {
    label: 'People Ops',
    options: [
      {
        label: 'Talent Squad Manager',
        value: 'Talent Squad Manager',
        scoredata: {
          Score: 38,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 6,
          COMPLEXITY: 4,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'L&D Manager',
        value: 'L&D Manager',
        scoredata: {
          Score: 39,
          KNOWLEDGE: 5,
          COMMUNICATION: 6,
          GSD: 4,
          INNOVATION: 6,
          COMPLEXITY: 4,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'HRM',
        value: 'HRM',
        scoredata: {
          Score: 38,
          KNOWLEDGE: 5,
          COMMUNICATION: 5,
          GSD: 4,
          INNOVATION: 6,
          COMPLEXITY: 4,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'Sr. Recruiter',
        value: 'Sr. Recruiter',
        scoredata: {
          Score: 35,
          KNOWLEDGE: 5,
          COMMUNICATION: 4,
          GSD: 3,
          INNOVATION: 5,
          COMPLEXITY: 4,
          OWNERSHIP: 6,
          IMPACT: 4
        }
      },
      {
        label: 'Recruiter',
        value: 'Recruiter',
        scoredata: {
          Score: 32,
          KNOWLEDGE: 4,
          COMMUNICATION: 4,
          GSD: 3,
          INNOVATION: 5,
          COMPLEXITY: 3,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      },
      {
        label: 'HRBP',
        value: 'HRBP',
        scoredata: {
          Score: 34,
          KNOWLEDGE: 5,
          COMMUNICATION: 4,
          GSD: 3,
          INNOVATION: 5,
          COMPLEXITY: 4,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      },
      {
        label: 'Talent Squad Coordinator',
        value: 'Talent Squad Coordinator',
        scoredata: {
          Score: 27,
          KNOWLEDGE: 3,
          COMMUNICATION: 4,
          GSD: 2,
          INNOVATION: 4,
          COMPLEXITY: 2,
          OWNERSHIP: 4,
          IMPACT: 4
        }
      },
      {
        label: 'Training Developer',
        value: 'Training Developer',
        scoredata: {
          Score: 34,
          KNOWLEDGE: 4,
          COMMUNICATION: 6,
          GSD: 3,
          INNOVATION: 5,
          COMPLEXITY: 3,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      },
      {
        label: 'People Ops Dir',
        value: 'People Ops Dir',
        scoredata: {
          Score: 49,
          KNOWLEDGE: 7,
          COMMUNICATION: 6,
          GSD: 6,
          INNOVATION: 6,
          COMPLEXITY: 6,
          OWNERSHIP: 8,
          IMPACT: 5
        }
      },
      {
        label: 'Innovation Lead',
        value: 'Innovation Lead',
        scoredata: {
          Score: 39,
          KNOWLEDGE: 5,
          COMMUNICATION: 6,
          GSD: 5,
          INNOVATION: 5,
          COMPLEXITY: 5,
          OWNERSHIP: 5,
          IMPACT: 4
        }
      }
    ]
  }
};

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
