var Itaucripto = require("../index.js");



var cripto = new Itaucripto();
var chave  = "ABCD123456ABCD12";
var codEmp = "J1234567890123456789012345";
var dc     = "A345B456F456W456T56J3K678";



test('geraDados should do something', () => {
	expect( cripto.geraDados(codEmp, "12345678", "3,14", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "") ).toEqual( expect.anything() );
});

test('geraDados should add decimals to valor', () => {
	expect( cripto.geraDados(codEmp, "12345678", "1947", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "") ).toEqual( expect.anything() );
});

test('geraDadosGenerico should do something', () => {
	expect( cripto.geraDadosGenerico(codEmp, "hello world", chave) ).toEqual( expect.anything() );
});

test('decripto should do something', () => {
	expect( cripto.decripto(dc, chave) ).toEqual( expect.anything() );
});

test('retornaCodEmp should do something', () => {
	var dados = cripto.decripto(dc, chave);
	expect( cripto.retornaCodEmp() ).toEqual( expect.anything() );
});

test('retornaPedido should do something', () => {
	var dados = cripto.decripto(dc, chave);
	expect( cripto.retornaPedido() ).toEqual( expect.anything() );
});

test('retornaTipPag should do something', () => {
	var dados = cripto.decripto(dc, chave);
	expect( cripto.retornaTipPag() ).toEqual( expect.anything() );
});

test('geraCripto should do something', () => {
	expect( cripto.geraCripto(codEmp, "12345678", chave) ).toEqual( expect.anything() );
});

test('geraConsulta should do something', () => {
	expect( cripto.geraConsulta(codEmp, "12345678", "1", chave) ).toEqual( expect.anything() );
});



