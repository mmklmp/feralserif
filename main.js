document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const activeFilters = new Set();

    // 1. Initialize Layout
    const initGallery = () => {
        gallery.innerHTML = '';
        projectData
            .filter(p => activeFilters.size === 0 || activeFilters.has(p.tag))
            .forEach(proj => {
                // Random Spacer logic
                if (Math.random() > 0.85) {
                    const spacer = document.createElement('div');
                    spacer.className = 'hidden md:block col-span-2 row-span-2';
                    gallery.appendChild(spacer);
                }

                const el = document.createElement('div');
                const span = ['span-wide', 'span-tall', 'span-reg'][Math.floor(Math.random() * 3)];
                const mobile = Math.random() > 0.7 ? 'mobile-full' : '';
                
                el.className = `grid-item ${span} ${mobile} cursor-pointer border-[0.5px] border-black/5`;
                el.innerHTML = `
                    <img src="${proj.img}" alt="${proj.title}" loading="lazy">
                    <div class="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity p-6 flex flex-col justify-end bg-transparent">
                        <p class="serif text-xl">${proj.title}</p>
                        <p class="text-[10px] uppercase">${proj.tag} — ${proj.date}</p>
                    </div>
                `;
                el.onclick = () => openLightbox(proj);
                gallery.appendChild(el);
            });
    };

    // 2. Filter System
    const setupFilters = () => {
        const container = document.getElementById('filter-options');
        const tags = [...new Set(projectData.map(p => p.tag))];
        
        tags.forEach(tag => {
            const label = document.createElement('label');
            label.className = 'flex items-center cursor-pointer';
            label.innerHTML = `<input type="checkbox" value="${tag}" class="mr-2"> ${tag}`;
            label.querySelector('input').onchange = (e) => {
                if (e.target.checked) activeFilters.add(tag);
                else activeFilters.delete(tag);
                updateUI();
            };
            container.appendChild(label);
        });
    };

    const updateUI = () => {
        document.getElementById('filter-count').innerText = activeFilters.size;
        document.getElementById('filter-count').classList.toggle('hidden', activeFilters.size === 0);
        initGallery();
    };

    // 3. Modals & Lightbox
    const openLightbox = (proj) => {
        document.getElementById('lightbox-img').src = proj.img;
        document.getElementById('lightbox-caption').innerHTML = `<h3 class="serif text-2xl">${proj.title}</h3>`;
        document.getElementById('lightbox').classList.add('active');
    };

    // Global Modal Listeners
    document.querySelectorAll('[data-modal-trigger]').forEach(btn => {
        btn.onclick = () => document.getElementById(btn.dataset.modalTrigger).classList.add('active');
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.onclick = () => btn.closest('.modal').classList.remove('active');
    });

    // Close on ESC
    window.onkeydown = (e) => { if (e.key === 'Escape') document.querySelectorAll('.modal').forEach(m => m.classList.remove('active')); };

    // Scroll effect
    window.onscroll = () => {
        document.getElementById('main-nav').classList.toggle('is-scrolled', window.scrollY > 50);
    };

    setupFilters();
    initGallery();
});
