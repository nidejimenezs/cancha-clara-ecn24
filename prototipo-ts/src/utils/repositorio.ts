// Copias superficiales: los modelos de esta entrega solo tienen campos escalares.
export class Repositorio<T extends { readonly id: string }> {
  private datos: T[] = [];
  get cantidad(): number { return this.datos.length; }
  agregar(item: T): void {
    if (!item.id.trim()) throw new Error('El identificador es obligatorio.');
    if (this.datos.some(actual => actual.id === item.id)) {
      throw new Error('El identificador ya existe.');
    }
    this.datos.push({ ...item });
  }
  buscar(id: string): T | undefined {
    const dato = this.datos.find(item => item.id === id);
    return dato ? { ...dato } : undefined;
  }
  eliminar(id: string): boolean {
    const antes = this.cantidad;
    this.datos = this.datos.filter(item => item.id !== id);
    return antes !== this.cantidad;
  }
  filtrar(condicion: (item: T) => boolean): T[] {
    return this.datos.map(item => ({ ...item })).filter(condicion);
  }
}
