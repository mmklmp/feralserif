document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  const themeToggle = document.getElementById('themeToggle');

  // Load projects from JSON
  fetch('data/projects.json')
    .then(res => res.json())
    .then(data => {
      data.projects.forEach(project => {
        project.images.forEach((image, index) => {
          const imgWrapper = document.createElement('div');
          imgWrapper.className = 'image-wrapper';
          imgWrapper.setAttribute('data-category', project.category);

          const img = document.createElement('img');
          img.className = 'project-image';
          img.src = image.src;
          img.alt = `${project.id} image ${index + 1}`;

          const desc = document.createElement('div');
          desc.className = 'image-desc';
          desc.textContent = `${project.id.toUpperCase()} — ${image.description}`;

          imgWrapper.appendChild(img);
          imgWrapper.appendChild(desc);
          gallery.appendChild(imgWrapper);

          imgWrapper.addEventListener('click', () => {
            lightboxImage.src = img.src;
            lightboxDesc.textContent = desc.textContent;
            lightbox.style.display = 'flex';
          });
        });
      });
    });

  // Lightbox Close
  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  // Theme Toggle
  themeToggle.addEventListener('change', () => {
    document.documentElement.setAttribute('data-theme', themeToggle.checked ? 'light' : 'dark');
  });

  // Modal Triggers
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-close');
      document.querySelector(target).style.display = 'none';
    });
  });

  document.getElementById('aboutBtn').addEventListener('click', () => {
    document.getElementById('aboutModal').style.display = 'flex';
  });

  document.getElementById('contactBtn').addEventListener('click', () => {
    document.getElementById('contactModal').style.display = 'flex';
  });

  document.getElementById('filterBtn').addEventListener('click', () => {
    document.getElementById('filterModal').style.display = 'flex';
  });
});
