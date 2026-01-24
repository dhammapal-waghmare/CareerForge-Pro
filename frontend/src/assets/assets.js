export const dummyResumeData = [
  {
    personal_info: {
      full_name: "Dhammapal Jalindar Waghmare",
      email: "dhammapalwaghmare2020@gmail.com",
      phone: "+91 9356803863",
      location: "Chhatrapati Sambhajinagar, Maharashtra, India",
      linkedin: "https://linkedin.com/in/dhammapal-waghmare",
      website: "https://github.com/dhammapal-waghmare",
      profession: "Frontend Developer",
    },

    _id: "resume001",
    userId: "user001",
    title: "Dhammapal Resume",
    public: true,

    professional_summary:
      "Motivated and detail-oriented Frontend Developer with a strong foundation in web development. Passionate about solving real-world problems using modern technologies. Skilled in Java, Python, HTML, CSS, Bootstrap, JavaScript, SQL, React.js, Git, and GitHub. Strong analytical mindset, teamwork abilities, and eagerness to learn.",

    skills: [
      "Core Java",
      "Python",
      "JavaScript",
      "SQL",
      "HTML",
      "CSS",
      "Bootstrap",
      "React.js",
      "Git",
      "GitHub",
      "MySQL",
      "Microsoft SQL Server",
    ],

    experience: [
      {
        company: "Academic Projects",
        position: "Frontend Developer (Student Projects)",
        start_date: "2022-01",
        end_date: "Present",
        description:
          "Built responsive web applications using React.js, Bootstrap, and JavaScript. Worked on real-world problem solving projects including student management systems and UI-focused applications.",
        is_current: true,
        _id: "exp001",
      },
    ],

    education: [
      {
        institution:
          "Government College of Engineering Aurangabad, Chhatrapati Sambhajinagar",
        degree: "Master of Computer Applications (MCA)",
        field: "Computer Applications",
        graduation_date: "2026",
        gpa: "",
        _id: "edu001",
      },
      {
        institution:
          "S.B.E.S. College of Science, Chhatrapati Sambhajinagar",
        degree: "Bachelor of Science in Computer Science",
        field: "Computer Science",
        graduation_date: "2024",
        gpa: "78.93%",
        _id: "edu002",
      },
      {
        institution:
          "Shri Shivaji High School and Junior College of Arts and Science, Mehkar",
        degree: "Higher Secondary Certificate (HSC)",
        field: "Science",
        graduation_date: "2021",
        gpa: "86.00%",
        _id: "edu003",
      },
      {
        institution: "Lal Bahadur Shastri High School, Weni",
        degree: "Secondary School Certificate (SSC)",
        field: "General",
        graduation_date: "2019",
        gpa: "77.20%",
        _id: "edu004",
      },
    ],

    project: [
      {
        name: "CampusClock - Student Information & Management System",
        type: "Full Stack Web Application",
        description:
          "Developed a system for managing lecture schedules, exam timetables, attendance tracking, and automated reminders for assignments and low attendance alerts using React, Node.js, Express, and MongoDB.",
        _id: "proj001",
      },
      {
        name: "EduConnect - Educational Resource Finder",
        type: "Frontend Web Application",
        description:
          "Built a responsive frontend application to organize educational resources and reduce search time using HTML, CSS, Bootstrap, and JavaScript.",
        _id: "proj002",
      },
    ],

    template: "simple",
    accent_color: "#6366F1",

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];
