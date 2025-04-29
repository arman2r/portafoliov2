import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private fileMap = {
    frontend: {
      url: '/assets/curriculum/Armando-Rubio-Frontend-Dev-Sr.pdf',
      name: 'Armando-Rubio-Frontend-Dev-Sr.pdf',
    },
    fullstack: {
      url: '/assets/curriculum/Armando-Rubio-FullStack-Ssr.pdf',
      name: 'Armando-Rubio-FullStack-Ssr.pdf',
    },
  };

  async downloadFile(type: 'frontend' | 'fullstack'): Promise<void> {
    const file = this.fileMap[type];

    try {
      const response = await fetch(file.url);
      if (!response.ok) throw new Error('Error al descargar');

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);

      console.log(`✅ Archivo ${file.name} descargado correctamente.`);
    } catch (error) {
      console.error(`❌ Error al descargar el archivo ${type}:`, error);
    }
  }
}