test('geraDados should catch invalid codEmp', () => {
	expect( cripto.geraDados("1234567890", "12345678", "3,14", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: tamanho do código da empresa diferente de 26 posições.' );
});

test('geraDados should catch invalid chave', () => {
	expect( cripto.geraDados(codEmp, "12345678", "3,14", "", "1234567890", "", "", "", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: tamanho da chave da chave diferente de 16 posições.' );
});

test('geraDados should catch blank pedido', () => {
	expect( cripto.geraDados(codEmp, "", "3,14", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: número do pedido inválido.' );
});

test('geraDados should catch invalid pedido', () => {
	expect( cripto.geraDados(codEmp, "1234567890", "3,14", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: número do pedido inválido.' );
});

test('geraDados should catch non-numeric pedido', () => {
	expect( cripto.geraDados(codEmp, "ABC", "3,14", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: número do pedido não é numérico.' );
});

test('geraDados should catch blank valor', () => {
	expect( cripto.geraDados(codEmp, "12345678", "", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: valor da compra inválido.' );
});

test('geraDados should catch invalid valor (too much)', () => {
	expect( cripto.geraDados(codEmp, "12345678", "1234567890,14", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: valor da compra inválido.' );
});

test('geraDados should catch invalid valor (scientific notation)', () => {
	expect( cripto.geraDados(codEmp, "12345678", "3,14E10", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: valor decimal não é numérico.' );
});

test('geraDados should catch invalid valor (too many decimals)', () => {
	expect( cripto.geraDados(codEmp, "12345678", "3,141592", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: valor decimal da compra deve possuir 2 posições após a vírgula.' );
});

test('geraDados should catch invalid valor (not a number)', () => {
	expect( cripto.geraDados(codEmp, "12345678", "¥100", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: valor da compra não é numérico.' );
});

test('geraDados should catch invalid (too much)', () => {
	expect( cripto.geraDados(codEmp, "12345678", "123456789", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: valor da compra deve possuir no máximo 8 posições antes da vírgula.' );
});

test('geraDados should catch invalid codigoInscricao', () => {
	expect( cripto.geraDados(codEmp, "12345678", "3,14", "", chave, "", "PI", "", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: código de inscrição inválido.' );
});

test('geraDados should catch invalid numeroInscricao', () => {
	expect( cripto.geraDados(codEmp, "12345678", "3,14", "", chave, "", "", "123456789X12345", "", "", "", "", "", "", "", "", "", "") ).toBe( 'Erro: número de inscrição inválido.' );
});

test('geraDados should catch invalid cepSacado', () => {
	expect( cripto.geraDados(codEmp, "12345678", "3,14", "", chave, "", "", "", "", "", "1234567890", "", "", "", "", "", "", "") ).toBe( 'Erro: cep inválido.' );
});

test('geraDados should catch invalid dataVencimento', () => {
	expect( cripto.geraDados(codEmp, "12345678", "3,14", "", chave, "", "", "", "", "", "", "", "", "1234567890", "", "", "", "") ).toBe( 'Erro: data de vencimento inválida.' );
});

test('geraDados should catch invalid obsAdicional1', () => {
	expect( cripto.geraDados(codEmp, "12345678", "3,14", "", chave, "", "", "", "", "", "", "", "", "", "", "123456789012345678901234567890123456789012345678901234567890A", "", "") ).toBe( 'Erro: observação adicional 1 inválida.' );
});

test('geraDados should catch invalid obsAdicional2', () => {
	expect( cripto.geraDados(codEmp, "12345678", "3,14", "", chave, "", "", "", "", "", "", "", "", "", "", "", "123456789012345678901234567890123456789012345678901234567890A", "") ).toBe( 'Erro: observação adicional 2 inválida.' );
});

test('geraDados should catch invalid obsAdicional3', () => {
	expect( cripto.geraDados(codEmp, "12345678", "3,14", "", chave, "", "", "", "", "", "", "", "", "", "", "", "", "123456789012345678901234567890123456789012345678901234567890A") ).toBe( 'Erro: observação adicional 3 inválida.' );
});



test('geraDadosGenerico should catch invalid codEmp', () => {
	expect( cripto.geraDadosGenerico("1234567890", "hello world", chave) ).toBe('Erro: tamanho do código da empresa diferente de 26 posições.');
});

test('geraDadosGenerico should catch invalid chave', () => {
	expect( cripto.geraDadosGenerico(codEmp, "hello world", "1234567890") ).toBe('Erro: tamanho da chave da chave diferente de 16 posições.');
});

test('geraDadosGenerico should catch empty data', () => {
	expect( cripto.geraDadosGenerico(codEmp, "", chave) ).toBe('Erro: sem dados.');
});



test('geraCripto should catch invalid codEmp', () => {
	expect( cripto.geraCripto("1234567890", "1", chave) ).toBe('Erro: tamanho do código da empresa diferente de 26 posições.');
});

test('geraCripto should catch invalid chave', () => {
	expect( cripto.geraCripto(codEmp, "1", "1234567890") ).toBe('Erro: tamanho da chave da chave diferente de 16 posições.');
});

test('geraCripto should catch invalid codigoInscricao', () => {
	expect( cripto.geraCripto(codEmp, "", chave) ).toBe('Erro: código do sacado inválido.');
});



test('geraConsulta should catch invalid codEmp', () => {
	expect( cripto.geraConsulta("1234567890", "12345678", "1", chave) ).toBe('Erro: tamanho do código da empresa diferente de 26 posições.');
});

test('geraConsulta should catch invalid chave', () => {
	expect( cripto.geraConsulta(codEmp, "12345678", "1", "1234567890") ).toBe('Erro: tamanho da chave da chave diferente de 16 posições.');
});

test('geraConsulta should catch invalid pedido', () => {
	expect( cripto.geraConsulta(codEmp, "1234567890", "1", chave) ).toBe('Erro: número do pedido inválido.');
});

test('geraConsulta should catch non-numeric pedido ()', () => {
	expect( cripto.geraConsulta(codEmp, "ABC", "1", chave) ).toBe('Erro: número do pedido não é numérico.');
});

test('geraConsulta should catch invalid formato', () => {
	expect( cripto.geraConsulta(codEmp, "12345678", "A", chave) ).toBe('Erro: formato inválido.');
});

