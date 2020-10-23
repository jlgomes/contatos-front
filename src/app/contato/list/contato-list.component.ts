import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from '../model/contato';
import { ContatoService } from '../service/contato-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/abstract/dialog/dialog.component';
import { DIALOG, TOAST } from 'src/app/abstract/constant/constant-messages';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contato-list',
  templateUrl: './contato-list.component.html',
  styleUrls: ['./contato-list.component.css']
})
export class ContatoListComponent implements OnInit {

  contatos: Contato[];
  contatosFiltered: Contato[];
  search = new FormControl('');
	 
  constructor(
    private router: Router,
      private contatoService: ContatoService,
        public dialog?: MatDialog,
          public snack?: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.contatoService.findAll().subscribe(data => {
      this.contatos = data;
      this.contatosFiltered = data;
    });
  }

  buscar() {
    this.contatosFiltered = Object.assign([], this.contatos).filter(
      contato => (contato.nome.toLowerCase().trim().indexOf(this.search.value.toLowerCase().trim()) > -1
        || contato.email.toLowerCase().trim().indexOf(this.search.value.toLowerCase().trim()) > -1
        || contato.telefone.toLowerCase().trim().indexOf(this.search.value.toLowerCase().trim()) > -1)
    )
  }

  edit(obj: Contato) {
    this.router.navigate(['/editcontato', obj.id.toString()]);
  }

  delete(obj?: Contato) {
    const dialogRef = this.dialog.open(DialogComponent, {
        width: '400px',
        data: { settings: DIALOG.CONFIRM.DELETE }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            if (obj) {
                this.contatoService.deleteId(obj.id).subscribe(
                    success => {
                        this.getAll();
                        this.toast(TOAST.SUCCESS.DELETE.message, TOAST.SUCCESS.DELETE.action, TOAST.SUCCESS.DELETE.type);
                    }, error => {
                        this.toast(TOAST.ERROR.message, TOAST.ERROR.action, TOAST.ERROR.type);
                    }
                );
            }
        } else {
            this.getAll();
        }
    });
  }

  toast(message: string, action: string, type: string) {
    this.snack.open(message, action, {
        duration: 5 * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: type,
    });
  }
}
