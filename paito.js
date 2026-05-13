// --- 1. FITUR TOMBOL CLEAR ---
const btnSubmit = document.getElementById('btnSubmit');
if (btnSubmit) {
  btnSubmit.addEventListener('click', () => {
    document.querySelectorAll('td').forEach(cell => {
      cell.style.background = ''; 
    });
  });
}

// --- 2. FITUR MEMILIH WARNA ---
let curColor = '';
let eraseState = false;

const colors = document.querySelectorAll('#color-selector .color');
colors.forEach(colorEl => {
  colorEl.addEventListener('click', function() {
    colors.forEach(el => el.classList.remove('selected'));
    this.classList.add('selected');
    
    if (this.getAttribute('data-color') === 'eraser') {
      eraseState = true;
    } else {
      eraseState = false;
      curColor = this.getAttribute('data-color');
    }
  });
});

// --- 3. FITUR KLIK UNTUK MEWARNAI (AMP & MOBILE FRIENDLY) ---
const tbody = document.querySelector('#drawing-table tbody');
if (tbody) {
  tbody.addEventListener('click', (e) => {
    // Mengecek apakah yang diklik adalah <td> dan BUKAN bagian header (Senin, Selasa, dll)
    if (e.target.tagName === 'TD' && e.target.parentElement && !e.target.parentElement.classList.contains('headd')) {
      if (eraseState) {
        e.target.style.background = '';
      } else if (curColor !== '') {
        e.target.style.background = curColor;
      }
    }
  });
}

// --- 4. FITUR FILTER ANGKA (AS, KOP, KEP, EKR) ---
const inputs = [
  { id: 'asc', offset: 1, prefix: 'a' },
  { id: 'kopc', offset: 2, prefix: 'c' },
  { id: 'kepalac', offset: 3, prefix: 'k' },
  { id: 'ekorc', offset: 4, prefix: 'e' }
];

inputs.forEach(inputObj => {
  const inputEl = document.getElementById(inputObj.id);
  if (inputEl) {
    // Menggunakan event 'input' agar pergerakan keyboard HP langsung terdeteksi
    inputEl.addEventListener('input', () => {
      const val = inputEl.value.trim();
      const targetCells = document.querySelectorAll(`td.asu:nth-child(5n+${inputObj.offset})`);
      
      targetCells.forEach(cell => {
        const text = cell.innerText.trim();
        // Hapus class warna filter bawaan sebelumnya
        cell.className = cell.className.replace(new RegExp(`\\b${inputObj.prefix}\\d\\b`, 'g'), '').trim();
        
        // Tambahkan class baru jika angka yang diketik cocok
        if (val.length > 0 && text === val) {
          cell.classList.add(inputObj.prefix + text);
        }
      });
    });
  }
});

// --- 5. FITUR TOMBOL RESET FILTER ---
const rb = document.getElementById('rb');
if (rb) {
  rb.addEventListener('click', () => {
    // Kosongkan form input
    document.getElementById('myForm').reset();
    
    // Hapus semua class warna filter
    document.querySelectorAll('td.asu').forEach(cell => {
      cell.className = cell.className.replace(/\b[ekca]\d\b/g, '').trim();
    });
  });
}
