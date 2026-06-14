class ServicoDePagamento {
    pagamentos = [];

    realizaPagamento(codigoBarras, empresa, valor) {
        const pagamento = {
            codigoBarras,
            empresa,
            valor,
            categoria: valor > 100 ? 'cara' : 'padrão',
        };

        this.pagamentos.push(pagamento);
        console.log('Pagamento realizado com sucesso!');
    }

    consultarUltimoPagamento() {
        if (this.pagamentos.length === 0) {
            return null;
        }

        const ultimoPagamento = this.pagamentos[this.pagamentos.length - 1];
        console.log('Último pagamento realizado:');
        console.log(`Código de Barras: ${ultimoPagamento.codigoBarras}`);
        console.log(`Empresa: ${ultimoPagamento.empresa}`);
        console.log(`Valor: R$ ${ultimoPagamento.valor.toFixed(2)}`);
        console.log(`Categoria: ${ultimoPagamento.categoria}`);
    }
}

const servicoDePagamento = new ServicoDePagamento();

// servicoDePagamento.realizaPagamento('0987-7656-3475', 'Samar', 100);
// servicoDePagamento.realizaPagamento('0987-7656-3475', 'Samar', 100.01);

servicoDePagamento.consultarUltimoPagamento();

module.exports = ServicoDePagamento;