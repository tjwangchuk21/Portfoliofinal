function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }
}

function emailMe() {
  window.location.href =
    "mailto:thuksey.wangchuk@mcvts.org?subject=Portfolio Contact&body=Hi TJ, I saw your portfolio and wanted to reach out.";
}

function openLinkedIn() {
  window.open("https://www.linkedin.com/in/tj-wangchuk-3869b3380", "_blank");
}

function downloadResume() {
  window.open("resume.pdf", "_blank");
}

function openClassroom() {
  window.open("projects/classroom/index.html", "_blank");
}

function openClassroomCode() {
  window.open("projects/classroom/classroom.js", "_blank");
}

function openEMS() {
  window.open("projects/ems-urgency/index.html", "_blank");
}

function openEMSPy() {
  window.open("projects/ems-urgency/ems_predictor.py", "_blank");
}

function openDeadly() {
  window.open("projects/deadly-desert/index.html", "_blank");
}

function openDeadlyCode() {
  window.open("projects/deadly-desert/Main.java", "_blank");
}

function openCongressional() {
  window.open("projects/congressional-app/index.html", "_blank");
}

function openCongressionalCode() {
  window.open("projects/congressional-app/source.html", "_blank");
}

function showProjectMessage(projectName) {
  alert(
    projectName +
      "\n\nThis project demonstrates problem solving, coding skills, and interactive product design. Use the buttons to open the demo and view source code."
  );
}