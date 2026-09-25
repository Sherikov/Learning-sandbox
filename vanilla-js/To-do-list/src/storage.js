// === Data & Logic Module ===

// Initial data load
let rawTasks = JSON.parse(localStorage.getItem('myTask'));
//  Protection against errors if element is empty
let myTask = Array.isArray(rawTasks) ? rawTasks.filter(t => t !== null) : [];

let rawProjects = JSON.parse(localStorage.getItem('myProject'));
// Protection against errors
let myProject = Array.isArray(rawProjects) ? rawProjects.filter(p => p !== null) : [];

// === INTERNAL FUNCTIONS ===

function saveData() {
    localStorage.setItem('myTask', JSON.stringify(myTask));
    localStorage.setItem('myProject', JSON.stringify(myProject));
}



export function getTasks() {
    return myTask;
}

export function getProjects() {
    return myProject;
}

export function addTask(task) {
    myTask.push(task);
    saveData();
}

export function addProject(project) {
    myProject.push(project);
    saveData();
}

export function updateTaskData(id, newData) {
    const index = myTask.findIndex(t => t.id === id);
    if (index !== -1) {
        myTask[index] = { ...myTask[index], ...newData };
        saveData();
    }
}

export function updateProjectData(id, newData) {
    const index = myProject.findIndex(p => p.id === id);
    if (index !== -1) {
        myProject[index] = { ...myProject[index], ...newData };
        saveData();
    }
}

export function toggleTaskComplete(id, status) {
    const task = myTask.find(t => t.id === id);
    if (task) {
        task.completed = status;
        saveData();
    }
}

export function removeTask(id) {
    myTask = myTask.filter(t => t.id !== id);
    saveData();
}

export function removeProject(id) {
    // Remove from projects array
    myProject = myProject.filter(p => p.id !== id);
    // Remove tasks associated with this project
    myTask = myTask.filter(t => String(t.projectId) !== String(id));
    saveData();
}