const inputBox = document.getElementById('zoneAjout');
const conteneur = document.getElementById('list-boite');
const boutonAjouter = document.getElementById('ajouter');

function createTask(text) {
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  const li = document.createElement('li');
  const boutonE = document.createElement('button');

  checkbox.type = 'checkbox';
  checkbox.className = 'check';

  label.innerText = text;

  boutonE.innerText = '×';
  boutonE.className = 'boutonE';
  boutonE.addEventListener('click', () => {
    li.remove();
    saveData();
  });

  li.appendChild(boutonE);
  li.appendChild(checkbox);
  li.appendChild(label);

  conteneur.appendChild(li);
}

boutonAjouter.addEventListener('click', () => {
  if (inputBox.value.trim() === '') {
    alert('Vous devez écrire une tâche');
  } else {
    createTask(inputBox.value.trim());
    inputBox.value = '';
    saveData();
  }
});

function saveData() {
  const tasks = [];
  conteneur.querySelectorAll('label').forEach(label => {
    tasks.push(label.innerText);
  });
  localStorage.setItem('taches', JSON.stringify(tasks));
  localStorage.setItem('derniereMiseAJour', Date.now().toString());
}

function showList() {
  const derniereMiseAJour = parseInt(localStorage.getItem('derniereMiseAJour'), 10);
  const maintenant = Date.now();
  const vingtQuatreHeures = 24 * 60 * 60 * 1000;

  // Réinitialise si plus de 24h se sont écoulées
  if (!derniereMiseAJour || maintenant - derniereMiseAJour > vingtQuatreHeures) {
    localStorage.removeItem('taches');
    localStorage.setItem('derniereMiseAJour', maintenant.toString());
    return;
  }

  const tasks = JSON.parse(localStorage.getItem('taches')) || [];
  tasks.forEach(task => createTask(task));
}

showList();