document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  const themeToggle = document.getElementById('themeToggle');

  const projects = ['prjct01', 'prjct02', 'prjct03', 'prjct04', 'prjct05', 'prjct06', 'prjct07'];
  const imagesPerProject = [3, 4, 5, 6, 7];

  let loadedImages = [];

  // Load images initially
  function loadImages() {
    projects.forEach((project) => {
      const count = imagesPerProject[Math.floor(Math.random() * imagesPerProject.length)];
      for (let i = 1; i <= count; i++) {
        const img = document.createElement('img');
        const imgWrapper = document.createElement('div');
        const desc = document.createElement('div');
        imgWrapper.className = 'image-wrapper';
        img.className = 'project-image';
        img.src = `assets/images/${project}/${i}.jpg`;
        img.alt = `${project} image ${i}`;

        desc.className = 'image-desc';
        desc.textContent = `${project.toUpperCase()} — Image ${i}`;

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(desc);
        gallery.appendChild(imgWrapper);

        imgWrapper.addEventListener('click', () => {
          lightboxImage.src = img.src;
          lightboxDesc.textContent = desc.textContent;
          lightbox.style.display = 'flex';
        });
      }
    });
  }

  loadImages();

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
