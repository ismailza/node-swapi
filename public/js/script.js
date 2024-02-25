
const getFilms = () => {
  showLoadingIndicator();
  fetch('/api/films', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleResponse)
    .then(data => {
      displayFilms(data.results);
      updateActiveNav('films-link');
    })
    .catch(handleError);
};

const getPeople = () => {
  showLoadingIndicator();
  fetch('/api/people', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleResponse)
    .then(data => {
      displayPeople(data.results);
      updateActiveNav('people-link');
    })
    .catch(handleError);
};

const displayFilms = (movies) => {
  const respDiv = document.getElementById('response');
  respDiv.innerHTML = '';
  const title = document.createElement('h2');
  title.classList.add('text-center');
  title.textContent = 'Films';
  respDiv.appendChild(title);
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container', 'd-flex', 'flex-wrap', 'justify-content-center');
  respDiv.appendChild(cardContainer);
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('card', 'm-2');
    card.style.width = '25rem';
    card.innerHTML = `
      <div class="card-header">
        <h5 class="card-title">${movie.title}</h5>
      </div>
      <div class="card-body">
        <h6 class="card-subtitle mb-2 text-body-secondary">Director: ${movie.director}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Producer: ${movie.producer}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Release Date: ${movie.release_date}</h6>
        <p class="card-text">${movie.opening_crawl}</p>
      </div>
    `;
    cardContainer.appendChild(card);
  });
};

const displayPeople = (people) => {
  const respDiv = document.getElementById('response');
  respDiv.innerHTML = '';
  const title = document.createElement('h2');
  title.classList.add('text-center');
  title.textContent = 'People';
  respDiv.appendChild(title);
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container', 'd-flex', 'flex-wrap', 'justify-content-center');
  respDiv.appendChild(cardContainer);
  people.forEach(person => {
    const card = document.createElement('div');
    card.classList.add('card', 'm-2');
    card.style.width = '25rem';
    card.innerHTML = `
      <div class="card-header">
        <h5 class="card-title">${person.name}</h5>
      </div>
      <div class="card-body">
        <h6 class="card-subtitle mb-2 text-body-secondary">Height: ${person.height}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Mass: ${person.mass}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Hair Color: ${person.hair_color}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Skin Color: ${person.skin}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Eye Color: ${person.eye_color}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Birth Year: ${person.birth_year}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Gender: ${person.gender}</h6>
      </div>
    `;
    cardContainer.appendChild(card);
  });
}

const handleResponse = response => {
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const handleError = error => {
  console.error('Fetch Error:', error.message);
};

const showLoadingIndicator = () => {
  document.getElementById('response').innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
};

const updateActiveNav = (activeId) => {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  document.getElementById(activeId).classList.add('active');
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('films-link').addEventListener('click', (e) => {
    e.preventDefault();
    getFilms();
  });

  document.getElementById('people-link').addEventListener('click', (e) => {
    e.preventDefault();
    getPeople();
  });

  getFilms();
});
