class ValidaCPF {
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false, // não pode escreveer
            enumerable: false, // não vai aparecer
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    };

    eSequencia(){
       return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo;
    };

    gerarNovoCpf(){
        const cpfSemDigito = this.cpfLimpo.slice(0, -2);
        const digito_1 = ValidaCPF.gerarDigito(cpfSemDigito);
        const digito_2 = ValidaCPF.gerarDigito(cpfSemDigito + digito_1);
        this.novoCPF = cpfSemDigito + digito_1 + digito_2;
    }

    static gerarDigito(cpfSemDigito){
        let total = 0;
        let reverso = cpfSemDigito.length + 1;

        for(let stringNum of cpfSemDigito){
            // console.log(stringNum, reverso);
            total += reverso * Number(stringNum);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    valida(){
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.eSequencia()) return false;
        this.gerarNovoCpf();

        return this.novoCPF === this.cpfLimpo;
    };
};

// const validarcpf = new ValidaCPF('070.987.720-03');
// // const validarcpf = new ValidaCPF('705.484.450-52');
// // const validarcpf = new ValidaCPF('409.079.069-92');
// // const validarcpf = new ValidaCPF('111.111.111-11');

// if (validarcpf.valida()){
//     console.log('CPF válido!');
// } else {
//     console.log('CPF invalido!');
// }
