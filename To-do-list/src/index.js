// === Data ===

let rawTasks = JSON.parse(localStorage.getItem('myTask'));
let myTask = Array.isArray(rawTasks) ? rawTasks.filter(t => t !== null) : [];

let rawProjects = JSON.parse(localStorage.getItem('myProject'));
let myProject = Array.isArray(rawProjects) ? rawProjects.filter(p => p !== null) : [];

let activeProjectId = null;
let editingId = null;
let isProjectMode = false;

// === DOM Elements ===
const modal = document.querySelector('.task_modal');
const btnAddTask = document.querySelector('#btnAddTask');
const btnAddProject = document.getElementById('btnAddProject');
const addbtn = document.querySelector('.btn_add');
const cancelBtn = document.querySelector('.btn_cancel');
const headerModal = document.querySelector('.modalTitle');
const projectChoicefield = document.querySelector('.projectChoice');
const form = document.querySelector('.form');
const fabMainBtn = document.getElementById('fabMainBtn'); 

// Inputs
const title = document.getElementById('title');
const deadline = document.querySelector('.date_input'); 
const descriptionInput = document.getElementById('descriptionInput');
const priority = document.getElementById('prioritySelect');
const intoProject = document.getElementById('projectChoice');

// Navbar elements
const mainHeaderTitle = document.querySelector('.logo h1'); 
const btnAllTasks = document.getElementById('btnAllTasks');
const btnProjects = document.getElementById('btnProjects');
const btnUpcoming = document.getElementById('btnUpcoming');
const btnPriority = document.getElementById('btnPriority');

// === GENERAL LIST DRAWING FUNCTION ===
// It takes an array of data and the title to display
function renderCustomList(list, title) {
    const taskContainer = document.querySelector('#main');
    const template = document.querySelector('#taskTemplate');
    if (!taskContainer || !template) return;
    
    // reset the active project ID since we are in the list view mode.
    activeProjectId = null; 
    
    // Change title
    if (mainHeaderTitle) mainHeaderTitle.textContent = title;
    
    taskContainer.innerHTML = ''; // Clear window

    list.forEach(item => {
       
        if (!item) return; 

        const clone = template.content.cloneNode(true);
        
        // define the type: if there is a projectId field, it is a task, otherwise it is a project.
        const type = item.hasOwnProperty('projectId') ? 'task' : 'project';
        
        setupCard(clone, item, type);
        taskContainer.appendChild(clone);
    });
}

// === Event lisneter for buttons ===

// 1. Button "Project"
if (btnProjects) {
    btnProjects.addEventListener('click', () => {
        renderCustomList(myProject, "Projects");
    });
}

// 2. Button "Close-in" (Upcoming)
if (btnUpcoming) {
    btnUpcoming.addEventListener('click', () => {
        // combine projects and tasks into one array
        const allItems = [...myProject, ...myTask];
        
        // Sort: from earliest date to latest
        allItems.sort((a, b) => {
            // ИСПРАВЛЕНИЕ: Защита от ошибок, если элемент пустой
            if (!a || !b) return 0; 
            
            // Если даты нет, считаем её очень далекой
            const dateA = a.deadline ? new Date(a.deadline) : new Date('9999-12-31');
            const dateB = b.deadline ? new Date(b.deadline) : new Date('9999-12-31');
            return dateA - dateB;
        });
        
        renderCustomList(allItems, "Close-in");
    });
}

// 3. Button "By priority"
if (btnPriority) {
    btnPriority.addEventListener('click', () => {
        const allItems = [...myProject, ...myTask];
        
        // Dictionary of "weight" of priorities
        const priorityWeight = {
            'High': 3,
            'Medium': 2,
            'Low': 1
        };
        
        // Sort by priority
        allItems.sort((a, b) => {
            
            if (!a || !b) return 0;

            const weightA = priorityWeight[a.priority] || 0;
            const weightB = priorityWeight[b.priority] || 0;
            return weightB - weightA;
        });
        
        renderCustomList(allItems, "By priority");
    });
}

// === AUXILIARY FUNCTIONS ===

// 1. Saving data
function saveData() {
    localStorage.setItem('myTask', JSON.stringify(myTask));
    localStorage.setItem('myProject', JSON.stringify(myProject));
}

