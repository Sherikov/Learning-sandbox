// === View / DOM Module ===

// DOM Elements
const taskContainer = document.querySelector('#main');
const template = document.querySelector('#taskTemplate');
const mainHeaderTitle = document.querySelector('.logo h1');
const projectChoicefield = document.querySelector('.projectChoice');
const intoProject = document.getElementById('projectChoice'); // Select element
const modal = document.querySelector('.task_modal');
const headerModal = document.querySelector('.modalTitle');
const addbtn = document.querySelector('.btn_add');

// Inputs
const titleInput = document.getElementById('title');
const deadlineInput = document.querySelector('.date_input');
const descriptionInput = document.getElementById('descriptionInput');
const priorityInput = document.getElementById('prioritySelect');

// === EXPORTED RENDER FUNCTIONS ===

// General list drawing function
// It takes an array of data, title, and event handlers (callbacks)
export function renderList(list, titleText, handlers) {
    if (!taskContainer || !template) return;
    
    // Change title
    if (mainHeaderTitle) mainHeaderTitle.textContent = titleText;
    
    taskContainer.innerHTML = ''; // Clear window

    list.forEach(item => {
        if (!item) return; 

        const clone = template.content.cloneNode(true);
        // define the type: if there is a projectId field, it is a task, otherwise it is a project.
        const type = item.hasOwnProperty('projectId') ? 'task' : 'project';
        
        setupCard(clone, item, type, handlers);
        taskContainer.appendChild(clone);
    });
}

// Function to setup the card (fill data and add event listeners)
function setupCard(clone, data, type, handlers) {
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
    const textContentDiv = clone.querySelector('.text_content');

    // === 2. FILLING DATA ===
    if (titleEl) titleEl.textContent = data.title;

    if (dateEl) {
        const dateValue = data.deadline ? data.deadline : "No Deadline";
        // Try to save the icon if it exists in the template
        const icon = dateEl.querySelector('i');
        if (icon) {
            dateEl.innerHTML = `${dateValue} ${icon.outerHTML}`;
        } else {
            dateEl.textContent = dateValue;
        }
    }

    if (descEl) {
        const descText = data.description || data.descriptionInput || "No description";
        descEl.textContent = descText;
    }

    if (priorityEl) {
        priorityEl.textContent = data.priority;
        const priorityValue = (data.priority || '').trim();

        if (priorityValue === 'Low') priorityEl.style.color = 'green'; 
        else if (priorityValue === 'Medium') priorityEl.style.color = '#f1c40f'; 
        else if (priorityValue === 'High') priorityEl.style.color = 'red';
        else priorityEl.style.color = 'inherit'; 
    }

    // === 3. CHECKBOX LOGIC (COMPLETED) ===
    if (checkbox && label) {
        checkbox.checked = data.completed || false;
        
        if (data.completed) label.classList.add('completed');

        checkbox.addEventListener('change', (e) => {
            e.stopPropagation(); // Prevent opening the project
            // Call the handler from index.js
            handlers.onToggleComplete(data.id, checkbox.checked); 
            
            if (checkbox.checked) label.classList.add('completed');
            else label.classList.remove('completed');
        });
    }

    // === 4. DELETE BUTTON LOGIC ===
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const confirmDelete = confirm("Are you sure you want to delete?");
            if (confirmDelete) {
                handlers.onDelete(data.id, type);
            }
        });
    }

    // === 5. EDIT & NAVIGATION LOGIC ===
    if (type === 'project') {
        // Enable Edit button for projects
        if (editBtn) {
            editBtn.style.display = 'block'; 
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                handlers.onEditProject(data);
            });
        }
        // Enable click on title/text to open project
        if (textContentDiv) {
            textContentDiv.style.cursor = 'pointer';
            textContentDiv.addEventListener('click', () => {
                handlers.onOpenProject(data.id);
            });
        }
    } else {
        // Hide edit button for tasks
        if (editBtn) editBtn.style.display = 'none'; 
    }
}

// === HELPER FUNCTIONS FOR MODAL ===

export function updateProjectSelectOptions(projects) {
    if (!intoProject) return;

    intoProject.innerHTML = ''; 

    // Option "By default"
    const defaultOption = document.createElement('option');
    defaultOption.value = ""; 
    defaultOption.textContent = "Without project";
    intoProject.appendChild(defaultOption);

    // Existing projects
    projects.forEach(proj => {
        if (!proj) return;
        const option = document.createElement('option');
        option.value = proj.id;
        option.textContent = proj.title;
        intoProject.appendChild(option);
    });
}

export function showModal(mode, titleText, btnText) {
    modal.showModal();
    headerModal.innerText = titleText;
    addbtn.textContent = btnText;

    if (mode === 'project') {
        if (projectChoicefield) projectChoicefield.style.display = "none";
    } else {
        if (projectChoicefield) projectChoicefield.style.display = 'block';
    }
}

export function closeModal() {
    modal.close();
    document.querySelector('.form').reset();
}

export function fillModalInputs(data) {
    titleInput.value = data.title;
    deadlineInput.value = data.deadline;
    descriptionInput.value = data.description || "";
    priorityInput.value = data.priority;
}

export function getFormData() {
    return {
        title: titleInput.value,
        deadline: deadlineInput.value,
        description: descriptionInput.value,
        priority: priorityInput.value,
        projectId: intoProject.value
    };
}