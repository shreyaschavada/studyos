// ===== STUDENT PROFILE =====
export const studentProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  avatar: "/avatar.png",
  university: "Stanford University",
  major: "Computer Science",
  year: "Junior",
  gpa: 3.87,
  xp: 4250,
  level: 12,
  streak: 14,
  joinDate: "2024-09-01",
  bio: "Passionate CS student focused on AI/ML and full-stack development.",
};

// ===== COURSES =====
export const courses = [
  {
    id: "cs101",
    name: "Data Structures & Algorithms",
    code: "CS 201",
    teacher: "Prof. Sarah Chen",
    color: "#6366F1",
    progress: 72,
    totalLessons: 24,
    completedLessons: 17,
    nextClass: "Mon, Wed 10:00 AM",
    grade: "A-",
    assignments: 8,
    completedAssignments: 6,
  },
  {
    id: "cs102",
    name: "Machine Learning",
    code: "CS 340",
    teacher: "Prof. James Miller",
    color: "#7C3AED",
    progress: 58,
    totalLessons: 20,
    completedLessons: 12,
    nextClass: "Tue, Thu 2:00 PM",
    grade: "B+",
    assignments: 6,
    completedAssignments: 4,
  },
  {
    id: "cs103",
    name: "Web Development",
    code: "CS 280",
    teacher: "Prof. Emily Davis",
    color: "#3B82F6",
    progress: 85,
    totalLessons: 18,
    completedLessons: 15,
    nextClass: "Mon, Wed 1:00 PM",
    grade: "A",
    assignments: 10,
    completedAssignments: 9,
  },
  {
    id: "math201",
    name: "Linear Algebra",
    code: "MATH 201",
    teacher: "Prof. Robert Kim",
    color: "#06B6D4",
    progress: 45,
    totalLessons: 22,
    completedLessons: 10,
    nextClass: "Tue, Thu 10:00 AM",
    grade: "B",
    assignments: 7,
    completedAssignments: 3,
  },
  {
    id: "cs104",
    name: "Database Systems",
    code: "CS 310",
    teacher: "Prof. Lisa Wang",
    color: "#F59E0B",
    progress: 62,
    totalLessons: 20,
    completedLessons: 12,
    nextClass: "Fri 9:00 AM",
    grade: "A-",
    assignments: 5,
    completedAssignments: 3,
  },
  {
    id: "cs105",
    name: "Computer Networks",
    code: "CS 350",
    teacher: "Prof. David Park",
    color: "#22C55E",
    progress: 38,
    totalLessons: 16,
    completedLessons: 6,
    nextClass: "Wed, Fri 3:00 PM",
    grade: "B+",
    assignments: 4,
    completedAssignments: 2,
  },
];

// ===== ASSIGNMENTS =====
export const assignments = [
  {
    id: "a1",
    title: "Binary Search Tree Implementation",
    course: "CS 201",
    courseColor: "#6366F1",
    dueDate: "2026-07-05",
    priority: "high" as const,
    status: "pending" as const,
    description: "Implement a BST with insert, delete, and search operations.",
  },
  {
    id: "a2",
    title: "Neural Network from Scratch",
    course: "CS 340",
    courseColor: "#7C3AED",
    dueDate: "2026-07-08",
    priority: "high" as const,
    status: "in-progress" as const,
    description: "Build a simple neural network using only NumPy.",
  },
  {
    id: "a3",
    title: "React Portfolio Website",
    course: "CS 280",
    courseColor: "#3B82F6",
    dueDate: "2026-07-03",
    priority: "medium" as const,
    status: "in-progress" as const,
    description: "Create a personal portfolio using React and Next.js.",
  },
  {
    id: "a4",
    title: "Matrix Operations Lab",
    course: "MATH 201",
    courseColor: "#06B6D4",
    dueDate: "2026-07-10",
    priority: "medium" as const,
    status: "pending" as const,
    description: "Complete matrix multiplication and eigenvalue exercises.",
  },
  {
    id: "a5",
    title: "SQL Query Optimization",
    course: "CS 310",
    courseColor: "#F59E0B",
    dueDate: "2026-07-04",
    priority: "low" as const,
    status: "completed" as const,
    description: "Optimize complex SQL queries for better performance.",
  },
  {
    id: "a6",
    title: "Graph Algorithms Quiz",
    course: "CS 201",
    courseColor: "#6366F1",
    dueDate: "2026-07-06",
    priority: "medium" as const,
    status: "pending" as const,
    description: "Study for Dijkstra's, BFS, and DFS algorithms quiz.",
  },
  {
    id: "a7",
    title: "TCP/IP Protocol Analysis",
    course: "CS 350",
    courseColor: "#22C55E",
    dueDate: "2026-07-12",
    priority: "low" as const,
    status: "pending" as const,
    description: "Analyze TCP/IP packet captures using Wireshark.",
  },
  {
    id: "a8",
    title: "REST API Development",
    course: "CS 280",
    courseColor: "#3B82F6",
    dueDate: "2026-07-02",
    priority: "high" as const,
    status: "completed" as const,
    description: "Build a RESTful API with authentication and CRUD operations.",
  },
];

