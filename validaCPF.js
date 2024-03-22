class ValidaCPF {
    constructor(cpfEnviado){
        // Define uma propriedade 'cpfLimpo' no objeto instanciado
        // Removendo caracteres não numéricos do CPF enviado
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false, // não pode ser alterado
            enumerable: false, // não será enumerável em loops
            configurable: false, // não pode ser reconfigurado ou deletado
            value: cpfEnviado.replace(/\D+/g, '')
        })
    };
    // Verifica se o CPF é uma sequência de números repetidos
    eSequencia(){
       return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo;
    };
    // Gera os dois últimos dígitos do CPF
    gerarNovoCpf(){
        const cpfSemDigito = this.cpfLimpo.slice(0, -2);
        const digito_1 = ValidaCPF.gerarDigito(cpfSemDigito);
        const digito_2 = ValidaCPF.gerarDigito(cpfSemDigito + digito_1);
        this.novoCPF = cpfSemDigito + digito_1 + digito_2;
    }
    // Método estático para gerar um dígito verificador
    static gerarDigito(cpfSemDigito){
        let total = 0;
        let reverso = cpfSemDigito.length + 1;

        for(let stringNum of cpfSemDigito){
            // Calcula o total para o dígito verificador
            total += reverso * Number(stringNum);
            reverso--;
        }
        // Calcula o dígito verificador
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }
    // Valida o CPF
    valida(){
        if(!this.cpfLimpo) return false; // se não houver CPF, é inválido
        if(typeof this.cpfLimpo !== 'string') return false; // se não for uma string, é inválido
        if(this.cpfLimpo.length !== 11) return false; // se não tiver 11 caracteres, é inválido
        if(this.eSequencia()) return false; // se for uma sequência de números repetidos, é inválido

        // Gera um novo CPF com os dígitos verificadores
        this.gerarNovoCpf();

        // Verifica se o novo CPF gerado é igual ao CPF original, indicando que é válido
        return this.novoCPF === this.cpfLimpo;
    };
};

// Exemplo de uso:

// const validarcpf = new ValidaCPF('070.987.720-03');
// // const validarcpf = new ValidaCPF('705.484.450-52');
// // const validarcpf = new ValidaCPF('409.079.069-92');
// // const validarcpf = new ValidaCPF('111.111.111-11');

// if (validarcpf.valida()){
//     console.log('CPF válido!');
// } else {
//     console.log('CPF invalido!');
// }
