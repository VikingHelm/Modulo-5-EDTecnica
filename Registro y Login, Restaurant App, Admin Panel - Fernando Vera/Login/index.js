// Crear Selectores

const formC = document.querySelector('#form-create');
const formL = document.querySelector('#form-login');

const loginInput = document.querySelector('#login-input');
const createInput = document.querySelector('#create-input');

const notificacion = document.querySelector('.notification');

// Cuando reciba el submit (REGISTRO)
formC.addEventListener('submit', async e=>{
    e.preventDefault();
    const response = await fetch('http://localhost:3000/users', {method: 'GET'});
    const users = await response.json();

    // Voy a buscar el usuario que estoy colocando en el campo dentro del recurso 'users'
    const user = users.find(user=> user.username === createInput.value);

    // Validamos

    if(!createInput.value){
        // Si el campo está vacío
        notificacion.innerHTML = "El campo no puede estar vacío.";
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        }, 4000);
    }else if(user){
        // En caso de que el usuario exista
        notificacion.innerHTML = "El usuario ya existe.";
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        }, 2800);
    }else{
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({username: createInput.value}),
        });

        notificacion.innerHTML =  `El usuario ${createInput.value} ha sido creado.`
        notificacion.classList.add('show-notification');
        setTimeout(()=>{
            notificacion.classList.remove('show-notification');
        }, 3000)
        // Resetear campo
        createInput.value = '';
    }
})

// (LOGIN)
formL.addEventListener('submit', async e=>{
    e.preventDefault();

    const response = await fetch('http://localhost:3000/users', {method: 'GET'});
    const users = await response.json();
    const input = loginInput.value;

    const userCheck = users.find(user => user.username === input);

    if(!userCheck){
        notificacion.innerHTML = 'El usuario ingresado no existe.'
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        }, 3000);
    } else if(userCheck.username === 'admin'){
        localStorage.setItem('user', JSON.stringify(userCheck));
        window.location.href = '../AdminPanel/index.html';
    } else if(userCheck.username === 'mesero'){
        window.location.href = '../RestaurantApp/index.html';
    }
})