// ===== NOTES =====
export const notes = [
  {
    id: "n1",
    title: "Quick Sort Algorithm Notes",
    content: "# Quick Sort\\n\\nQuick Sort uses divide and conquer...\\n\\n## Time Complexity\\n- Best: O(n log n)\\n- Worst: O(n²)\\n- Average: O(n log n)",
    folder: "Data Structures",
    color: "#6366F1",
    pinned: true,
    createdAt: "2026-06-28",
    updatedAt: "2026-07-01",
  },
  {
    id: "n2",
    title: "Neural Networks Fundamentals",
    content: "# Neural Networks\\n\\n## Perceptron\\nA single neuron with weights and bias...\\n\\n## Activation Functions\\n- ReLU\\n- Sigmoid\\n- Tanh",
    folder: "Machine Learning",
    color: "#7C3AED",
    pinned: true,
    createdAt: "2026-06-25",
    updatedAt: "2026-06-30",
  },
  {
    id: "n3",
    title: "React Hooks Deep Dive",
    content: "# React Hooks\\n\\n## useState\\nManages component state...\\n\\n## useEffect\\nSide effects in components...\\n\\n## useCallback & useMemo\\nPerformance optimization...",
    folder: "Web Development",
    color: "#3B82F6",
    pinned: false,
    createdAt: "2026-06-20",
    updatedAt: "2026-06-29",
  },
  {
    id: "n4",
    title: "Eigenvalues & Eigenvectors",
    content: "# Eigenvalues\\n\\nFor a square matrix A, eigenvalue λ satisfies:\\nAv = λv",
    folder: "Linear Algebra",
    color: "#06B6D4",
    pinned: false,
    createdAt: "2026-06-15",
    updatedAt: "2026-06-28",
  },
  {
    id: "n5",
    title: "Database Normalization",
    content: "# Normalization\\n\\n## 1NF\\nAtomic values only\\n\\n## 2NF\\nNo partial dependencies\\n\\n## 3NF\\nNo transitive dependencies",
    folder: "Database Systems",
    color: "#F59E0B",
    pinned: false,
    createdAt: "2026-06-18",
    updatedAt: "2026-06-27",
  },
  {
    id: "n6",
    title: "OSI Model Layers",
    content: "# OSI Model\\n\\n7 Layers:\\n1. Physical\\n2. Data Link\\n3. Network\\n4. Transport\\n5. Session\\n6. Presentation\\n7. Application",
    folder: "Computer Networks",
    color: "#22C55E",
    pinned: true,
    createdAt: "2026-06-22",
    updatedAt: "2026-06-26",
  },
];

