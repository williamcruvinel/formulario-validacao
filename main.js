// Classe responsável por validar o formulário
class ValidaFormulario {
    constructor() {
        // Seleciona o formulário pelo seletor de classe ".formulario"
        this.formulario = document.querySelector('.formulario');
        this.eventos(); // Adiciona os eventos aos elementos do formulário
    }
    // Adiciona os eventos aos elementos do formulário
    eventos() {
        this.formulario.addEventListener('submit', event => {
            this.handleSubmit(event);
        });
    }
    // Manipula a submissão do formulário
    handleSubmit(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário
        const camposValid = this.camposValid(); // Verifica se todos os campos são válidos
        const senhaValida = this.senhaEVAlida() // Verifica se a senha é válida

        // Se todos os campos forem válidos, envia o formulário
        if(camposValid && senhaValida) {
            alert('Formulario Enviado!') // Exibe um alerta informando que o formulário foi enviado
            this.formulario.submit(); // Envia o formulário
        }
    }
    // Envia o formulário
    senhaEVAlida(){
        let valid = true;

        // Envia o formulário
        const senha =  this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir_senha')

        // Verifica se as senhas são iguais
        if(senha.value !== repetirSenha.value){
            valid = false; // Define a validação como falsa se as senhas forem diferentes
            // Cria mensagens de erro nos campos de senha e repetir senha
            this.criaErro(senha, 'Campos senha e repetir senha precisa ser iguais');
            this.criaErro(repetirSenha, 'Campos senha e repetir senha precisa ser iguais');
        }

        // Verifica se a senha possui entre 6 e 12 caracteres
        if(senha.value.length < 6 || senha.value.length > 12){
            valid = false; // Define a validação como falsa se a senha estiver fora do intervalo especificado
            // Cria mensagem de erro no campo de senha
            this.criaErro(senha, 'Campo senha precisa ter entre 6 e 12 caracteres.');
        }

        return valid;
    }
    // Validação dos campos do formulário
    camposValid() {
        let valid = true;
        
        // Remove mensagens de erro existentes
        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove()
        }
        // Itera sobre os campos do formulário
        for(let campo of this.formulario.querySelectorAll('.validar')) {
            const label =  campo.previousElementSibling.innerText;

            // Verifica se o campo está vazio
            if(!campo.value) {
                valid = false;// Define a validação como falsa se o campo estiver vazio
                // Cria mensagem de erro para o campo vazio
                this.criaErro(campo, `campo <strong>"${label}"</strong> não pode estar em branco.`);
            }
            // Verifica se o campo é do tipo "cpf"
            if(campo.classList.contains('cpf')){
                if(!this.validaCPF(campo)) valid = false; // Valida o CPF e atualiza o status de validação
            }

            // Verifica se o campo é do tipo "usuario"
            if(campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valid = false; // Valida o usuário e atualiza o status de validação
            }
        }

        return valid;
    }

     // Validação do usuário
    validaUsuario(campo){
        const usuario = campo.value; // Obtém o valor do campo de usuário
        let valid = true; // Define a validação como verdadeira por padrão

        // Verifica se o usuário possui entre 3 e 12 caracteres
        if(usuario.length < 3 || usuario.length > 12){
            valid = false;// Define a validação como falsa se o usuário estiver fora do intervalo especificado
            // Cria mensagem de erro para o campo de usuário
            this.criaErro(campo, 'Usuario precisa ter entre 3 e 12 caracteres.');
        }
        // Verifica se o usuário contém apenas letras e números
        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            valid = false; // Define a validação como falsa se o usuário contiver caracteres inválidos
            // Cria mensagem de erro para o campo de usuário
            this.criaErro(campo, 'Nome suario só pode conter letras e números');
        }
        return valid;
    }
    // Validação do CPF
    validaCPF(campo){  // Instancia um novo objeto ValidaCPF com o valor do campo CPF
        const cpf = new ValidaCPF(campo.value);
        if(!cpf.valida()){
            this.criaErro(campo, 'CPF invalido!'); // Se o CPF for inválido, cria uma mensagem de erro para o campo
            return false;           
        }

        return true;
    }
    // Cria uma mensagem de erro para um campo específico
    criaErro(campo, msg) {
        const div = document.createElement('div'); // Cria um elemento div
        div.innerHTML = msg; // Define o conteúdo HTML da div como a mensagem de erro
        div.classList.add('error-text'); // Adiciona uma classe à div para estilização
        campo.insertAdjacentElement('afterend', div); // Insere a div após o campo específico
    }
}

// Instancia um objeto ValidaFormulario para iniciar a validação do formulário
const valida = new ValidaFormulario();