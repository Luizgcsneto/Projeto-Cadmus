import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cliente } from '../model/Cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private clienteService: ClienteService) { }

  formulario: any;
  tituloFormulario!: string;
  clientes : Cliente[];

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;


  ngOnInit(): void {

    this.clienteService.getAll().subscribe(resultado =>{
      this.clientes = resultado;
      console.log(resultado)
    })

  }

  ExibirFormularioCadastro(): void
  {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = "Salvar Cliente"
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
      aldeia: new FormControl(null),

    });
  }

  EnviarFormulario(): void
  {
    const cliente : Cliente = this.formulario.value;
    if(!cliente.nome || !cliente.email || !cliente.aldeia ){
      alert("favor preencher os campos");
      return
    }
    if(cliente.clienteId > 0)
    {
      this.clienteService.updateClient(cliente).subscribe(resultado => {
        this.visibilidadeTabela = true;
        this.visibilidadeFormulario = false;
        alert("Cliente atualizado com sucesso");
        this.clienteService.getAll().subscribe(registros => {
          this.clientes = registros;
        });
      });
    }
    else
    {
       this.clienteService.saveClient(cliente).subscribe(resultado => {
        this.visibilidadeTabela = true;
        this.visibilidadeFormulario = false;
        alert("Cliente inserido com sucesso");
        this.clienteService.getAll().subscribe(registros => {
          this.clientes = registros;
        });
      });
    };
  }

    ExibirFormularioAtualizacao(clienteId): void
    {
      this.visibilidadeTabela = false;
      this.visibilidadeFormulario = true;

      this.clienteService.getById(clienteId).subscribe(resultado =>{
        this.tituloFormulario = `Atualizar Cliente`;

        this.formulario = new FormGroup({
          clienteId: new FormControl(resultado.clienteId),
          nome: new FormControl(resultado.nome),
          email: new FormControl(resultado.email),
          aldeia: new FormControl(resultado.aldeia)
        });
      });
    }

    Voltar(): void
    {

      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;

    }

    Excluir(clienteId): void {

      this.clienteService.deleteClient(clienteId).subscribe(resultado => {

      })
    }

}