// ===== AI CONVERSATIONS =====
export const aiConversations = [
  {
    id: "conv1",
    title: "Explain Binary Search Trees",
    messages: [
      {
        role: "user" as const,
        content: "Can you explain how a Binary Search Tree works?",
        timestamp: "2026-07-01T10:30:00",
      },
      {
        role: "assistant" as const,
        content:
          "A **Binary Search Tree (BST)** is a node-based data structure where each node has at most two children. The key property is:\n\n- **Left subtree** contains only nodes with keys **less than** the parent.\n- **Right subtree** contains only nodes with keys **greater than** the parent.\n\n### Key Operations:\n\n1. **Search** — O(log n) average\n2. **Insert** — O(log n) average\n3. **Delete** — O(log n) average\n\n```python\nclass Node:\n    def __init__(self, key):\n        self.left = None\n        self.right = None\n        self.val = key\n\ndef insert(root, key):\n    if root is None:\n        return Node(key)\n    if key < root.val:\n        root.left = insert(root.left, key)\n    else:\n        root.right = insert(root.right, key)\n    return root\n```\n\nWould you like me to explain tree traversals next?",
        timestamp: "2026-07-01T10:30:05",
      },
    ],
    updatedAt: "2026-07-01",
  },
  {
    id: "conv2",
    title: "Machine Learning Basics",
    messages: [
      {
        role: "user" as const,
        content: "What's the difference between supervised and unsupervised learning?",
        timestamp: "2026-06-30T14:00:00",
      },
      {
        role: "assistant" as const,
        content:
          "Great question! Here's a clear breakdown:\n\n## Supervised Learning 📊\n- Uses **labeled data** (input-output pairs)\n- Goal: Learn a mapping function\n- Examples: Classification, Regression\n- Algorithms: Linear Regression, SVM, Random Forest\n\n## Unsupervised Learning 🔍\n- Uses **unlabeled data**\n- Goal: Find hidden patterns/structure\n- Examples: Clustering, Dimensionality Reduction\n- Algorithms: K-Means, PCA, DBSCAN\n\n| Feature | Supervised | Unsupervised |\n|---------|-----------|-------------|\n| Data | Labeled | Unlabeled |\n| Goal | Predict | Discover |\n| Feedback | Direct | None |\n\nWant me to dive deeper into any specific algorithm?",
        timestamp: "2026-06-30T14:00:08",
      },
    ],
    updatedAt: "2026-06-30",
  },
];

// ===== SCHEDULE =====
export const todaySchedule = [
  { id: "s1", time: "9:00 AM", title: "Linear Algebra", type: "class" as const, color: "#06B6D4", duration: "1h 30m" },
  { id: "s2", time: "10:45 AM", title: "Study Group — DSA", type: "study" as const, color: "#6366F1", duration: "1h" },
  { id: "s3", time: "1:00 PM", title: "Web Development", type: "class" as const, color: "#3B82F6", duration: "1h 30m" },
  { id: "s4", time: "3:00 PM", title: "ML Assignment", type: "assignment" as const, color: "#7C3AED", duration: "2h" },
  { id: "s5", time: "5:30 PM", title: "Focus Session", type: "focus" as const, color: "#22C55E", duration: "45m" },
];

// ===== NOTIFICATIONS =====
export const notifications = [
  { id: "notif1", title: "Assignment Due Tomorrow", message: "Binary Search Tree Implementation is due tomorrow.", type: "warning" as const, time: "2 hours ago", read: false },
  { id: "notif2", title: "New Grade Posted", message: "You received an A on REST API Development.", type: "success" as const, time: "5 hours ago", read: false },
  { id: "notif3", title: "Study Group Reminder", message: "DSA Study Group starts in 30 minutes.", type: "info" as const, time: "30 min ago", read: true },
  { id: "notif4", title: "Achievement Unlocked!", message: "You've earned the 'Code Warrior' badge!", type: "achievement" as const, time: "1 day ago", read: true },
  { id: "notif5", title: "Course Update", message: "Prof. Chen posted new lecture notes for CS 201.", type: "info" as const, time: "2 days ago", read: true },
];

// ===== ACHIEVEMENTS =====
export const achievements = [
  { id: "ach1", name: "First Steps", description: "Complete your first assignment", icon: "🎯", unlocked: true, xp: 50, date: "2024-09-15" },
  { id: "ach2", name: "Note Taker", description: "Create 10 notes", icon: "📝", unlocked: true, xp: 100, date: "2024-10-01" },
  { id: "ach3", name: "Code Warrior", description: "Complete 5 coding assignments", icon: "⚔️", unlocked: true, xp: 200, date: "2024-11-20" },
  { id: "ach4", name: "Study Streak", description: "Maintain a 7-day study streak", icon: "🔥", unlocked: true, xp: 150, date: "2025-01-05" },
  { id: "ach5", name: "Night Owl", description: "Study for 3+ hours after 10 PM", icon: "🦉", unlocked: true, xp: 75, date: "2025-02-14" },
  { id: "ach6", name: "Perfect Score", description: "Get 100% on any assignment", icon: "💯", unlocked: true, xp: 300, date: "2025-03-20" },
  { id: "ach7", name: "Focus Master", description: "Complete 50 Pomodoro sessions", icon: "🧘", unlocked: true, xp: 250, date: "2025-05-10" },
  { id: "ach8", name: "AI Explorer", description: "Have 100 AI tutor conversations", icon: "🤖", unlocked: false, xp: 200, date: null },
  { id: "ach9", name: "Dean's List", description: "Maintain a 3.8+ GPA", icon: "🏆", unlocked: false, xp: 500, date: null },
  { id: "ach10", name: "Social Butterfly", description: "Join 5 study groups", icon: "🦋", unlocked: false, xp: 150, date: null },
  { id: "ach11", name: "Marathon Runner", description: "Study 100+ hours in a month", icon: "🏃", unlocked: false, xp: 400, date: null },
  { id: "ach12", name: "Polyglot", description: "Take courses in 3+ subjects", icon: "🌍", unlocked: true, xp: 175, date: "2025-06-01" },
];

