const url = "http://localhost:3333/api"


// Evento para criar usuario
document.getElementById('send').addEventListener('click', (event) => {
      const name = document.getElementById('EnterUserName').value;
      const email = document.getElementById('EnterUserEmail').value;
      
      addNewUser({
          name,
          email
      });
});

// Evento para editar usuario
document.getElementById('send-update').addEventListener('click', (event) => {
  const id = document.getElementById('EnterUserId').value;
  const name = document.getElementById('EnterUserName2').value;
  const email = document.getElementById('EnterUserEmail2').value;
  
  updateUser({
    name,
    email
  }, Number(id));
});

// Evento para deletar usuario
document.getElementById('send-delete').addEventListener('click', (event) => {
  const id = document.getElementById('EnterUserId2').value;
  
  deleteUser(Number(id));
});

// Evento para pegar um usuario
document.getElementById('send-get').addEventListener('click', (event) => {
  const id = document.getElementById('EnterUserId3').value;
  
  getUser(Number(id));
});



// Função para acessar rota get
function getUsers() {

  axios.get(url)
    .then(response => {
      const data = response.data;

      renderApiResult.textContent = JSON.stringify(data);
    })
    .catch(error => console.log(error));
}

// Função para acessar rota get
function getUser(userId) {

  axios.get(`${url}/${userId}`)
    .then(response => {

      const data = response.data;

      userNome.textContent = `name: ${data.name}`;
      userID.textContent = `id: ${data.id}`;
      userEmail.textContent = `email: ${data.email}`;
    })
    .catch(error => console.log(error))
}

// Função para acessar rota post
function addNewUser(newUser) {

  axios.post(url, newUser)
    .then(response => {
      alert(JSON.stringify(response.data));
      getUsers();
    })
    .catch(error => console.error(error));
}

// Função para acessar rota put
function updateUser(user, id) {

  axios.put(`${url}/${id}`, user)
    .then(response => {
      alert(JSON.stringify(response.data));
      getUsers();
    })
    .catch(error => console.error(error));
}

// Função para acessar rota delete
function deleteUser(id) {
  axios.delete(`${url}/${id}`)
    .then(response => {
      alert(JSON.stringify(response.data));
      getUsers();
    })
    .catch(error => console.error(error));
}


getUsers();