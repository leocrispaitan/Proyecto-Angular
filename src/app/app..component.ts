// app.component.ts:

import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para ngSwitch y ngClass

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../styles.css'] // La ruta '../styles.css' es correcta si styles.css está en src/
})
export class AppComponent implements AfterViewInit {
  title = 'angular-concesionaria'; // Puedes cambiar el título si quieres

  isSidebarCollapsed: boolean = false; // Estado para controlar si la sidebar está colapsada
  isMobileSidebarOpen: boolean = false; // Estado para controlar si la sidebar está abierta en móvil
  activeSection: string = 'dashboard'; // Sección activa actual

  // Variables para controlar el modo de edición/añadir en los modales
  isEditMode: boolean = false;
  // Variable para identificar qué tipo de entidad se está editando/añadiendo
  currentEntity: string = ''; // 'client', 'supplier', 'sale', 'purchase', 'payment', 'refund', 'user'


  constructor() {
    // Escuchar cambios en el tamaño de la ventana para ajustar la barra lateral
    // Asegúrate de que this esté correctamente bindeado para acceder a las propiedades del componente
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
    if (this.isMobileSidebarOpen) {
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
    const sidebar = document.getElementById('sidebar'); // Obtiene la referencia a la barra lateral
    const mainContent = document.getElementById('main-content'); // Obtiene la referencia al contenido principal

    if (sidebar && mainContent) { // Verifica que los elementos existan en el DOM
      if (this.isSidebarCollapsed) {
        sidebar.classList.add('collapsed'); // Añade la clase para colapsar la barra lateral
        mainContent.classList.add('expanded'); // Añade la clase para expandir el contenido principal
      } else {
        sidebar.classList.remove('collapsed'); // Elimina la clase para expandir la barra lateral
        mainContent.classList.remove('expanded'); // Elimina la clase para contraer el contenido principal
      }
    }
  }

  // Alterna la visibilidad de la barra lateral en pantallas pequeñas (modo móvil)
  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen; // Invierte el estado móvil
    const sidebar = document.getElementById('sidebar'); // Obtiene la referencia a la barra lateral

    if (sidebar) { // Verifica que la barra lateral exista
      if (this.isMobileSidebarOpen) {
        sidebar.classList.add('show'); // Añade la clase 'show' para mostrar la barra lateral en móvil
      } else {
        sidebar.classList.remove('show'); // Elimina la clase 'show' para ocultar la barra lateral en móvil
      }
    }
  }

  // Actualiza el estado de la barra lateral basado en el tamaño de la ventana
  private updateSidebarState(): void {
    const isMobile = window.innerWidth <= 768; // Define si la pantalla es móvil o no
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    if (sidebar && mainContent) {
      if (isMobile) {
        // En móvil, la barra lateral está oculta por defecto y se muestra con el toggle
        sidebar.classList.remove('collapsed'); // Asegura que no tenga la clase de colapso de escritorio
        mainContent.classList.remove('expanded'); // Asegura que no tenga la clase de expansión de escritorio
        if (!this.isMobileSidebarOpen) { // Solo ocultar si no está explícitamente abierta por el usuario
            sidebar.classList.remove('show');
        }
      } else {
        // En escritorio, la barra lateral usa el estado colapsado/expandido
        sidebar.classList.remove('show'); // Asegura que la clase 'show' (de móvil) no interfiera
        if (this.isSidebarCollapsed) {
          sidebar.classList.add('collapsed');
          mainContent.classList.add('expanded');
        } else {
          sidebar.classList.remove('collapsed');
          mainContent.classList.remove('expanded');
        }
      }
    }
  }

  // Manejador del evento de cambio de tamaño de la ventana
  onWindowResize(): void {
    this.updateSidebarState(); // Llama a la función para ajustar el estado de la barra lateral
  }
}