// ===== LEADERBOARD =====
export const leaderboard = [
  { rank: 1, name: "Emma Wilson", xp: 5200, avatar: "EW", streak: 21 },
  { rank: 2, name: "Alex Johnson", xp: 4250, avatar: "AJ", streak: 14, isCurrentUser: true },
  { rank: 3, name: "Ryan Park", xp: 4100, avatar: "RP", streak: 18 },
  { rank: 4, name: "Sofia Martinez", xp: 3800, avatar: "SM", streak: 9 },
  { rank: 5, name: "David Lee", xp: 3650, avatar: "DL", streak: 12 },
  { rank: 6, name: "Olivia Brown", xp: 3400, avatar: "OB", streak: 7 },
  { rank: 7, name: "James Taylor", xp: 3200, avatar: "JT", streak: 5 },
  { rank: 8, name: "Maya Patel", xp: 3050, avatar: "MP", streak: 11 },
];

// ===== ANALYTICS DATA =====
export const weeklyStudyHours = [
  { day: "Mon", hours: 4.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 5.1 },
  { day: "Thu", hours: 2.8 },
  { day: "Fri", hours: 4.0 },
  { day: "Sat", hours: 6.3 },
  { day: "Sun", hours: 3.5 },
];

export const monthlyPerformance = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 75 },
  { month: "Apr", score: 88 },
  { month: "May", score: 91 },
  { month: "Jun", score: 85 },
  { month: "Jul", score: 89 },
];

export const subjectProgress = [
  { subject: "DSA", progress: 72, color: "#6366F1" },
  { subject: "ML", progress: 58, color: "#7C3AED" },
  { subject: "Web Dev", progress: 85, color: "#3B82F6" },
  { subject: "Linear Algebra", progress: 45, color: "#06B6D4" },
  { subject: "Databases", progress: 62, color: "#F59E0B" },
  { subject: "Networks", progress: 38, color: "#22C55E" },
];

export const focusTimeData = [
  { name: "Deep Focus", value: 45, color: "#6366F1" },
  { name: "Light Study", value: 30, color: "#7C3AED" },
  { name: "Review", value: 15, color: "#3B82F6" },
  { name: "Practice", value: 10, color: "#06B6D4" },
];

export const productivityTrend = [
  { week: "W1", productivity: 65 },
  { week: "W2", productivity: 72 },
  { week: "W3", productivity: 68 },
  { week: "W4", productivity: 78 },
  { week: "W5", productivity: 82 },
  { week: "W6", productivity: 75 },
  { week: "W7", productivity: 88 },
  { week: "W8", productivity: 85 },
];

// ===== CALENDAR EVENTS =====
export const calendarEvents = [
  { id: "e1", title: "DSA Midterm", date: "2026-07-07", type: "exam" as const, color: "#EF4444" },
  { id: "e2", title: "ML Project Due", date: "2026-07-08", type: "assignment" as const, color: "#7C3AED" },
  { id: "e3", title: "Web Dev Presentation", date: "2026-07-10", type: "presentation" as const, color: "#3B82F6" },
  { id: "e4", title: "Linear Algebra Quiz", date: "2026-07-12", type: "exam" as const, color: "#EF4444" },
  { id: "e5", title: "Study Group", date: "2026-07-05", type: "study" as const, color: "#22C55E" },
  { id: "e6", title: "Office Hours", date: "2026-07-03", type: "meeting" as const, color: "#F59E0B" },
  { id: "e7", title: "Hackathon", date: "2026-07-15", type: "event" as const, color: "#06B6D4" },
];

// ===== MOTIVATIONAL QUOTES =====
export const quotes = [
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Education is the passport to the future.", author: "Malcolm X" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
];

