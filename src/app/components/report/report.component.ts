import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportService } from '../../services/report/report.service';
import { ReportBaseDto } from '../../models/dto/report/report-base-dto';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent implements OnInit {
  reportsBaseDto: ReportBaseDto[] = [];
  uuidReport: string = '';
  nameReport: string = '';
  titleReport: string = '';
  dateFrom: string = '';
  dateTo: string = '';
  searchTerm: string = '';

  columns: string[] = [];
  message: string = '';
  hasData: boolean = false;
  loading = false;
  error: string | null = null;
  data: any[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.data && this.data.length > 0;
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.getAll().subscribe({
      next: (reportsBaseDto) => {
        this.reportsBaseDto = reportsBaseDto;
      },
      error: (err) => {
        console.error('Error al cargar los reportes:', err);
      },
      complete: () => {},
    });
  }

  onReportChange(): void {
    const selected = this.reportsBaseDto.find((r) => r.uuid === this.uuidReport);
    this.nameReport = selected ? selected.type : '';
    this.titleReport = selected ? `${selected.type} - ${selected.description}` : '';

    this.dateFrom = '';
    this.dateTo = '';
    this.searchTerm = '';
    this.columns = [];
    this.hasData = false;
    this.data = [];
    this.error = null;
  }

  onConsult(): void {
    if (!this.uuidReport) {
      this.error = 'Por favor selecciona un reporte antes de consultar.';
      this.hasData = false;
      return;
    }

    this.loading = true;
    this.error = '';
    this.hasData = false;

    this.reportService.getById(this.uuidReport).subscribe({
      next: (response) => {
        this.message = response.message;
        this.hasData = response.hasData;

        if (response.hasData && response.data && response.data.length > 0) {
          this.data = response.data;
          // Extraer columnas dinámicamente del primer registro
          this.columns = Object.keys(response.data[0]);
        } else {
          this.data = [];
          this.columns = [];
        }

        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al obtener los datos del reporte.';
        this.loading = false;
        this.hasData = false;
      },
    });
  }

  onDownloadPdf(): void {
    if (!this.data || this.data.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(this.titleReport, 14, 15);

    // Generar encabezados y datos de la tabla
    const headers = [this.columns];
    const rows = this.data.map((row) => this.columns.map((col) => row[col] ?? ''));

    autoTable(doc, {
      startY: 25,
      head: headers,
      body: rows,
      styles: { fontSize: 10, halign: 'center' },
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
    });

    doc.save(`reporte_${this.nameReport}_${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  onClear(): void {
    this.dateFrom = '';
    this.dateTo = '';
    this.uuidReport = '';
    this.searchTerm = '';
    this.columns = [];
    this.hasData = false;
    this.data = [];
    this.error = null;
  }
}
