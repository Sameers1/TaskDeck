// Mock data for sessions
export const mockSessions = [
  {
    id: "session-1",
    name: "Sprint 42 Planning",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "active",
    owner: {
      id: "user-1",
      name: "John Doe",
    },
    participants: [
      { id: "user-1", name: "John Doe" },
      { id: "user-2", name: "Jane Smith" },
      { id: "user-3", name: "Bob Johnson" },
    ],
    tasks: [
      {
        id: "task-1",
        title: "Implement user authentication",
        description: "Add login and signup functionality",
        status: "completed",
        finalEstimate: 5,
        votes: [
          { userId: "user-1", value: 5 },
          { userId: "user-2", value: 5 },
          { userId: "user-3", value: 8 },
        ],
      },
      {
        id: "task-2",
        title: "Create dashboard UI",
        description: "Design and implement the main dashboard",
        status: "in-progress",
        votes: [
          { userId: "user-1", value: 3 },
          { userId: "user-2", value: 5 },
        ],
      },
    ],
  },
  {
    id: "session-2",
    name: "Bug Triage",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: "completed",
    owner: {
      id: "user-1",
      name: "John Doe",
    },
    participants: [
      { id: "user-1", name: "John Doe" },
      { id: "user-2", name: "Jane Smith" },
      { id: "user-4", name: "Alice Williams" },
    ],
    tasks: [
      {
        id: "task-3",
        title: "Fix login page error",
        description: "Users are getting 500 error on login",
        status: "completed",
        finalEstimate: 3,
        votes: [
          { userId: "user-1", value: 3 },
          { userId: "user-2", value: 3 },
          { userId: "user-4", value: 2 },
        ],
      },
    ],
  },
  {
    id: "session-3",
    name: "Feature Planning",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    status: "completed",
    owner: {
      id: "user-1",
      name: "John Doe",
    },
    participants: [
      { id: "user-1", name: "John Doe" },
      { id: "user-3", name: "Bob Johnson" },
      { id: "user-4", name: "Alice Williams" },
    ],
    tasks: [
      {
        id: "task-4",
        title: "Add export functionality",
        description: "Allow users to export data as CSV",
        status: "completed",
        finalEstimate: 5,
        votes: [
          { userId: "user-1", value: 5 },
          { userId: "user-3", value: 8 },
          { userId: "user-4", value: 5 },
        ],
      },
      {
        id: "task-5",
        title: "Implement dark mode",
        description: "Add dark mode toggle to the app",
        status: "completed",
        finalEstimate: 3,
        votes: [
          { userId: "user-1", value: 3 },
          { userId: "user-3", value: 3 },
          { userId: "user-4", value: 2 },
        ],
      },
    ],
  },
  {
    id: "session-4",
    name: "Sprint 41 Planning",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    status: "completed",
    owner: {
      id: "user-1",
      name: "John Doe",
    },
    participants: [
      { id: "user-1", name: "John Doe" },
      { id: "user-2", name: "Jane Smith" },
      { id: "user-3", name: "Bob Johnson" },
      { id: "user-4", name: "Alice Williams" },
    ],
    tasks: [
      {
        id: "task-6",
        title: "Implement notifications",
        description: "Add in-app notifications",
        status: "completed",
        finalEstimate: 8,
        votes: [
          { userId: "user-1", value: 8 },
          { userId: "user-2", value: 8 },
          { userId: "user-3", value: 13 },
          { userId: "user-4", value: 5 },
        ],
      },
    ],
  },
]

// Mock data for story points
export const storyPoints = [1, 2, 3, 5, 8, 13, 20, 40, 100, "?"]