// ===== FEATURES (LANDING PAGE) =====
export const features = [
  {
    icon: "Brain",
    title: "AI Tutor",
    description: "Get instant help with any subject. Our AI understands context and adapts to your learning style.",
  },
  {
    icon: "BookOpen",
    title: "Smart Notes",
    description: "Take rich notes with AI-powered summaries, flashcard generation, and intelligent organization.",
  },
  {
    icon: "Calendar",
    title: "Smart Calendar",
    description: "Never miss a deadline. AI-optimized scheduling that adapts to your study patterns.",
  },
  {
    icon: "Target",
    title: "Focus Mode",
    description: "Pomodoro timer with ambient sounds, distraction blocking, and productivity tracking.",
  },
  {
    icon: "BarChart3",
    title: "Analytics",
    description: "Track your study hours, performance trends, and productivity with beautiful dashboards.",
  },
  {
    icon: "Trophy",
    title: "Achievements",
    description: "Stay motivated with XP, badges, streaks, and compete with classmates on leaderboards.",
  },
  {
    icon: "Layout",
    title: "Kanban Board",
    description: "Manage assignments with drag-and-drop boards. Prioritize, track, and complete tasks efficiently.",
  },
  {
    icon: "GraduationCap",
    title: "Course Tracker",
    description: "Track all your courses, grades, and progress in one beautiful dashboard.",
  },
];

// ===== STATS (LANDING PAGE) =====
export const stats = [
  { value: 50000, label: "Active Students", suffix: "+" },
  { value: 2, label: "Study Hours Tracked", suffix: "M+" },
  { value: 1, label: "Notes Created", suffix: "M+" },
  { value: 98, label: "Satisfaction Rate", suffix: "%" },
];

// ===== TESTIMONIALS =====
export const testimonials = [
  {
    name: "Sarah Kim",
    role: "CS Student, MIT",
    content: "StudyOS completely transformed how I study. The AI tutor is like having a personal professor available 24/7. My GPA went from 3.2 to 3.8!",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Engineering, Stanford",
    content: "The Focus Mode with ambient sounds is incredible. I went from 2 hours of productive study to 5+ hours daily. The analytics keep me accountable.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Pre-Med, Harvard",
    content: "The Smart Notes feature with AI summaries saves me hours. I can generate flashcards from my notes instantly. This is the future of studying.",
    rating: 5,
  },
];

// ===== FAQ =====
export const faqs = [
  {
    question: "What is StudyOS?",
    answer: "StudyOS is an AI-powered workspace designed specifically for students. It combines an AI tutor, smart notes, task management, focus timer, analytics, and more into one beautiful platform.",
  },
  {
    question: "Is StudyOS free?",
    answer: "StudyOS offers a generous free tier with core features. Premium plans unlock advanced AI capabilities, unlimited storage, and priority support starting at $9.99/month for students.",
  },
  {
    question: "How does the AI Tutor work?",
    answer: "Our AI Tutor uses advanced language models to understand your questions in context. It can explain concepts, solve problems step-by-step, generate practice questions, and adapt to your learning level.",
  },
  {
    question: "Can I use StudyOS on mobile?",
    answer: "Yes! StudyOS is fully responsive and works beautifully on desktop, tablet, and mobile. We also have native apps coming soon for iOS and Android.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use end-to-end encryption, SOC 2 Type II compliance, and never share your data with third parties. Your study data belongs to you.",
  },
  {
    question: "Can I collaborate with classmates?",
    answer: "Yes! StudyOS supports shared notes, study groups, and collaborative workspaces. You can also compete on leaderboards and share achievements.",
  },
];

// ===== SIDEBAR NAV ITEMS =====
export const sidebarItems = [
  { icon: "LayoutDashboard", label: "Dashboard", href: "/dashboard" },
  { icon: "Bot", label: "AI Tutor", href: "/dashboard/ai-tutor" },
  { icon: "GraduationCap", label: "Courses", href: "/dashboard/courses" },
  { icon: "FileText", label: "Notes", href: "/dashboard/notes" },
  { icon: "ClipboardList", label: "Assignments", href: "/dashboard/assignments" },
  { icon: "Calendar", label: "Calendar", href: "/dashboard/calendar" },
  { icon: "Focus", label: "Focus Mode", href: "/dashboard/focus" },
  { icon: "BarChart3", label: "Analytics", href: "/dashboard/analytics" },
  { icon: "Trophy", label: "Achievements", href: "/dashboard/achievements" },
  { icon: "Settings", label: "Settings", href: "/dashboard/settings" },
];
