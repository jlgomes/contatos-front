import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TOAST } from 'src/app/abstract/constant/constant-messages';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contato } from '../model/contato';
import { ContatoService } from '../service/contato-service.service';

@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html',
  styleUrls: ['./contato-form.component.css']
})
export class ContatoFormComponent implements OnInit {

  contato: Contato;
  contatoForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private contatoService: ContatoService,
          public snack?: MatSnackBar) {
    this.contato = new Contato();
  }
  
  ngOnInit(): void {
    this.getOne();
    this.contatoForm = new FormGroup({
      email: new FormControl('', [ 
          Validators.required,
          Validators.email 
      ]),
      telefone: new FormControl('', [
          // Validators.pattern("[^ @]*@[^ @]*"), 
          Validators.required
      ]),
      language: new FormControl() 
  });
  }
  
  onSubmit() {
    this.contatoService.save(this.contato).subscribe(
      result => {
        this.gotoContatoList();
        if(this.contato.id) {
          this.toast(TOAST.SUCCESS.UPDATE.message, TOAST.SUCCESS.SAVE.action, TOAST.SUCCESS.SAVE.type);
        } else {
          this.toast(TOAST.SUCCESS.SAVE.message, TOAST.SUCCESS.SAVE.action, TOAST.SUCCESS.SAVE.type);
        }
      }, error => {
        console.log('============= ERRO ===========');
        console.log(error);
        if (typeof error.error.errors !== 'undefined' && error.error.errors.length > 0) {
            console.log(error.error.errors);
            error.error.errors.forEach(e => {
                this.toast(e, TOAST.ERROR.action, TOAST.ERROR.type);
            });
        } else {
            this.toast(TOAST.SUPPORT.message, TOAST.ERROR.action, TOAST.ERROR.type);
        }
    });
  }
  
  gotoContatoList() {
    this.router.navigate(['/contatos']);
  }

  async getOne() {
    console.log('ok');
    if (this.route.snapshot.paramMap.get('id') !== null) {
        const id = this.route.snapshot.paramMap.get('id');
        await this.contatoService.findId(parseInt(id)).subscribe(
            success => {
                this.contato = success;
                console.log(this.contato);
            }, error => {
                console.log('============= ERRO ===========');
                console.log(error);
            }
        );
    }
  }
  
  toast(message: string, action: string, type: string) {
    this.snack.open(message, action, {
        duration: 5 * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: type,
    });
  }

  validate(field: FormControl): boolean {
    if (field.value) {
        if ((typeof field.value === 'string')) {
            field.setValue(field.value.trim());
            field.setErrors({ invalid: !field.value.trim().length });
            if (field.value.trim().length) {
                field.updateValueAndValidity();
            }
        }
    }
    return field.errors !== null ? field.errors.invalid : false;
  }
}
