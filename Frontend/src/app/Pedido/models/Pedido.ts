import { Cliente } from "src/app/Cliente/model/Cliente";
import { Produto } from "src/app/Produto/models/Produto";

export class Pedido {

  pedidoId: number;
  data: string;
  clienteId: number;
  cliente: Cliente;
  valor: number;
  produtos: Produto[];
  desconto: number;
  valorTotal: number;
  
}