// 2. update list of project in modal window
function updateProjectSelect() {
    if (!intoProject) return;

    const select = document.getElementById('projectChoice');
    select.innerHTML = ''; 

    // Option "By default"
    const defaultOption = document.createElement('option');
    defaultOption.value = ""; 
    defaultOption.textContent = "Without project";
    select.appendChild(defaultOption);

    // Existing projects
    myProject.forEach(proj => {
        if (!proj) return; // ИСПРАВЛЕНИЕ: Проверка
        const option = document.createElement('option');
        option.value = proj.id;
        option.textContent = proj.title;
        select.appendChild(option);
    });
}

// 3. Opening a modal window for EDIT
function openEditModal(projectData) {
    editingId = projectData.id; 
    isProjectMode = true;

    modal.showModal();
    headerModal.innerText = 'Edit Project';

    // Fill in the fields with old data
    title.value = projectData.title;
    deadline.value = projectData.deadline;
    descriptionInput.value = projectData.description || "";
    priority.value = projectData.priority;
    
    // Hiding the project selection
    if (projectChoicefield) projectChoicefield.style.display = 'none';

    addbtn.textContent = "Save Changes";
}

// === Event listener (MODAL) ===

// Adding a new task
if (btnAddTask) {
    btnAddTask.addEventListener('click',() => {
        editingId = null;
        addbtn.textContent = "Add";
        form.reset();
        isProjectMode = false; 
        
        modal.showModal();
        headerModal.innerText= 'Add a new Task';
        
        if (projectChoicefield) {
            projectChoicefield.style.display = 'block';
            updateProjectSelect(); 
        }
    });
}

// Adding a new project
if (btnAddProject) {
    btnAddProject.addEventListener('click', () => {
        editingId = null;
        addbtn.textContent = "Add";
        form.reset();
        isProjectMode = true;
        
        modal.showModal();
        headerModal.innerText = 'Add a new Project';
    
        if (projectChoicefield) {
            projectChoicefield.style.display = "none";
        }
    });
}

// Button "Cancel"
if (cancelBtn) {
    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        editingId = null;
        addbtn.textContent = "Add";
        modal.close();
        form.reset();
    });
}

// === FORM PROCESSING (ADDING / EDITING) ===
if (addbtn) {
    addbtn.addEventListener('click', (e) => {
        e.preventDefault();

        // SCENARIO 1: EDITING
        if (editingId) {
            const projectIndex = myProject.findIndex(p => p.id === editingId);
            if (projectIndex !== -1) {
                myProject[projectIndex].title = title.value;
                myProject[projectIndex].deadline = deadline.value;
                myProject[projectIndex].description = descriptionInput.value;
                myProject[projectIndex].priority = priority.value;
                saveData();
            }
            editingId = null;
            addbtn.textContent = "Add";
        } 
        // SCENARIO 2: CREATION
        else {
            if (!isProjectMode){
                // Creating task
                const newTask = {
                    id: Date.now(),
                    title: title.value,
                    deadline: deadline.value,
                    description: descriptionInput.value,
                    priority : priority.value,
                    projectId : intoProject.value || activeProjectId, 
                    completed: false
                };
                myTask.push(newTask);
                saveData();

            } else {
                // Creating project
                const newProject = {
                    id: Date.now(),
                    title: title.value,
                    deadline: deadline.value,
                    description: descriptionInput.value,
                    priority : priority.value,
                    completed: false
                };
                myProject.push(newProject);
                saveData();
            }
        }

        modal.close();
        form.reset();
        renderMainScreen(); // update window
    });
}


// ===  FAB button ===
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


// === Navigation ===
if (btnAllTasks) {
    btnAllTasks.addEventListener('click', () => {
        activeProjectId = null;
        renderMainScreen();
    });
}


// === Rendering function ===

function renderMainScreen() {
    const taskContainer = document.querySelector('#main');
    const template = document.querySelector('#taskTemplate');
    if (!taskContainer || !template) return;

    taskContainer.innerHTML = ''; 

    // A) If we are on the MAIN PAGE
    if (activeProjectId === null) {
        if (mainHeaderTitle) mainHeaderTitle.textContent = "To Do List";

        myProject.forEach(project => {
            if (!project) return; 
            const clone = template.content.cloneNode(true);
            setupCard(clone, project, 'project');
            taskContainer.appendChild(clone);
        });

        
        const tasksNoProject = myTask.filter(task => task && !task.projectId);
        tasksNoProject.forEach(task => {
            const clone = template.content.cloneNode(true);
            setupCard(clone, task, 'task'); 
            taskContainer.appendChild(clone);
        });

    } 
    // Б) If we are INSIDE THE PROJECT
    else {
        const currentProject = myProject.find(p => p && p.id === activeProjectId);
        if (currentProject) {
            if (mainHeaderTitle) mainHeaderTitle.textContent = currentProject.title; 
        }

        const projectTasks = myTask.filter(task => task && String(task.projectId) === String(activeProjectId));
        
        projectTasks.forEach(task => {
            const clone = template.content.cloneNode(true);
            setupCard(clone, task, 'task');
            taskContainer.appendChild(clone);
        });
    }
}

