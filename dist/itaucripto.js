(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Itaucripto = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';





function trim(s) {
  if (String.prototype.trim) return s.trim();
  return s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

function preenche_branco(s, n) {
  var str = s.toString();
  while ((str.length < n)) str += ' ';
  return str.substring(0, n);
}

function preenche_zero(s, n) {
  var str = s.toString();
  while ((str.length < n)) str = '0' + str;
  return str.substring(0, n);
}

function is_numeric(s) {
  return /^\d+$/gim.test(s);
}

function converte(s) {
  var c = String.fromCharCode(((26.0 * Math.random() + 65.0) | 0));
  var str = '' + c;
  var i, j, k, len;
  for (i = 0, len = s.length; i < len; i++) {
    k = (s.charAt(i)).charCodeAt(0);
    j = k;
    str += ('' + (j));
    c = String.fromCharCode(((26.0 * Math.random() + 65.0) | 0));
    str += c;
  }
  return str;
}

function desconverte(s) {
  var str1 = '';
  var i, j, len;
  for (i = 0, len = s.length; i < len; i++) {
    var str2 = '';
    var c = s.charAt(i);
    while ((/\d/.test(c[0]))) {
      str2 += s.charAt(i);
      i += 1;
      c = s.charAt(i);
    }
    if (str2.localeCompare('') !== 0) {
      j = parseInt(str2, 10);
      str1 += String.fromCharCode(j);
    }
  }
  return str1;
}





var CHAVE_ITAU = 'SEGUNDA12345ITAU';
var TAM_COD_EMP = 26;
var TAM_CHAVE = 16;

function Itaucripto() {
  this.numbers = '0123456789';
  this.sbox = null;
  this.key = null;
  this.codEmp = null;
  this.numPed = null;
  this.tipPag = null;
  this.dados = null;
  this.sbox = (function (s) {
    var a = [];
    while (s-- > 0) a.push(0);
    return a;
  }(256));
  this.key = (function (s) {
    var a = [];
    while (s-- > 0) a.push(0);
    return a;
  }(256));
  this.numPed = '';
  this.tipPag = '';
  this.codEmp = '';
}

Itaucripto.prototype.geraDados = function (
  codEmp, pedido, valor, observacao, chave, nomeSacado, codigoInscricao, numeroInscricao, enderecoSacado, bairroSacado,
  cepSacado, cidadeSacado, estadoSacado, dataVencimento, urlRetorna, obsAdicional1, obsAdicional2, obsAdicional3
) {
  codEmp = codEmp.toUpperCase();
  chave = chave.toUpperCase();
  if (codEmp.length !== TAM_COD_EMP) {
    return 'Erro: tamanho do código da empresa diferente de 26 posições.';
  }
  if (chave.length !== TAM_CHAVE) {
    return 'Erro: tamanho da chave da chave diferente de 16 posições.';
  }
  if ((pedido.length < 1) || (pedido.length > 8)) {
    return 'Erro: número do pedido inválido.';
  }
  if (is_numeric(pedido)) {
    pedido = preenche_zero(pedido, 8);
  } else {
    return 'Erro: número do pedido não é numérico.';
  }
  if ((valor.length < 1) || (valor.length > 11)) {
    return 'Erro: valor da compra inválido.';
  }

  var i = valor.indexOf(',');
  if (i !== -1) {
    var str3 = valor.substring(i + 1);
    if (!is_numeric(str3)) {
      return 'Erro: valor decimal não é numérico.';
    }
    if (str3.length !== 2) {
      return 'Erro: valor decimal da compra deve possuir 2 posições após a vírgula.';
    }
    valor = valor.substring(0, valor.length - 3) + str3;
  } else {
    if (!is_numeric(valor)) {
      return 'Erro: valor da compra não é numérico.';
    }
    if (valor.length > 8) {
      return 'Erro: valor da compra deve possuir no máximo 8 posições antes da vírgula.';
    }
    valor += '00';
  }

  valor = preenche_zero(valor, 10);
  codigoInscricao = trim(codigoInscricao);
  if (
    (codigoInscricao.localeCompare('02') !== 0) &&
    (codigoInscricao.localeCompare('01') !== 0) &&
    (codigoInscricao.localeCompare('') !== 0)
  ) {
    return 'Erro: código de inscrição inválido.';
  }
  if (
    (numeroInscricao.localeCompare('') !== 0) &&
    (!is_numeric(numeroInscricao)) &&
    (numeroInscricao.length > 14)
  ) {
    return 'Erro: número de inscrição inválido.';
  }
  if ((cepSacado.localeCompare('') !== 0) && ((!is_numeric(cepSacado)) || (cepSacado.length !== 8))) {
    return 'Erro: cep inválido.';
  }
  if ((dataVencimento.localeCompare('') !== 0) && ((!is_numeric(dataVencimento)) || (dataVencimento.length !== 8))) {
    return 'Erro: data de vencimento inválida.';
  }
  if (obsAdicional1.length > 60) {
    return 'Erro: observação adicional 1 inválida.';
  }
  if (obsAdicional2.length > 60) {
    return 'Erro: observação adicional 2 inválida.';
  }
  if (obsAdicional3.length > 60) {
    return 'Erro: observação adicional 3 inválida.';
  }

  observacao = preenche_branco(observacao, 40);
  nomeSacado = preenche_branco(nomeSacado, 30);
  codigoInscricao = preenche_branco(codigoInscricao, 2);
  numeroInscricao = preenche_branco(numeroInscricao, 14);
  enderecoSacado = preenche_branco(enderecoSacado, 40);
  bairroSacado = preenche_branco(bairroSacado, 15);
  cepSacado = preenche_branco(cepSacado, 8);
  cidadeSacado = preenche_branco(cidadeSacado, 15);
  estadoSacado = preenche_branco(estadoSacado, 2);
  dataVencimento = preenche_branco(dataVencimento, 8);
  urlRetorna = preenche_branco(urlRetorna, 60);
  obsAdicional1 = preenche_branco(obsAdicional1, 60);
  obsAdicional2 = preenche_branco(obsAdicional2, 60);
  obsAdicional3 = preenche_branco(obsAdicional3, 60);

  var str1 = this._algoritmo(
    pedido + valor + observacao + nomeSacado + codigoInscricao + numeroInscricao +
    enderecoSacado + bairroSacado + cepSacado + cidadeSacado + estadoSacado +
    dataVencimento + urlRetorna + obsAdicional1 + obsAdicional2 + obsAdicional3, chave
  );
  var str2 = this._algoritmo(codEmp + str1, CHAVE_ITAU);
  return converte(str2);
};

Itaucripto.prototype.geraCripto = function (codEmp, codigoInscricao, chave) {
  if (codEmp.length !== TAM_COD_EMP) {
    return 'Erro: tamanho do código da empresa diferente de 26 posições.';
  }
  if (chave.length !== TAM_CHAVE) {
    return 'Erro: tamanho da chave da chave diferente de 16 posições.';
  }
  codigoInscricao = trim(codigoInscricao);
  if (codigoInscricao.localeCompare('') === 0) {
    return 'Erro: código do sacado inválido.';
  }
  var str1 = this._algoritmo(codigoInscricao, chave);
  var str2 = this._algoritmo(codEmp + str1, CHAVE_ITAU);
  return converte(str2);
};

Itaucripto.prototype.geraConsulta = function (codEmp, pedido, formato, chave) {
  if (codEmp.length !== TAM_COD_EMP) {
    return 'Erro: tamanho do código da empresa diferente de 26 posições.';
  }
  if (chave.length !== TAM_CHAVE) {
    return 'Erro: tamanho da chave da chave diferente de 16 posições.';
  }
  if ((pedido.length < 1) || (pedido.length > 8)) {
    return 'Erro: número do pedido inválido.';
  }
  if (is_numeric(pedido)) {
    pedido = preenche_zero(pedido, 8);
  } else {
    return 'Erro: número do pedido não é numérico.';
  }
  if ((formato.localeCompare('0') !== 0) && (formato.localeCompare('1') !== 0)) {
    return 'Erro: formato inválido.';
  }
  var str1 = this._algoritmo(pedido + formato, chave);
  var str2 = this._algoritmo(codEmp + str1, CHAVE_ITAU);
  return converte(str2);
};

Itaucripto.prototype.decripto = function (dc, chave) {
  dc = desconverte(dc);
  var str = this._algoritmo(dc, chave);
  this.codEmp = str.substring(0, 26);
  this.numPed = str.substring(26, 34);
  this.tipPag = str.substring(34, 36);
  return str;
};

Itaucripto.prototype.retornaCodEmp = function () {
  return this.codEmp;
};

Itaucripto.prototype.retornaPedido = function () {
  return this.numPed;
};

Itaucripto.prototype.retornaTipPag = function () {
  return this.tipPag;
};

Itaucripto.prototype.geraDadosGenerico = function (codEmp, x, chave) {
  codEmp = codEmp.toUpperCase();
  chave = chave.toUpperCase();
  if (codEmp.length !== TAM_COD_EMP) {
    return 'Erro: tamanho do código da empresa diferente de 26 posições.';
  }
  if (chave.length !== TAM_CHAVE) {
    return 'Erro: tamanho da chave da chave diferente de 16 posições.';
  }
  if (x.length < 1) {
    return 'Erro: sem dados.';
  }
  var str1 = this._algoritmo(x, chave);
  var str2 = this._algoritmo(codEmp + str1, CHAVE_ITAU);
  return converte(str2);
};

/*private*/ Itaucripto.prototype._algoritmo = function (p_1, p_2) {
  this._inicializa(p_2);
  var i, j, k, m, n, i1, str;
  for (j = 1, k = 0, m = 0, str = ''; j <= p_1.length; j++) {
    k = (k + 1) % 256;
    m = (m + this.sbox[k]) % 256;
    i = this.sbox[k];
    this.sbox[k] = this.sbox[m];
    this.sbox[m] = i;
    n = this.sbox[((this.sbox[k] + this.sbox[m]) % 256)];
    i1 = p_1.charCodeAt(j - 1) ^ n;
    str += String.fromCharCode(i1);
  }
  return str;
};

/*private*/ Itaucripto.prototype._inicializa = function (s) {
  var m = s.length;
  var j, k;
  for (j = 0; j < 256; j++) {
    this.key[j] = (s.charAt(j % m)).charCodeAt(0);
    this.sbox[j] = j;
  }
  for (j = 0, k = 0; j < 256; j++) {
    k = (k + this.sbox[j] + this.key[j]) % 256;
    var i = this.sbox[j];
    this.sbox[j] = this.sbox[k];
    this.sbox[k] = i;
  }
};





module.exports = Itaucripto;

},{}]},{},[1])(1)
});
