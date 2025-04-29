import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { CountDownService, SubscriberService } from "@portafolio/shared-data";
import { of, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
    selector: 'app-like-button-counter',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule
    ],
    templateUrl: './registerSubscriber.component.html',
    standalone: true,
})
export class RegisterSubscriberComponent implements OnInit, OnDestroy {

    followerRegisterForm!: FormGroup;
    codeVerifyForm!: FormGroup;
    sendCode = false;
    codeVerifyShow = false;
    confirmCode = false;

    minutes = 0;
    seconds = 0;
    isRunning = false;
    finished = false;
    countdownSub!: Subscription;
    email!: string;

    /*private _bottomSheetRef =
    inject<MatBottomSheetRef<RegisterSubscriberComponent>>(MatBottomSheetRef);*/

    @ViewChildren('codeInput') codeInputs!: QueryList<{ nativeElement: HTMLInputElement }>;

    constructor(
        private subscriber: SubscriberService,
        private countDown: CountDownService,
        private fb: FormBuilder,
        private _bottomSheetRef: MatBottomSheetRef<RegisterSubscriberComponent>,
    ) { }

    ngOnInit(): void {

        this.countdownSub = this.countDown.getCountdown().subscribe({
            next: ({ minutes, seconds, finished }) => {
                this.minutes = minutes;
                this.seconds = seconds;
                this.isRunning = !finished && (minutes > 0 || seconds > 0);
                this.finished = finished;

                this.codeVerifyShow = !finished && (minutes > 0 || seconds > 0);
            }
        });

        console.log(this.countdownSub);

        this.followerRegisterForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
        });

        this.codeVerifyForm = this.fb.group({
            code1: ['', Validators.required],
            code2: ['', Validators.required],
            code3: ['', Validators.required],
            code4: ['', Validators.required],
            code5: ['', Validators.required],
            code6: ['', Validators.required],
        });

    }

    getFollower() {
        this.sendCode = true;
        if (this.followerRegisterForm.invalid) {
            return;
        }

        this.email = this.followerRegisterForm.value.email;

        // Primero verificamos si el suscriptor existe
        this.subscriber.getSubscriber(this.email).pipe(
            // Si no existe (data es null o undefined), lo registramos
            switchMap(data => {
                console.log('data', data)
                if (!data?.exists) {
                    console.log('Suscriptor no encontrado, procediendo a registrar...');
                    return this.subscriber.setSubscriber(this.email);
                } else {
                    console.log('Suscriptor ya existe:', data);
                    // Devolvemos un observable con el dato existente                    
                    return of(data);
                }
            })
        ).subscribe({
            next: (result) => {
                if (result) {
                    console.log('Operación completada:', result);
                    const resultData: any = result;
                    if (resultData?.exists === false || resultData?.exists === undefined) {
                        this.codeVerifyShow = true;
                        this.startTimer(5); // Inicia el temporizador de 5 minutos
                    } else {
                        this.codeVerifyShow = false;
                        this.stopTimer(); // Detiene el temporizador si el suscriptor ya existe
                        this.subscriber.followerLogin(this.email).subscribe({
                            next: (result) => {
                                if (result) {                                    
                                    this._bottomSheetRef.dismiss(resultData.follower);
                                }
                            },
                            error: (error) => {
                                console.error('Error en el proceso:', error);
                                // Aquí puedes mostrar un mensaje de error al usuario
                            }  
                        });                        
                    }

                    // Aquí puedes mostrar un mensaje de éxito al usuario
                }
            },
            error: (error) => {
                console.error('Error en el proceso:', error);
                this.sendCode = false;
                // Aquí puedes mostrar un mensaje de error al usuario
            },
            complete: () => {
                this.sendCode = false;
                this.followerRegisterForm.reset();
                console.log('Proceso completado, formulario reseteado');
            }
        });
    }

    startTimer(minutes: number) {
        this.countDown.startCountdown(minutes);
    }

    stopTimer() {
        this.countDown.stopCountdown();
    }

    onInput(event: Event, index: number): void {
        const input = event.target as HTMLInputElement;
        const value = input.value;

        // Si se ingresó un carácter, pasar al siguiente campo
        if (value.length === 1) {
            this.focusNextInput(index);
        }
    }

    onKeyDown(event: KeyboardEvent, index: number): void {
        const input = event.target as HTMLInputElement;

        // Manejar tecla backspace cuando el campo está vacío
        if (event.key === 'Backspace' && input.value === '') {
            event.preventDefault();
            this.focusPreviousInput(index);
        }
    }

    private focusNextInput(currentIndex: number): void {
        const nextIndex = currentIndex + 1;
        const inputsArray = this.codeInputs.toArray();

        if (nextIndex < inputsArray.length) {
            inputsArray[nextIndex].nativeElement.focus();
        }
    }

    private focusPreviousInput(currentIndex: number): void {
        const prevIndex = currentIndex - 1;
        const inputsArray = this.codeInputs.toArray();

        if (prevIndex >= 0) {
            inputsArray[prevIndex].nativeElement.focus();
            // Opcional: Borrar el valor del campo anterior también
            this.codeVerifyForm.get(`code${prevIndex + 1}`)?.setValue('');
        }
    }

    getFullCode(): string {
        return Object.values(this.codeVerifyForm.value).join('');
    }

    codeConfirm() {
        this.confirmCode = true;
        if (this.codeVerifyForm.invalid) {
            return;
        }

        const code = this.getFullCode();

        this.subscriber.confirmSubscriber(this.email, code).subscribe({

            next: (result) => {
                if (result) {
                    console.log('Operación completada:', result);
                    // Aquí puedes mostrar un mensaje de éxito al usuario
                    this._bottomSheetRef.dismiss(result);
                }
            },
            error: (error) => {
                console.error('Error en el proceso:', error);
                // Aquí puedes mostrar un mensaje de error al usuario
            },
            complete: () => {
                this.codeVerifyForm.reset();
                this.confirmCode = false;
                console.log('Proceso completado, formulario reseteado');
            }
        });
    }

    ngOnDestroy() {
        if (this.countdownSub?.closed === false) {
            this.countdownSub.unsubscribe();
        }
    }

}