// Setting up a card (filling in data and handlers)
// Function to setup the card (fill data and add event listeners)
function setupCard(clone, data, type) {
    if (!data) return;

    // === 1. FINDING ELEMENTS ===
    const titleEl = clone.querySelector('.title');
    const dateEl = clone.querySelector('.date');
    const descEl = clone.querySelector('.descriptionCard');
    const priorityEl = clone.querySelector('.priority');
    
    // Find buttons and checkbox
    const checkbox = clone.querySelector('input[type="checkbox"]');
    const label = clone.querySelector('label.checkbox'); 
    const buttons = clone.querySelectorAll('.editbtn'); 
    const editBtn = buttons[0]; 
    const deleteBtn = buttons[1];

    // === 2. FILLING DATA ===
    
    // Title
    if (titleEl) {
        titleEl.textContent = data.title;
    }

    
    if (dateEl) {
    
        const dateValue = data.deadline ? data.deadline : "No Deadline";
        
        // Try to save the icon if it exists in the template
        const icon = dateEl.querySelector('i');
        if (icon) {
            // Set text AND append the icon back
            dateEl.innerHTML = `${dateValue} ${icon.outerHTML}`;
        } else {
            dateEl.textContent = dateValue;
        }
    }

    // Description
    if (descEl) {
        // Check both 'description' and 'descriptionInput' keys just in case
        const descText = data.description || data.descriptionInput || "No description";
        descEl.textContent = descText;
    }

    // Priority
    if (priorityEl) {
        priorityEl.textContent = data.priority;
        const priorityValue = (data.priority || '').trim();

        if (priorityValue === 'Low') {
            priorityEl.style.color = 'green'; 
        } else if (priorityValue === 'Medium') {
            priorityEl.style.color = '#f1c40f'; 
        } else if (priorityValue === 'High') {
            priorityEl.style.color = 'red';
        } else {
            priorityEl.style.color = 'inherit'; 
        }
    }

   

    // === 3. CHECKBOX LOGIC (COMPLETED) ===
    if (checkbox && label) {
        checkbox.checked = data.completed || false;
        
        // Apply style if already completed
        if (data.completed) {
            label.classList.add('completed');
        }

        checkbox.addEventListener('change', (e) => {
            e.stopPropagation(); // Prevent opening the project
            
            data.completed = checkbox.checked;
            
            if (checkbox.checked) {
                label.classList.add('completed');
            } else {
                label.classList.remove('completed');
            }
            saveData();
        });
    }

    // === 4. DELETE BUTTON LOGIC ===
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop click from bubbling to card
            
            const confirmDelete = confirm("Are you sure you want to delete?");
            if (!confirmDelete) return;

            if (type === 'project') {
                // Remove from projects array
                myProject = myProject.filter(p => p.id !== data.id);
                myTask = myTask.filter(t => String(t.projectId) !== String(data.id));}
                if (activeProjectId === data.id) {
                    activeProjectId = null;
                }
                else {
                // Remove from tasks array
                myTask = myTask.filter(t => t.id !== data.id);
            }
            
            saveData();
            renderMainScreen(); // Refresh UI
        });
    }

    // === 5. EDIT & NAVIGATION LOGIC ===
    if (type === 'project') {
        // Enable Edit button for projects
        if (editBtn) {
            editBtn.style.display = 'block'; // Ensure it's visible
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openEditModal(data);
            });
        }

        // Enable click on title/text to open project
        const textContentDiv = clone.querySelector('.text_content');
        if (textContentDiv) {
            textContentDiv.style.cursor = 'pointer';
            textContentDiv.addEventListener('click', () => {
                activeProjectId = data.id; 
                renderMainScreen();
            });
        }
        
    } else {
        // Hide edit button for tasks (as per your request)
        if (editBtn) {
            editBtn.style.display = 'none'; 
        }
    }
}

renderMainScreen();