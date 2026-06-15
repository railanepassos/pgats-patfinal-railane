const assert = require("node:assert");
const ServicoDePagamento = require('../src/main');

describe("ServicoDePagamento", function () {
    it("deve inicializar com um array vazio de pagamentos", function () {
        const servico = new ServicoDePagamento();
        assert.deepStrictEqual(servico.pagamentos, []);
    });

    it("deve armazenar um pagamento corretamente", function () {
        const servico = new ServicoDePagamento();
        servico.realizaPagamento('0987-7656-3475', 'Samar', 100);
        assert.strictEqual(servico.pagamentos.length, 1);
    });

    it("deve realizar um pagamento com sucesso", function () {
        const servico = new ServicoDePagamento();
        servico.realizaPagamento('0987-7656-3475', 'Samar', 100);
        const ultimoPagamento = servico.pagamentos[servico.pagamentos.length - 1];

        assert.strictEqual(ultimoPagamento.codigoBarras, '0987-7656-3475');
        assert.strictEqual(ultimoPagamento.empresa, 'Samar');
        assert.strictEqual(ultimoPagamento.valor, 100);
        assert.strictEqual(ultimoPagamento.categoria, 'padrão');
    });

    it("deve classificar um pagamento como 'cara' quando o valor for maior que 100", function () {
        const servico = new ServicoDePagamento();
        servico.realizaPagamento('1234-5678-9012', 'EmpresaX', 150);
        const ultimoPagamento = servico.pagamentos[servico.pagamentos.length - 1];
        assert.strictEqual(ultimoPagamento.categoria, 'cara');
    });

    it("deve classificar um pagamento como 'cara' quando o valor for maior que 100.01", function () {
        const servico = new ServicoDePagamento();
        servico.realizaPagamento('1234-5678-9012', 'EmpresaX', 150);
        const ultimoPagamento = servico.pagamentos[servico.pagamentos.length - 1];
        assert.strictEqual(ultimoPagamento.categoria, 'cara');
    });

    it("deve classificar um pagamento como 'padrão' quando o valor for igual a 100", function () {
        const servico = new ServicoDePagamento();
        servico.realizaPagamento('1234-5678-9012', 'EmpresaX', 100);
        const ultimoPagamento = servico.pagamentos[servico.pagamentos.length - 1];
        assert.strictEqual(ultimoPagamento.categoria, 'padrão');
    });

    it("deve classificar um pagamento como 'padrão' quando o valor for menor que 100", function () {
        const servico = new ServicoDePagamento();
        servico.realizaPagamento('1234-5678-9012', 'EmpresaX', 50);
        const ultimoPagamento = servico.pagamentos[servico.pagamentos.length - 1];
        assert.strictEqual(ultimoPagamento.categoria, 'padrão');
    });

    it("deve classificar um pagamento como 'padrão' quando o valor for igual a 0", function () {
        const servico = new ServicoDePagamento();
        servico.realizaPagamento('1234-5678-9012', 'EmpresaX', 0);
        const ultimoPagamento = servico.pagamentos[servico.pagamentos.length - 1];
        assert.strictEqual(ultimoPagamento.categoria, 'padrão');
    });

    it("deve retornar null ao consultar o último pagamento quando não houver pagamentos", function () {
        const servico = new ServicoDePagamento();
        const resultado = servico.consultarUltimoPagamento();
        assert.strictEqual(resultado, null);
    });

    it("retorna ultimo pagamento após realizar 100 pagamentos", function () {
        const servico = new ServicoDePagamento();
        for (let i = 0; i < 100; i++) {
            servico.realizaPagamento(`codigo-${i}`, `Empresa${i}`, i);
        }
        const ultimoPagamento = servico.pagamentos[servico.pagamentos.length - 1];
        assert.strictEqual(ultimoPagamento.codigoBarras, 'codigo-99');
        assert.strictEqual(ultimoPagamento.empresa, 'Empresa99');
        assert.strictEqual(ultimoPagamento.valor, 99);
    });

    it("deve retornar erro se valor < 0", function () {
        const servico = new ServicoDePagamento();
        assert.throws(() => {
            servico.realizaPagamento('1234-5678-9012', 'EmpresaX', -50);
        }, /Valor do pagamento não pode ser negativo/);
    });

    it('deve lançar erro para valor negativo', function () {
        const servico = new ServicoDePagamento();
        assert.throws(() => {
            servico.realizaPagamento('000', 'X', -10);
        }, /positivo/);
    });
});