import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as Highmaps from 'highcharts/highmaps';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})

export class ModuloComponent implements OnInit {
  totalUsers: number=0;
  totalMecanicos: number=0;
  totalMecanicosActivos: number = 0;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit()  {
    interface Mecanico {
      estado: boolean;
    // Aquí puedes agregar otras propiedades que tengan los documentos en la colección de mecanicos
    }
    this.createProfitsChart();
    this.fechaUsuarios();
    this.fechaMecanicos();
    this.firestore.collection('users').valueChanges().subscribe(users => {
    this.totalUsers = users.length;
    if (this.totalUsers && this.totalMecanicos) {
      this.createChart(this.totalUsers, this.totalMecanicos);
    }

  });
    this.firestore.collection('mecanicos').valueChanges().subscribe(mecanicos => {
    this.totalMecanicos = mecanicos.length;
    if (this.totalUsers && this.totalMecanicos) {
      this.createChart(this.totalUsers , this.totalMecanicos);
    }
  });

  this.firestore.collection<Mecanico>('mecanicos').valueChanges().subscribe(mecanicos => {
    this.totalMecanicosActivos = mecanicos.filter(mecanico => mecanico.estado === true).length;
  });

  this.firestore.collection<Mecanico>('mecanicos').valueChanges().subscribe(mecanicos => {
    this.totalMecanicosActivos = mecanicos.filter(mecanico => mecanico.estado === true).length;
  });

}
createChart(totalUsers: number, totalMechanics: number) {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Usuarios y mecánicos'
    },
    series: [
      {
        name: 'Total',
        type: 'pie',
        data: [
          ['Usuarios', totalUsers],
          ['Mecánicos', totalMechanics]
        ]
      }
    ]
  };
  Highcharts.chart('container', chartOptions);
}
  createProfitsChart() {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Ganancias'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Monto'
      }
    },
    series: [
      {
        name: 'Ganancias',
        type: 'line',
        data: [
          [Date.UTC(2022, 0, 1), 100],
          [Date.UTC(2022, 1, 1), 200],
          [Date.UTC(2022, 2, 1), 300],
          [Date.UTC(2022, 3, 1), 400],
          [Date.UTC(2022, 4, 1), 500]
        ]
      }
    ]
  };
    Highcharts.chart('profits-container', chartOptions);
  }
  fechaUsuarios(){
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Usuarios creados'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Número de usuarios'
      }
    },
    series: [
      {
        name: 'Usuarios',
        type: 'column',
        data: [
          ['1 de enero', 1],
          ['3 de enero', 1],
        ]
      }
    ]
  };
  Highcharts.chart('fechaUsuarios', chartOptions);
}
  fechaMecanicos(){
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Mecanicos creados'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Número de Mecanicos'
      }
    },
    series: [
      {
        name: 'Mecanicos',
        type: 'column',
        data: [
          ['1 de enero', 3],
          ['2 de enero', 1],
          ['3 de enero', 2],
          ['4 de enero', 1]
        ]
      }
    ]
  };
  Highcharts.chart('fechaMecanicos', chartOptions);
}
}
