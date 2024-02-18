import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../services/tarjeta.service';
import { error } from 'console';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrl: './tarjeta-credito.component.css'
})
export class TarjetaCreditoComponent implements OnInit {
    listTarjetas: any [] = [];
    accion = 'Agregar';
    id: number | undefined;
    form: FormGroup;

    constructor(private fb: FormBuilder, 
                private toastr: ToastrService, 
                private _tarjetaService: TarjetaService){
      this.form = this.fb.group ({
        titular: ['',Validators.required],
        numeroTarjeta: ['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
        fechaExpiracion: ['',[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
        CVV: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
      })
    }

  ngOnInit(): void {
    this.obtenerTarjetas() ;
  }

  /*obtenerTarjetas(){
    this._tarjetaService.getListTarjetas().subscribe(data =>{
      console.log(data);
    this.listTarjetas = data;
    },
      error => {
        console.log(error);})
  }*/

  obtenerTarjetas() {
    this._tarjetaService.getListTarjetas().pipe(
      catchError(error => {
        console.error('Ocurrió un error al obtener las tarjetas:', error);
        // Aquí podrías manejar el error de una manera más amigable para el usuario, por ejemplo:
        // this.mostrarMensajeError('No se pudieron cargar las tarjetas.');
        return of([]); // Retorna un observable vacío o con valores por defecto para que la cadena no se rompa.
      }),
      finalize(() => {
        // Aquí puedes colocar código que siempre quieres ejecutar después de la suscripción,
        // por ejemplo, ocultar una animación de carga.
      })
    ).subscribe(data => {
      this.listTarjetas = data;
      // Aquí podrías también actualizar la interfaz de usuario para mostrar las tarjetas.
    });
  }
 
  guardarTarjeta ()  {
    
    const tarjeta: any ={
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      CVV: this.form.get('CVV')?.value
    }

    if (this.id == undefined) {
      //Agregar nueva tarjeta
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data=> {
        this.toastr.success('La Tarjeta fue registrada con éxito', 'Tarjeta Registrada');
        this.obtenerTarjetas();
        this.form.reset();
      }, error => {
        this.toastr.error('Ocurrio un error', 'Error')
        console.log(error)}
      )
    } else {

      tarjeta.id = this.id;
      //Editar Tarjeta 
      this._tarjetaService.editarTarjta(this.id, tarjeta).subscribe(data =>{
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('La Tarjeta fue actualizada con éxito!', 'Tarjeta Actualizada');
        this.obtenerTarjetas();
      }, error => {console.log(error);})
    }

  }


  editarTarjeta(tarjetas: any){
    //console.log(tarjetas);
    this.accion="Editar";
    this.id = tarjetas.id;
    this.form.patchValue({
      titular:tarjetas.titular,
      numeroTarjeta:tarjetas.numeroTarjeta,
      fechaExpiracion:tarjetas.fechaExpiracion,
      CVV:tarjetas.CVV
    })
  }

  eliminarTarjeta(id: number){
    this._tarjetaService.deleteTarjeta(id).subscribe(data => {
      this.toastr.error('La tarjeta fue eliminada con exito!', 'Tarjeta Elimindad');
      this.obtenerTarjetas();
    })
  }

  soloNumeros(controlName: string, event: any): void {
    const input = event.target as HTMLInputElement;
    const soloNumeros = input.value.replace(/[^0-9]/g, ''); // Filtrar solo números
    if (this.form.get(controlName)?.value !== soloNumeros) {
      this.form.get(controlName)?.setValue(soloNumeros);
      }}



}