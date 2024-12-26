const subjects = {
    btechCSE: {
        sem1: [
            { id: "cse1001", name: "CSE1001 - Introduction to Programming", credits: 5 },
            { id: "cse1002", name: "CSE1002 - Basic Electrical and Electronics Engineering", credits: 5 },
            { id: "cse1003", name: "CSE1003 - Computational Thinking", credits: 2 },
            { id: "cse1004", name: "CSE1004 - Applied Computational Mathematics - I", credits: 4 },
            { id: "cse1005", name: "CSE1005 - Soft Skills", credits: 4 },
        ],
        sem2: [
            { id: "cse1101", name: "CSE1101 - Data structures", credits: 5 },
            { id: "cse1102", name: "CSE1102 - Digital Logic Design", credits: 5 },
            { id: "cse1103", name: "CSE1103 - Design Thinking and Fabrication Workshop", credits: 2 },
            { id: "cse1104", name: "CSE1104 - Applied Computational Mathematics 2", credits: 4 },
            { id: "cse1105", name: "CSE1105 - Human Physioogy", credits: 2 },
            { id: "cse1106", name: "CSE1106 - Introduction to communication Systems", credits: 5 },
        ],
        sem3: [
            { id: "cse2001", name: "CSE2001 - Design and Analysis of Algorithms", credits: 5 },
            { id: "cse2002", name: "CSE2002 - Digital Communication", credits: 5 },
            { id: "cse2003", name: "CSE2003 - Computer Organization", credits: 3 },
            { id: "cse2004", name: "CSE2004 - Embedded System Design", credits: 5 },
            { id: "cse2005", name: "CSE2005 - Technology Management & Commercialization", credits: 3 },
        ],
    },
    bca: {
        sem1: [
            { id: "bca1001", name: "BCA1001 - Computer Fundamentals and Digital Logics", credits: 5 },
            { id: "bca1002", name: "BCA1002 - Data Structures", credits: 5 },
            { id: "bca1003", name: "BCA1003 - Computational Thinking", credits: 4 },
            { id: "bca1004", name: "BCA1004 - Mathematics", credits: 4 },
            { id: "bca1005", name: "BCA1005 - Human Values, Ethics", credits: 3 },
        ],
    },
    btechBioeng: {
        sem1: [
            { id: "bio1001", name: "BIO1001 - Biochemistry", credits: 5.5 },
            { id: "bio1002", name: "BIO1002 - Biophysics", credits: 5.5 },
            { id: "bio1003", name: "BIO1003 - Maths", credits: 4 },
            { id: "bio1004", name: "BIO1004 - Computational Thinking", credits: 3 },
            { id: "bio1005", name: "BIO1005 - Life Skills", credits: 3 },
        ],
    },
};

const gradeMapping = {
    "A+": 10,
    "A": 9,
    "B+": 8,
    "B": 7,
    "C+": 6,
    "C": 5,
    "D": 4,
    "F": 0,
};

const courseSelect = document.getElementById("course");
const semesterSelect = document.getElementById("semester");
const subjectInputs = document.getElementById("subjectInputs");
const calculateButton = document.getElementById("calculateButton");
const result = document.getElementById("result");

function updateSubjectInputs() {
    const selectedCourse = courseSelect.value;
    const selectedSemester = semesterSelect.value;

    if (!subjects[selectedCourse] || !subjects[selectedCourse][selectedSemester]) {
        subjectInputs.innerHTML = "No subjects found for the selected semester.";
        return;
    }

    const semesterSubjects = subjects[selectedCourse][selectedSemester];
    subjectInputs.innerHTML = "";

    semesterSubjects.forEach((subject) => {
        const inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");

        const label = document.createElement("label");
        label.htmlFor = subject.id;
        label.textContent = `${subject.name} (${subject.credits} credits):`;

        const select = document.createElement("select");
        select.id = subject.id;
        select.classList.add("grade-input");

        // Add a blank placeholder option
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.textContent = "Select grade";
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        select.appendChild(placeholderOption);

        // Populate dropdown with grade options
        Object.keys(gradeMapping).forEach((grade) => {
            const option = document.createElement("option");
            option.value = grade;
            option.textContent = grade;
            select.appendChild(option);
        });

        inputGroup.appendChild(label);
        inputGroup.appendChild(select);
        subjectInputs.appendChild(inputGroup);
    });
}



function calculateSGPA() {
    const selectedCourse = courseSelect.value;
    const selectedSemester = semesterSelect.value;

    if (!subjects[selectedCourse] || !subjects[selectedCourse][selectedSemester]) {
        result.innerHTML = "Error: No subjects found for the selected semester.";
        return;
    }

    const semesterSubjects = subjects[selectedCourse][selectedSemester];
    let totalCredits = 0;
    let weightedSum = 0;
    let resultText = "";

    for (const subject of semesterSubjects) {
        const gradeValue = gradeMapping[document.getElementById(subject.id).value];

        if (isNaN(gradeValue)) {
            result.innerHTML = "Error: Please enter valid grades for all subjects.";
            return;
        }

        const earnedPoints = gradeValue * subject.credits;
        weightedSum += earnedPoints;
        totalCredits += subject.credits;

        resultText += `${subject.name}: ${gradeValue} x ${subject.credits} = ${earnedPoints.toFixed(2)} points<br>`;
    }

    const sgpa = weightedSum / totalCredits;
    result.innerHTML = `${resultText}<br><strong>Total SGPA: ${sgpa.toFixed(2)}</strong>`;
}

courseSelect.addEventListener("change", updateSubjectInputs);
semesterSelect.addEventListener("change", updateSubjectInputs);
calculateButton.addEventListener("click", calculateSGPA);

// Initialize inputs for the default course and semester
updateSubjectInputs();
