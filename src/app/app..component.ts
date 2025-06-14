// app.component.ts:

import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para ngSwitch y ngClass

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Eliminada referencia a Bootstrap CSS, './styles.css' podría seguir conteniendo estilos globales que necesites
})
export class AppComponent implements AfterViewInit {
  title = 'angular-concesionaria'; // Puedes cambiar el título si quieres

  isSidebarCollapsed: boolean = false; // Estado para controlar si la sidebar está colapsada (escritorio)
  isMobileSidebarOpen: boolean = false; // Estado para controlar si la sidebar está abierta en móvil
  activeSection: string = 'dashboard'; // Sección activa actual
  isMobile: boolean = false; // Nuevo estado para rastrear si la pantalla es móvil (para lógica responsiva)

  // Variables para controlar el modo de edición/añadir en los modales
  isEditMode: boolean = false;
  // Variable para identificar qué tipo de entidad se está editando/añadiendo
  currentEntity: string = ''; // 'client', 'supplier', 'sale', 'purchase', 'payment', 'refund', 'user'

  // Objeto para controlar la visibilidad de cada modal
  isModalOpen: { [key: string]: boolean } = {
    deleteConfirmationModal: false,
    editCarModal: false,
    clientModal: false,
    supplierModal: false,
    saleModal: false,
    purchaseModal: false,
    paymentModal: false,
    refundModal: false,
    userModal: false
  };

  constructor() {
    // Escuchar cambios en el tamaño de la ventana para ajustar la barra lateral
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  ngAfterViewInit(): void {
    // Inicializar el estado de la barra lateral al cargar
    this.updateSidebarState();
  }

  // Maneja el clic en los enlaces de la barra lateral
  showSection(sectionId: string): void {
    this.activeSection = sectionId;
    // Cierra la barra lateral móvil si está abierta después de seleccionar una sección
    if (this.isMobile && this.isMobileSidebarOpen) { // Solo cierra en móvil si está abierta
      this.toggleMobileSidebar();
    }
  }

  // Establece la entidad actual para el modal genérico (ej. 'client', 'supplier')
  setCurrentEntity(entityType: string): void {
    this.currentEntity = entityType;
  }

  // Alterna el estado colapsado/expandido de la barra lateral para pantallas grandes
  toggleSidebarCollapse(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed; // Invierte el estado
  }

  // Alterna la visibilidad de la barra lateral en pantallas pequeñas (modo móvil)
  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen; // Invierte el estado móvil
  }

  // Función para abrir un modal específico
  openModal(modalId: string): void {
    this.isModalOpen[modalId] = true;
  }

  // Función para cerrar un modal específico
  closeModal(modalId: string): void {
    this.isModalOpen[modalId] = false;
  }

  // Actualiza el estado de la barra lateral basado en el tamaño de la ventana
  private updateSidebarState(): void {
    this.isMobile = window.innerWidth <= 768; // Define si la pantalla es móvil (o menor que md de Tailwind)

    if (this.isMobile) {
      // En móvil, la barra lateral está inicialmente oculta y se controla con isMobileSidebarOpen.
      // El estado de colapso de escritorio no aplica.
      this.isSidebarCollapsed = false; // Aseguramos que el estado de colapso de escritorio esté en falso en móvil
    } else {
      // En escritorio, la barra lateral usa el estado colapsado/expandido,
      // y la visibilidad móvil debe ser falsa.
      this.isMobileSidebarOpen = false;
    }
  }

  // Manejador del evento de cambio de tamaño de la ventana
  onWindowResize(): void {
    this.updateSidebarState(); // Llama a la función para ajustar el estado de la barra lateral
  }
}
