import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from '../../../services/venta.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css'],
})
export class VentaDetalleComponent implements OnInit {
  public id: any;
  public venta: any = {
    user: '',
    client: '',
  };
  public detalle_venta: any;
  //
  title = 'html-to-pdf-angular-application';
  public convertToPDF() {
    html2canvas(document.body).then((canvas) => {
      // Few necessary setting options

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var width = pdf.internal.pageSize.getWidth();
      var height = (canvas.height * width) / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', -40, -40, width, height);
      pdf.save('output.pdf'); // Generated PDF
    });
  }

  constructor(
    private _route: ActivatedRoute,
    private _ventaService: VentaService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this._ventaService.data_venta(this.id).subscribe((response) => {
        this.venta = response.data.venta;
        this.detalle_venta = response.data.detalles;
      });
    });
  }
}
