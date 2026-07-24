document.addEventListener('DOMContentLoaded', () => {

  // --- 1. INVENTORY FILTERING LOGIC ---
  const searchInput = document.getElementById('searchInput');
  const makeFilter = document.getElementById('makeFilter');
  const bodyFilter = document.getElementById('bodyFilter');
  const carItems = document.querySelectorAll('.car-item');

  function filterInventory() {
    if (!carItems.length) return;

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedMake = makeFilter ? makeFilter.value.toLowerCase() : 'all';
    const selectedBody = bodyFilter ? bodyFilter.value.toLowerCase() : 'all';

    carItems.forEach(item => {
      const title = item.dataset.title.toLowerCase();
      const make = item.dataset.make.toLowerCase();
      const body = item.dataset.body.toLowerCase();

      const matchesSearch = title.includes(searchTerm);
      const matchesMake = (selectedMake === 'all' || make === selectedMake);
      const matchesBody = (selectedBody === 'all' || body === selectedBody);

      if (matchesSearch && matchesMake && matchesBody) {
        item.classList.remove('d-none');
      } else {
        item.classList.add('d-none');
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterInventory);
  if (makeFilter) makeFilter.addEventListener('change', filterInventory);
  if (bodyFilter) bodyFilter.addEventListener('change', filterInventory);


  // --- 2. FINANCING CALCULATOR LOGIC (details.html) ---
  const calcBtn = document.getElementById('calcBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const price = parseFloat(document.getElementById('calcPrice').value) || 0;
      const down = parseFloat(document.getElementById('calcDown').value) || 0;
      const rate = (parseFloat(document.getElementById('calcRate').value) || 0) / 100 / 12;
      const months = parseInt(document.getElementById('calcTerm').value) || 60;

      const principal = price - down;
      if (principal <= 0) {
        document.getElementById('monthlyPayment').innerText = '$0';
        return;
      }

      let monthly = 0;
      if (rate === 0) {
        monthly = principal / months;
      } else {
        monthly = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      }

      document.getElementById('monthlyPayment').innerText = `$${Math.round(monthly).toLocaleString()}/mo`;
    });
  }

  // --- 3. GALLERY THUMBNAIL SWITCHER (details.html) ---
  const mainImg = document.getElementById('mainDetailImg');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      if (mainImg) mainImg.src = this.src;
      thumbs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // --- 4. FORM VALIDATION HANDLING ---
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        alert('Form submitted successfully!');
        form.reset();
        form.classList.remove('was-validated');
      }
      form.classList.add('was-validated');
    }, false);
  });

});