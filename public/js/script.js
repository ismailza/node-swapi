
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

const getFavorites = () => {
  showLoadingIndicator();
  fetch('/favorites', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleResponse)
    .then(data => {
      displayFavorites(data.favorites);
      updateActiveNav('favorites-link');
    })
    .catch(handleError);
}

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
      <div class="card-header d-flex justify-content-between align-items-center">
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

const displayFavorites = (favorites) => {
  addFavoriteModal();
  const respDiv = document.getElementById('response');
  respDiv.innerHTML = '';

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3');
  respDiv.appendChild(headerContainer);

  const title = document.createElement('h2');
  title.classList.add('text-center', 'flex-grow-1');
  title.textContent = 'Favorites';
  headerContainer.appendChild(title);

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Favorite';
  addButton.classList.add('btn', 'btn-sm', 'btn-primary');
  addButton.onclick = function () {
    const modal = new bootstrap.Modal(document.getElementById('addFavoriteModal'));
    modal.show();
  };
  headerContainer.appendChild(addButton);

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container', 'd-flex', 'flex-wrap', 'justify-content-center');
  respDiv.appendChild(cardContainer);

  favorites.forEach(favorite => {
    const card = document.createElement('div');
    card.classList.add('card', 'm-2');
    card.style.width = '25rem';
    card.innerHTML = `
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title">${favorite.name}</h5>
        <button type="button" data-id="${favorite._id}" class="favorite-rm-btn btn-close" aria-label="Close"></button>
      </div>
      <div class="card-body">
        <h6 class="card-subtitle mb-2 text-body-secondary">Type: ${favorite.type}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">URL: ${favorite.url}</h6>
      </div>
    `;
    cardContainer.appendChild(card);
  });
}

const addFavoriteModal = () => {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.id = 'addFavoriteModal';
  modal.tabIndex = '-1';
  modal.setAttribute('aria-labelledby', 'addFavoriteModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addFavoriteModalLabel">Add Favorite</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="addFavoriteForm">
            <div class="mb-3">
              <label for="favName" class="form-label">Name</label>
              <input type="text" class="form-control" id="favName" required>
            </div>
            <div class="mb-3">
              <label for="favType" class="form-label">Type</label>
              <select class="form-select" id="favType" required>
                <option value="movie">Movie</option>
                <option value="character">Character</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="favUrl" class="form-label">URL</label>
              <input type="text" class="form-control" id="favUrl" required>
            </div>
            <button type="submit" class="btn btn-primary">Add Favorite</button>
          </form>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
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

  document.getElementById('favorites-link').addEventListener('click', (e) => {
    e.preventDefault();
    getFavorites();
  });

  document.body.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'addFavoriteForm') {
      e.preventDefault();

      const favName = document.getElementById('favName').value;
      const favType = document.getElementById('favType').value;
      const favUrl = document.getElementById('favUrl').value;

      fetch('/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: favName, type: favType, url: favUrl })
      })
        .then(handleResponse)
        .then(data => {
          alert('Favorite added:', data);
          const modal = bootstrap.Modal.getInstance(document.getElementById('addFavoriteModal'));
          modal.hide();
          document.getElementById('addFavoriteForm').reset();
          getFavorites();
        })
        .catch(handleError => {
          alert('Error:', handleError);
        });
    }
  });

  document.body.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('favorite-rm-btn')) {
      const favId = event.target.getAttribute('data-id');
      alert(`Remove favorite: ${favId}`);
      fetch(`/favorites/${favId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          alert('Favorite removed:', data);
          getFavorites();
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error:', error);
        });
    }
  });

  getFilms();
});
