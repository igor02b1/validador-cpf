class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();

        if(camposValidos && senhasValidas) {
            alert('Formulário enviado com sucesso !');
            this.formulario.submit();
        }
    }

    senhasSaoValidas() {
        let valid = true;
        const senha = this.formulario.querySelector('.senha');
        const confirmarSenha = this.formulario.querySelector('.confirmar-senha');

        if(senha.value !== confirmarSenha.value){
            valid = false;
            this.criaErro(senha, 'Campo "senha" e "confirmar senha" precisam ser iguais');
            this.criaErro(confirmarSenha, 'Campo "senha" e "confirmar senha" precisam ser iguais');
        }

        if(senha.value.length < 3 || senha.value.length > 12){
            valid = false;
            this.criaErro(senha, 'O campo "senha" precisa ter entre 6 e 12 caracteres');
        }

        return valid
    }

    camposSaoValidos() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerText;

            if(!campo.value) {
                this.criaErro(campo, `* O campo "${label}" não pode estar em branco`);  
            }
            if(campo.classList.contains('cpf')) {
                if(!this.validaCPF(campo)) valid = false;
            }
            if(campo.classList.contains('usuario')) {
                if(!this.validaUsuario(campo)) valid = false;
        }        
    }
            return valid
}

    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, 'Usuário Precisa ter entre ter entre 3 à 12 caracteres.');
            return valid = false;
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.criaErro(campo, 'Nome de usuário precisa conter letras e/ou números');
            return valid = false;
        }

        return valid;
    }





    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value)

        if(!cpf.valida()) {
            this.criaErro(campo, 'CPF inválido');
            return false;
        }
        return true;
    }
    
    criaErro(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();