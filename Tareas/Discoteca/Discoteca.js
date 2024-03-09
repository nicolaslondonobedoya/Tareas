const readline = requiere(`readline-sync`);

let edad = readlineSync.question(`ingrese su edad: `)

if(isNaN(edad)){
    console.error(`la edad debe se un valor numerico`);    
}
else
{
    if(edad <=0){
        console.error(`la edad debe ser un valor positivo mayor a cero`);
    } 
else 
{
    if(edad<18){
        console.error(`la persona no puede ingresar porque es menor de edad`);
    }
    else 
    {
        console.info(`la persona puede ingresar`);
    }
    }
}