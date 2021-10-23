const monto = document.getElementById('monto'),
tiempo = document.getElementById('tiempo'),
tasaInteres = document.getElementById('tasaInteres'),
fechaDisposicion = document.getElementById('fechaDisposicion'),
    
btnCalcular = document.getElementById('btnCalcular'),
alerta = document.getElementById('alert-error'),
llenarTabla = document.querySelector('#lista-tabla tbody');

btnCalcular.addEventListener('click', () => {
    if (monto.value === '' || tiempo.value === '' || tasaInteres.value === '' || fechaDisposicion.value === '') {
        alerta.hidden = false;
        setTimeout(() => {
            alerta.hidden = true;
        }, 2000);
    } else {
        calcularCronograma(monto.value, tasaInteres.value, tiempo.value, fechaDisposicion.value);
    }
})

function calcularCronograma(monto, tasaInteres, tiempo, fechaDisposicion) {

    while(llenarTabla.firstChild) {
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let periodo = 0, fecha, fecha2, f3, f4, f5, iva, moratorios, flujo, interes, saldoIns, 
    disposicion, comision, Pago1, Pago2, Pago3, Pago4, amortizacion, saldoIns2,
    tasa = tasaInteres*0.01, tasaMes = tasa / tiempo, mesActual = dayjs(fechaDisposicion);

    Pago1 = Math.pow((1 + tasaMes), tiempo);
    Pago2 = (tasaMes*Pago1) * monto;
    Pago3 = Pago1 - 1;
    Pago4 = Pago2 / Pago3;

    document.getElementById("pago").value = Pago4;

    for (let i = 0; i <= tiempo; i++) {
        let periodoNum = periodo;
        periodo = periodo + 1;

        if (periodoNum == 0) {
            disposicion = monto * (-1);
            saldoIns = disposicion * (-1);
            comision = monto * 0.01;

            interes = 0;
            moratorios = 0;

            iva = (comision + interes + moratorios)*(0.16);

            flujo = (-(monto)) + (comision + iva);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${periodoNum}</td>
                <td>${mesActual.format('DD-MM-YYYY')}</td>
                <td></td>
                <td></td>
                <td>${disposicion}</td>
                <td>${saldoIns}</td>
                <td>${comision}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>${iva}</td>
                <td>${flujo}</td>
            `;
            llenarTabla.appendChild(row);
        }
        else{
            fecha = mesActual.format('DD-MM-YYYY');
            mesActual = mesActual.add(1, 'month');

            fecha2 = mesActual.format('DD-MM-YYYY');

            f3 = mesActual.format('DD');
            f4 = mesActual.subtract(f3, 'day');
            f5 = f4.format('DD');

            amortizacion = Pago4 - interes;

            saldoIns2 = saldoIns;

            interes = saldoIns2*tasa/360*f5;

            saldoIns = saldoIns - amortizacion;

            iva = 0;
            iva = (interes)*(0.16);

            flujo = Pago4 + iva;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${periodoNum}</td>
                <td>${fecha}</td>
                <td>${fecha2}</td>
                <td>${f5}</td>
                <td></td>
                <td>${saldoIns.toFixed(3)}</td>
                <td></td>
                <td>${amortizacion.toFixed(3)}</td>
                <td>${interes.toFixed(3)}</td>
                <td></td>
                <td>${iva.toFixed(3)}</td>
                <td>${flujo.toFixed(3)}</td>
            `;
            llenarTabla.appendChild(row);  
        }
    }
}