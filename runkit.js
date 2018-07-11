var cripto = new Itaucripto();



var codEmp          = "",
    pedido          = "",
    valor           = "",
    observacao      = "",
    chave           = "",
    nomeSacado      = "",
    codigoInscricao = "",
    numeroInscricao = "",
    enderecoSacado  = "",
    bairroSacado    = "",
    cepSacado       = "",
    cidadeSacado    = "",
    estadoSacado    = "",
    dataVencimento  = "",
    urlRetorna      = "",
    obsAdicional1   = "",
    obsAdicional2   = "",
    obsAdicional3   = "";

var dc = cripto.geraDados(
  codEmp, pedido, valor, observacao, chave, nomeSacado, codigoInscricao, numeroInscricao, enderecoSacado, bairroSacado,
  cepSacado, cidadeSacado, estadoSacado, dataVencimento, urlRetorna, obsAdicional1, obsAdicional2, obsAdicional3
)



console.log(dc);
