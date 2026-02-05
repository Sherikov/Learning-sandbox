import '../styles.css'; 
import * as Storage from './storage.js';
import * as DOM from './DOM.js';

// === State ===
let activeProjectId = null;
let editingId = null;
let isProjectMode = false;

// === Elements ===
const btnAllTasks = document.getElementById('btnAllTasks');
const btnProjects = document.getElementById('btnProjects');
const btnUpcoming = document.getElementById('btnUpcoming');
const btnPriority = document.getElementById('btnPriority');
const btnAddTask = document.querySelector('#btnAddTask');
const btnAddProject = document.getElementById('btnAddProject');
const cancelBtn = document.querySelector('.btn_cancel');
const addbtn = document.querySelector('.btn_add');
const fabMainBtn = document.getElementById('fabMainBtn');

// === Core Logic: Refresh Screen ===
function renderMainScreen() {
    let itemsToShow = [];
    let title = "To Do List";

    // 1. Get Data based on state
    if (activeProjectId === null) {
        // Main Screen
        const projects = Storage.getProjects();
        // Tasks without project
        const tasksNoProject = Storage.getTasks().filter(task => task && !task.projectId);
        itemsToShow = [...projects, ...tasksNoProject];
    } else {
        // Inside a Project
        const currentProject = Storage.getProjects().find(p => p && p.id === activeProjectId);
        if (currentProject) {
            title = currentProject.title;
            // Tasks for this project
            itemsToShow = Storage.getTasks().filter(task => task && String(task.projectId) === String(activeProjectId));
        } else {
            // If project was deleted, go back
            activeProjectId = null;
            renderMainScreen();
            return;
        }
    }

    // 2. Render with Callbacks
    DOM.renderList(itemsToShow, title, {
        onDelete: (id, type) => {
            if (type === 'project') {
                Storage.removeProject(id);
                if (activeProjectId === id) activeProjectId = null;
            } else {
                Storage.removeTask(id);
            }
            renderMainScreen();
        },
        onToggleComplete: (id, status) => {
            Storage.toggleTaskComplete(id, status);
        },
        onOpenProject: (id) => {
            activeProjectId = id;
            renderMainScreen();
        },
        onEditProject: (data) => {
            editingId = data.id;
            isProjectMode = true;
            DOM.fillModalInputs(data);
            DOM.showModal('project', 'Edit Project', 'Save Changes');
        }
    });
}

// === Navigation Events ===

// 1. Main
if (btnAllTasks) {
    btnAllTasks.addEventListener('click', () => {
        activeProjectId = null;
        renderMainScreen();
    });
}

// 2. Button "Project" (Show only projects)
if (btnProjects) {
    btnProjects.addEventListener('click', () => {
        activeProjectId = null; // Reset view
        const projects = Storage.getProjects();
        
        // Pass dummy handlers or reuse existing ones
        DOM.renderList(projects, "Projects", {
            onDelete: (id) => { Storage.removeProject(id); renderMainScreen(); },
            onEditProject: (data) => { /* logic same as above */ },
            onOpenProject: (id) => { activeProjectId = id; renderMainScreen(); }
        });
    });
}

// 3. Button "Close-in" (Upcoming)
if (btnUpcoming) {
    btnUpcoming.addEventListener('click', () => {
        activeProjectId = null;
        const allItems = [...Storage.getProjects(), ...Storage.getTasks()];
        
        // Sort: from earliest date to latest
        allItems.sort((a, b) => {
            // FIX: Protection against errors if element is empty
            if (!a || !b) return 0; 
            
            // If no date, consider it very far future
            const dateA = a.deadline ? new Date(a.deadline) : new Date('9999-12-31');
            const dateB = b.deadline ? new Date(b.deadline) : new Date('9999-12-31');
            return dateA - dateB;
        });

        // We pass empty handlers for simplicity in this view, or full ones if you want interactivity here
        DOM.renderList(allItems, "Close-in", {
            onDelete: (id, type) => { /* logic */ },
            onToggleComplete: (id, status) => Storage.toggleTaskComplete(id, status)
        });
    });
}

// 4. Button "By priority"
if (btnPriority) {
    btnPriority.addEventListener('click', () => {
        activeProjectId = null;
        const allItems = [...Storage.getProjects(), ...Storage.getTasks()];
        
        // Dictionary of "weight" of priorities
        const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
        
        // Sort by priority
        allItems.sort((a, b) => {
            if (!a || !b) return 0;
            const weightA = priorityWeight[a.priority] || 0;
            const weightB = priorityWeight[b.priority] || 0;
            return weightB - weightA;
        });
        
        DOM.renderList(allItems, "By priority", {
            onDelete: (id, type) => { /* logic */ },
            onToggleComplete: (id, status) => Storage.toggleTaskComplete(id, status)
        });
    });
}

// === Modal & Form Events ===

if (btnAddTask) {
    btnAddTask.addEventListener('click',() => {
        editingId = null;
        isProjectMode = false;
        DOM.updateProjectSelectOptions(Storage.getProjects());
        DOM.showModal('task', 'Add a new Task', 'Add');
    });
}

if (btnAddProject) {
    btnAddProject.addEventListener('click', () => {
        editingId = null;
        isProjectMode = true;
        DOM.showModal('project', 'Add a new Project', 'Add');
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        editingId = null;
        DOM.closeModal();
    });
}

// === FORM PROCESSING (ADDING / EDITING) ===
if (addbtn) {
    addbtn.addEventListener('click', (e) => {
        e.preventDefault();
        const formData = DOM.getFormData();

        // SCENARIO 1: EDITING
        if (editingId) {
            // Only projects support editing in this version
            Storage.updateProjectData(editingId, {
                title: formData.title,
                deadline: formData.deadline,
                description: formData.description,
                priority: formData.priority
            });
            editingId = null;
        } 
        // SCENARIO 2: CREATION
        else {
            if (!isProjectMode){
                // Creating task
                const newTask = {
                    id: Date.now(),
                    title: formData.title,
                    deadline: formData.deadline,
                    description: formData.description,
                    priority: formData.priority,
                    projectId: formData.projectId || activeProjectId, 
                    completed: false
                };
                Storage.addTask(newTask);
            } else {
                // Creating project
                const newProject = {
                    id: Date.now(),
                    title: formData.title,
                    deadline: formData.deadline,
                    description: formData.description,
                    priority: formData.priority,
                    completed: false
                };
                Storage.addProject(newProject);
            }
        }

        DOM.closeModal();
        renderMainScreen(); // update window
    });
}

// === FAB button ===
if (fabMainBtn) {
    fabMainBtn.addEventListener('click', () => {
        const container = document.getElementById('fabContainer');
        if (container) container.classList.toggle('active');
    });
}

document.addEventListener('click', function(event) {
    const container = document.getElementById('fabContainer');
    if (container && container.classList.contains('active')) {
        if (!container.contains(event.target) && event.target !== fabMainBtn && !fabMainBtn.contains(event.target)) {
            container.classList.remove('active');
        }
    }
});

// Initial Render
renderMainScreen();