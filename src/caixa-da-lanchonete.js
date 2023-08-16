class CaixaDaLanchonete {
  constructor() { //constructor que gera o cardápio com codigo, valor  e descrição.
    this.cardapio = [
      { codigo: "cafe", descricao: "Café", valor: 3.0 },
      { codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 1.5 },
      { codigo: "suco", descricao: "Suco Natural", valor: 6.2 },
      { codigo: "sanduiche", descricao: "Sanduíche", valor: 6.5 },
      { codigo: "queijo", descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
      { codigo: "salgado", descricao: "Salgado", valor: 7.25 },
      { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    ];
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (
      metodoDePagamento !== "dinheiro" &&
      metodoDePagamento !== "debito" &&
      metodoDePagamento !== "credito"
    ) {
      return "Forma de pagamento inválida!"   //caso o pagamento não seja em dinheiro, debito ou credito o código retorna "Forma de pagamento inválida!".
    } 


    else if (itens.length === 0) { // verifica se a lista de itens está vazia.
      return "Não há itens no carrinho de compra!";  
    }

    let total = 0;
    let itemPrincipalEncontrado = false; // define um estado inicial onde ainda não encontramos um item principal no carrinho. 

    for (const itemInfo of itens) {
      const [itemCodigo, quantidade] = itemInfo.split(","); // Divide a string itemInfo em duas partes: código do item e quantidade.
      const item = this.cardapio.find((item) => item.codigo === itemCodigo); // Encontra o objeto correspondente ao código do item no cardápio.
    
      if (!item) { 
        return "Item inválido!"; // verifica se o item é um dos que está na lista.
      }
    
      const converteQuantidade = parseInt(quantidade); // converte quantidade para umn número inteiro.
    
      if (converteQuantidade <= 0) { // verifica se o numero é menor ou igual a 0 ZERO.
        return "Quantidade inválida!"; 
      }
    
      if (itemCodigo === "chantily" || itemCodigo === "queijo") { // verifica se os unicos itens no carrinho são os "extras".
        const itemPrincipalCodigo = itemCodigo === "chantily" ? "cafe" : "sanduiche"; //cdetermina o código do item principal que corresponde a um determinado item extra.
        const itemPrincipalNoCarrinho = itens.some((itemInfo) => // Verifica se há um item principal correspondente no carrinho antes de permitir um item extra
          itemInfo.startsWith(itemPrincipalCodigo)
        );
    
        if (!itemPrincipalNoCarrinho) { // verifica se o item principal não existe.
          return "Item extra não pode ser pedido sem o principal"; 
        }
      } else {
        itemPrincipalEncontrado = true; // verifica se o item principal existe.
      }
    
      total += item.valor * converteQuantidade; // verifica o valor do item multiplicado pela quantidade.
    }
    
    

    if (metodoDePagamento === "dinheiro") {
      total *= 0.95; //  garante que o pagamento em dinheiro tenha 5% de desconto .
    } else if (metodoDePagamento === "credito") { 
      total *= 1.03; //  garante que o pagamento em crédito tenha acréscimo de 3% no valor total.
    }

    return `R$ ${total.toFixed(2).replace(".", ",")}`; //  format o valor para reais e adiciona ponto e virgula.
  }
}

export { CaixaDaLanchonete };