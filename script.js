document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });

            // If switching to preview tab, generate CV preview
            if (tabId === 'preview') {
                generateCVPreview();
            }
        });
    });

    // Back to edit button
    document.getElementById('back-to-edit').addEventListener('click', () => {
        document.querySelector('[data-tab="edit"]').click();
    });

    // Photo toggle
    const includePhotoCheckbox = document.getElementById('include-photo');
    const photoUploadContainer = document.getElementById('photo-upload-container');

    includePhotoCheckbox.addEventListener('change', () => {
        photoUploadContainer.classList.toggle('hidden', !includePhotoCheckbox.checked);
    });

    // Photo preview
    const photoInput = document.getElementById('photo');
    const photoPreviewContainer = document.getElementById('photo-preview-container');
    const photoPreview = document.getElementById('photo-preview');

    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                photoPreview.src = e.target.result;
                photoPreviewContainer.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    // Range input value display
    document.addEventListener('input', (e) => {
        if (e.target.type === 'range') {
            const valueDisplay = e.target.closest('.form-group').querySelector('.level-value');
            if (valueDisplay) {
                valueDisplay.textContent = e.target.value;
            }
        }
    });

    // Add Education
    let educationCounter = 1;
    document.getElementById('add-education').addEventListener('click', () => {
        educationCounter++;
        const educationContainer = document.getElementById('education-container');
        
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';
        educationItem.dataset.id = educationCounter;
        
        educationItem.innerHTML = `
            <div class="form-grid">
                <div class="form-group">
                    <label for="institution-${educationCounter}">Institution</label>
                    <input type="text" id="institution-${educationCounter}" name="institution" placeholder="University Name">
                </div>
                <div class="form-group">
                    <label for="degree-${educationCounter}">Degree</label>
                    <input type="text" id="degree-${educationCounter}" name="degree" placeholder="Bachelor of Science">
                </div>
                <div class="form-group with-delete">
                    <label for="year-${educationCounter}">Year</label>
                    <div class="input-with-button">
                        <input type="text" id="year-${educationCounter}" name="year" placeholder="2018 - 2022">
                        <button class="btn-delete delete-education">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        educationContainer.appendChild(educationItem);
        updateDeleteButtons();
    });

    // Add Experience
    let experienceCounter = 1;
    document.getElementById('add-experience').addEventListener('click', () => {
        experienceCounter++;
        const experienceContainer = document.getElementById('experience-container');
        
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        experienceItem.dataset.id = experienceCounter;
        
        experienceItem.innerHTML = `
            <div class="form-grid">
                <div class="form-group">
                    <label for="company-${experienceCounter}">Company</label>
                    <input type="text" id="company-${experienceCounter}" name="company" placeholder="Company Name">
                </div>
                <div class="form-group">
                    <label for="position-${experienceCounter}">Position</label>
                    <input type="text" id="position-${experienceCounter}" name="position" placeholder="Software Engineer">
                </div>
                <div class="form-group with-delete">
                    <label for="duration-${experienceCounter}">Duration</label>
                    <div class="input-with-button">
                        <input type="text" id="duration-${experienceCounter}" name="duration" placeholder="Jan 2020 - Present">
                        <button class="btn-delete delete-experience">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="form-group full-width">
                <label for="description-${experienceCounter}">Description</label>
                <textarea id="description-${experienceCounter}" name="description" rows="3" placeholder="Describe your responsibilities and achievements"></textarea>
            </div>
        `;
        
        experienceContainer.appendChild(experienceItem);
        updateDeleteButtons();
    });

    // Add Skill
    let skillCounter = 1;
    document.getElementById('add-skill').addEventListener('click', () => {
        skillCounter++;
        const skillsContainer = document.getElementById('skills-container');
        
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.dataset.id = skillCounter;
        
        skillItem.innerHTML = `
            <div class="form-grid">
                <div class="form-group">
                    <label for="skill-${skillCounter}">Skill</label>
                    <input type="text" id="skill-${skillCounter}" name="skill" placeholder="JavaScript">
                </div>
                <div class="form-group with-delete">
                    <label for="level-${skillCounter}">Proficiency Level (1-5): <span class="level-value">3</span></label>
                    <div class="input-with-button">
                        <input type="range" id="level-${skillCounter}" name="level" min="1" max="5" value="3" class="range-input">
                        <button class="btn-delete delete-skill">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        skillsContainer.appendChild(skillItem);
        updateDeleteButtons();
    });

    // Delete buttons functionality
    document.addEventListener('click', (e) => {
        if (e.target.closest('.delete-education')) {
            const educationItem = e.target.closest('.education-item');
            educationItem.remove();
            updateDeleteButtons();
        }
        
        if (e.target.closest('.delete-experience')) {
            const experienceItem = e.target.closest('.experience-item');
            experienceItem.remove();
            updateDeleteButtons();
        }
        
        if (e.target.closest('.delete-skill')) {
            const skillItem = e.target.closest('.skill-item');
            skillItem.remove();
            updateDeleteButtons();
        }
    });

    // Update delete buttons (disable if only one item)
    function updateDeleteButtons() {
        const educationItems = document.querySelectorAll('.education-item');
        const experienceItems = document.querySelectorAll('.experience-item');
        const skillItems = document.querySelectorAll('.skill-item');
        
        document.querySelectorAll('.delete-education').forEach(btn => {
            btn.disabled = educationItems.length <= 1;
        });
        
        document.querySelectorAll('.delete-experience').forEach(btn => {
            btn.disabled = experienceItems.length <= 1;
        });
        
        document.querySelectorAll('.delete-skill').forEach(btn => {
            btn.disabled = skillItems.length <= 1;
        });
    }

    // Generate CV Preview
    function generateCVPreview() {
        const cvPreview = document.getElementById('cv-preview');
        
        // Get personal info
        const name = document.getElementById('name').value || 'Your Name';
        const title = document.getElementById('title').value || 'Professional Title';
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const summary = document.getElementById('summary').value;
        
        // Check if photo is included
        const includePhoto = document.getElementById('include-photo').checked;
        const photoSrc = includePhoto && document.getElementById('photo-preview').src ? document.getElementById('photo-preview').src : null;
        
        // Get education items
        const educationItems = document.querySelectorAll('.education-item');
        const educationData = Array.from(educationItems).map(item => {
            const id = item.dataset.id;
            return {
                institution: document.getElementById(`institution-${id}`).value,
                degree: document.getElementById(`degree-${id}`).value,
                year: document.getElementById(`year-${id}`).value
            };
        }).filter(edu => edu.institution || edu.degree);
        
        // Get experience items
        const experienceItems = document.querySelectorAll('.experience-item');
        const experienceData = Array.from(experienceItems).map(item => {
            const id = item.dataset.id;
            return {
                company: document.getElementById(`company-${id}`).value,
                position: document.getElementById(`position-${id}`).value,
                duration: document.getElementById(`duration-${id}`).value,
                description: document.getElementById(`description-${id}`).value
            };
        }).filter(exp => exp.company || exp.position);
        
        // Get skill items
        const skillItems = document.querySelectorAll('.skill-item');
        const skillsData = Array.from(skillItems).map(item => {
            const id = item.dataset.id;
            return {
                name: document.getElementById(`skill-${id}`).value,
                level: document.getElementById(`level-${id}`).value
            };
        }).filter(skill => skill.name);
        
        // Build CV HTML
        let cvHTML = `
            <header class="cv-header ${includePhoto && photoSrc ? 'with-photo' : 'no-photo'}">
                <div class="${includePhoto && photoSrc ? 'cv-info' : ''}">
                    <h1 class="cv-name">${name}</h1>
                    <p class="cv-title">${title}</p>
                    
                    <div class="cv-contact">
                        ${email ? `<p>${email}</p>` : ''}
                        ${phone ? `<p>${phone}</p>` : ''}
                        ${address ? `<p>${address}</p>` : ''}
                    </div>
                </div>
                
                ${includePhoto && photoSrc ? `
                    <div class="cv-photo-container">
                        <img src="${photoSrc}" alt="${name}" class="cv-photo">
                    </div>
                ` : ''}
            </header>
        `;
        
        // Summary section
        if (summary) {
            cvHTML += `
                <section class="cv-section">
                    <h2 class="cv-section-title">Professional Summary</h2>
                    <p>${summary}</p>
                </section>
            `;
        }
        
        // Experience section
        if (experienceData.length > 0) {
            cvHTML += `
                <section class="cv-section">
                    <h2 class="cv-section-title">Work Experience</h2>
                    ${experienceData.map(exp => `
                        <div class="cv-experience-item">
                            <div class="cv-item-header">
                                <h3 class="cv-item-title">${exp.position || 'Position'}</h3>
                                <span class="cv-item-duration">${exp.duration || 'Duration'}</span>
                            </div>
                            <p class="cv-item-subtitle">${exp.company || 'Company'}</p>
                            ${exp.description ? `<p class="cv-item-description">${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                </section>
            `;
        }
        
        // Education section
        if (educationData.length > 0) {
            cvHTML += `
                <section class="cv-section">
                    <h2 class="cv-section-title">Education</h2>
                    ${educationData.map(edu => `
                        <div class="cv-education-item">
                            <div class="cv-item-header">
                                <h3 class="cv-item-title">${edu.degree || 'Degree'}</h3>
                                <span class="cv-item-duration">${edu.year || 'Year'}</span>
                            </div>
                            <p class="cv-item-subtitle">${edu.institution || 'Institution'}</p>
                        </div>
                    `).join('')}
                </section>
            `;
        }
        
        // Skills section
        if (skillsData.length > 0) {
            cvHTML += `
                <section class="cv-section">
                    <h2 class="cv-section-title">Skills</h2>
                    <div class="cv-skills">
                        ${skillsData.map(skill => `
                            <div class="cv-skill">
                                <span class="cv-skill-name">${skill.name}</span>
                                <div class="cv-skill-bar">
                                    <div class="cv-skill-level" style="width: ${(skill.level / 5) * 100}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            `;
        }
        
        // Update CV preview
        cvPreview.innerHTML = cvHTML;
    }

    // Download PDF
    document.getElementById('download-pdf').addEventListener('click', () => {
        const cvPreview = document.getElementById('cv-preview');
        const name = document.getElementById('name').value || 'CV';
        
        const opt = {
            margin: 10,
            filename: `${name.replace(/\s+/g, '_')}_CV.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(cvPreview).save();
    });

    // Initialize delete buttons
    updateDeleteButtons();
});