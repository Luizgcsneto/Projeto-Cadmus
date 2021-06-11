import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Produto } from '../models/Produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor(private produtoService: ProdutoService) { }

formulario: any;
tituloFormulario!: string;
produtos : Produto[];

visibilidadeTabela: boolean = true;
visibilidadeFormulario: boolean = false;


ngOnInit(): void {

  this.produtoService.getAll().subscribe(resultado =>{
    this.produtos = resultado;
    console.log(resultado)
  })

}

ExibirFormularioCadastro(): void
{
  this.visibilidadeTabela = false;
  this.visibilidadeFormulario = true;
  this.tituloFormulario = "Salvar Produto"
  this.formulario = new FormGroup({
    descricao: new FormControl(null),
    preco: new FormControl(null)

  });
}

EnviarFormulario(): void
{
  const produto : Produto = this.formulario.value;
  if(!produto.preco || !produto.descricao ){
    alert("favor preencher os campos");
    return
  }
  if(produto.produtoId > 0)
  {
    this.produtoService.updateProduct(produto).subscribe(resultado => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert("Produto atualizado com sucesso");
      this.produtoService.getAll().subscribe(registros => {
        this.produtos = registros;
      });
    });
  }
  else
  {
     this.produtoService.saveProduct(produto).subscribe(resultado => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert("Produto inserido com sucesso");
      this.produtoService.getAll().subscribe(registros => {
        this.produtos = registros;
      });
    });
  };
}

  ExibirFormularioAtualizacao(produtoId): void
  {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.produtoService.getById(produtoId).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar Produto`;

      this.formulario = new FormGroup({
        produtoId: new FormControl(resultado.produtoId),
        descricao: new FormControl(resultado.descricao),
        preco: new FormControl(resultado.preco)
      });
    });
  }

  Voltar(): void
  {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  Excluir(produtoId): void {

    this.produtoService.deleteProduct(produtoId).subscribe(resultado => {

    })
  }

}
