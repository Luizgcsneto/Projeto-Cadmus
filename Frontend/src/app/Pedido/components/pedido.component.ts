import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pedido } from '../models/Pedido';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor(private pedidoService: PedidoService) { }

formulario: any;
tituloFormulario!: string;
pedidos : Pedido[];

visibilidadeTabela: boolean = true;
visibilidadeFormulario: boolean = false;


ngOnInit(): void {

  this.pedidoService.getAll().subscribe(resultado =>{
    this.pedidos = resultado;
    console.log(resultado)
  })

}

ExibirFormularioCadastro(): void
{
  this.visibilidadeTabela = false;
  this.visibilidadeFormulario = true;
  this.tituloFormulario = "Salvar Pedido"
  this.formulario = new FormGroup({
    cliente: new FormControl(null),
    data: new FormControl(null),
    desconto: new FormControl(null),
    produtos: new FormControl(null),
    valor: new FormControl(null),
    valorTotal: new FormControl(null)

  });
}

EnviarFormulario(): void
{
  const pedido : Pedido = this.formulario.value;
  if(!pedido.cliente || !pedido.data || !pedido.desconto || !pedido.produtos || !pedido.valor || !pedido.valorTotal ){
    alert("favor preencher os campos");
    return
  }
  if(pedido.pedidoId > 0)
  {
    this.pedidoService.updateOrder(pedido).subscribe(resultado => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert("Pedido atualizado com sucesso");
      this.pedidoService.getAll().subscribe(registros => {
        this.pedidos = registros;
      });
    });
  }
  else
  {
     this.pedidoService.saveOrder(pedido).subscribe(resultado => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert("Pedido inserido com sucesso");
      this.pedidoService.getAll().subscribe(registros => {
        this.pedidos = registros;
      });
    });
  };
}

  ExibirFormularioAtualizacao(pedidoId): void
  {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.pedidoService.getById(pedidoId).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar Pedido`;

      this.formulario = new FormGroup({
        pedidoId: new FormControl(resultado.pedidoId),
        cliente: new FormControl(resultado.cliente),
        data: new FormControl(resultado.data),
        desconto: new FormControl(resultado.desconto),
        produtos: new FormControl(resultado.produtos),
        valor: new FormControl(resultado.valor),
        valorTotal: new FormControl(resultado.valorTotal)
      });
    });
  }

  Voltar(): void
  {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  Excluir(pedidoId): void {

    this.pedidoService.deleteOrder(pedidoId).subscribe(resultado => {

    })
  }

}
